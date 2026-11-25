import { isAdmin } from "@/common/utils";
import { NextResponse } from "next/server";

type DailyCount = { date: string; count: number };
type CreatedUser = { createdAt: string; username: string };

type GrafanaStats = {
    updatedAt: string;
    counters: {
        newUsers: number;
        usersDeleted: number;
        courses: number;
        layouts: number;
        games: number;
        rageputt: number;
    };
    newUsersPerDay: DailyCount[];
    createdUsers: CreatedUser[];
};

type GrafanaFrame = {
    schema?: { fields?: { name?: string }[] };
    data?: { values?: unknown[][] };
};

type GrafanaQueryResult = {
    error?: string;
    frames?: GrafanaFrame[];
};

type GrafanaResponse = {
    results?: Record<string, GrafanaQueryResult>;
};

const CACHE_DURATION_MS = 10 * 60 * 1000;
let cachedStats: GrafanaStats | undefined;
let cachedAt = 0;

const eventExpr = (event: string) =>
    `sum(count_over_time({service_name="FuDisc server"} | event_name="${event}" | detected_level!="error" [30d])) or vector(0)`;

const query = (
    refId: string,
    expr: string,
    queryType: "instant" | "range",
    options: { maxLines?: number } = {},
) => ({
    refId,
    datasource: { uid: "grafanacloud-logs" },
    queryType,
    expr,
    ...(queryType === "range" ? { step: "1d" } : {}),
    ...options,
});

const queryDefinitions = [
    query("newUsers", eventExpr("user.create"), "instant"),
    query("usersDeleted", eventExpr("user.delete"), "instant"),
    query("courses", eventExpr("course.create"), "instant"),
    query("layouts", eventExpr("layout.create"), "instant"),
    query("games", eventExpr("game.create"), "instant"),
    query("rageputt", eventExpr("rageputt.create"), "instant"),
    query(
        "newUsersPerDay",
        'sum(count_over_time({service_name="FuDisc server"} | event_name="user.create" | detected_level!="error" [1d]))',
        "range",
    ),
    query(
        "createdUsers",
        '{service_name="FuDisc server"} | event_name="user.create" | detected_level!="error" | pattern "User <username> created"',
        "range",
        { maxLines: 100 },
    ),
];

const getResult = (response: GrafanaResponse, refId: string) => {
    const result = response.results?.[refId];
    if (result?.error) {
        throw new Error(`Grafana query ${refId} failed: ${result.error}`);
    }
    return result;
};

const getFrames = (result: GrafanaQueryResult | undefined) => result?.frames ?? [];

const getCounter = (response: GrafanaResponse, refId: string) => {
    const frames = getFrames(getResult(response, refId));
    const values = frames.find((frame) => frame.data?.values)?.data?.values ?? [];
    const numberColumn = values[1];
    const lastValue = numberColumn?.[numberColumn.length - 1];
    const parsedValue = Number(lastValue ?? 0);
    return Number.isFinite(parsedValue) ? Math.round(parsedValue) : 0;
};

const getDailyCounts = (response: GrafanaResponse): DailyCount[] => {
    const frames = getFrames(getResult(response, "newUsersPerDay"));
    const values = frames.find((frame) => frame.data?.values)?.data?.values ?? [];
    const timestamps = values[0];
    const counts = values[1];

    if (!timestamps || !counts) return [];

    return timestamps.flatMap((timestamp, index) => {
        const time = Number(timestamp);
        const count = Number(counts[index]);
        if (!Number.isFinite(time) || !Number.isFinite(count)) return [];
        return [{
            date: new Date(time).toISOString().slice(0, 10),
            count: Math.round(count),
        }];
    });
};

const getUsername = (value: unknown): string | undefined => {
    if (typeof value === "string") {
        const text = value.trim();
        if (!text) return undefined;

        if (text.startsWith("{")) {
            try {
                return getUsername(JSON.parse(text));
            } catch {
                return undefined;
            }
        }

        if (text.startsWith('"')) {
            try {
                const parsed = JSON.parse(text);
                return typeof parsed === "string" && parsed.trim() ? parsed.trim() : undefined;
            } catch {
                return undefined;
            }
        }

        const match = text.match(/username=(?:"([^"]*)"|([^,}\s]+))/);
        return match?.[1] ?? match?.[2] ?? text;
    }

    if (typeof value === "object" && value !== null && "username" in value) {
        const username = (value as { username?: unknown }).username;
        return typeof username === "string" && username.trim() ? username.trim() : undefined;
    }

    return undefined;
};

const getCreatedUsers = (response: GrafanaResponse): CreatedUser[] => {
    const frames = getFrames(getResult(response, "createdUsers"));

    return frames.flatMap((frame) => {
        const values = frame.data?.values ?? [];
        const fields = frame.schema?.fields ?? [];
        const timeIndex = fields.findIndex((field) => field.name?.toLowerCase() === "time");
        const usernameIndex = fields.findIndex((field) =>
            ["labels", "fields", "username"].includes(field.name?.toLowerCase() ?? ""),
        );
        const timestamps = values[timeIndex >= 0 ? timeIndex : 0];
        const usernames = values[usernameIndex >= 0 ? usernameIndex : values.length - 1];

        if (!timestamps || !usernames) return [];

        return timestamps.flatMap((timestamp, index) => {
            const createdAt = new Date(timestamp as string | number | Date);
            const username = getUsername(usernames[index]);
            if (!username || Number.isNaN(createdAt.getTime())) return [];
            return [{ createdAt: createdAt.toISOString(), username }];
        });
    }).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
};

const loadStats = async (): Promise<GrafanaStats> => {
    const token = process.env.GRAFANA_TOKEN;
    if (!token) {
        throw new Error("GRAFANA_TOKEN is not configured");
    }

    const baseUrl = (process.env.GRAFANA_URL || "https://bigbasement1917.grafana.net").replace(/\/+$/, "");
    const response = await fetch(`${baseUrl}/api/ds/query`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "now-30d",
            to: "now",
            queries: queryDefinitions,
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Grafana request failed with status ${response.status}`);
    }

    const data = await response.json() as GrafanaResponse;
    const stats: GrafanaStats = {
        updatedAt: new Date().toISOString(),
        counters: {
            newUsers: getCounter(data, "newUsers"),
            usersDeleted: getCounter(data, "usersDeleted"),
            courses: getCounter(data, "courses"),
            layouts: getCounter(data, "layouts"),
            games: getCounter(data, "games"),
            rageputt: getCounter(data, "rageputt"),
        },
        newUsersPerDay: getDailyCounts(data),
        createdUsers: getCreatedUsers(data),
    };

    return stats;
};

export async function GET() {
    if (!isAdmin()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (cachedStats && Date.now() - cachedAt < CACHE_DURATION_MS) {
        return NextResponse.json(cachedStats);
    }

    try {
        cachedStats = await loadStats();
        cachedAt = Date.now();
        return NextResponse.json(cachedStats);
    } catch (error) {
        console.error("Unable to load Grafana activity stats:", error);

        if (cachedStats) {
            return NextResponse.json(cachedStats);
        }

        return NextResponse.json(
            { error: "Activity stats are temporarily unavailable." },
            { status: 503 },
        );
    }
}

export const dynamic = "force-dynamic";
