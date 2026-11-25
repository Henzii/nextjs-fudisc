"use client";

import { useEffect, useState } from "react";

type Stats = {
    updatedAt: string;
    counters: {
        newUsers: number;
        usersDeleted: number;
        courses: number;
        layouts: number;
        games: number;
        rageputt: number;
    };
    newUsersPerDay: { date: string; count: number }[];
    createdUsers: { createdAt: string; username: string }[];
};

const statLabels: { key: keyof Stats["counters"]; label: string }[] = [
    { key: "newUsers", label: "New users (30d)" },
    { key: "usersDeleted", label: "Users deleted" },
    { key: "courses", label: "Courses created" },
    { key: "layouts", label: "Layouts created" },
    { key: "games", label: "Games created" },
    { key: "rageputt", label: "Rageputt games created" },
];

const GrafanaStats = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [unavailable, setUnavailable] = useState(false);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const response = await fetch("/api/stats", { cache: "no-store" });
                if (!response.ok) {
                    throw new Error("Stats request failed");
                }
                setStats(await response.json());
                setUnavailable(false);
            } catch {
                setUnavailable(true);
            } finally {
                setLoading(false);
            }
        };

        void loadStats();
    }, []);

    if (loading) {
        return <p role="status" className="text-slate-600">Loading activity stats...</p>;
    }

    if (unavailable || !stats) {
        return (
            <p role="status" className="text-slate-600">
                Activity stats are temporarily unavailable. Please try again later.
            </p>
        );
    }

    const maxCount = Math.max(1, ...stats.newUsersPerDay.map(({ count }) => count));

    return (
        <div className="space-y-8">
            <section aria-label="Activity counters" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statLabels.map(({ key, label }) => (
                    <article key={key} className="rounded-lg bg-white p-5 shadow">
                        <h2 className="text-sm font-medium text-slate-600">{label}</h2>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {stats.counters[key].toLocaleString()}
                        </p>
                    </article>
                ))}
            </section>

            <section className="rounded-lg bg-white p-5 shadow">
                <h2 className="text-xl font-semibold text-slate-900">New users per day</h2>
                {stats.newUsersPerDay.length === 0 ? (
                    <p className="mt-4 text-slate-600">No new user activity in the last 30 days.</p>
                ) : (
                    <div className="mt-6 overflow-x-auto">
                        <div
                            role="img"
                            aria-label="Bar chart showing new users per day for the last 30 days"
                            className="flex h-56 min-w-[640px] items-end gap-2 border-b border-l border-slate-300 px-2"
                        >
                            {stats.newUsersPerDay.map(({ date, count }) => (
                                <div
                                    key={date}
                                    title={`${date}: ${count}`}
                                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                                >
                                    <span className="mb-1 text-xs text-slate-600">{count}</span>
                                    <div
                                        className="w-full rounded-t bg-blue-600"
                                        style={{ height: `${Math.max(2, (count / maxCount) * 75)}%` }}
                                    />
                                    <span className="mt-2 h-4 whitespace-nowrap text-[10px] text-slate-500">
                                        {new Date(`${date}T00:00:00Z`).getUTCDate() % 5 === 1
                                            ? new Date(`${date}T00:00:00Z`).toLocaleDateString(undefined, {
                                                month: "short",
                                                day: "numeric",
                                                timeZone: "UTC",
                                            })
                                            : ""}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section className="rounded-lg bg-white p-5 shadow">
                <h2 className="text-xl font-semibold text-slate-900">Recently created users</h2>
                {stats.createdUsers.length === 0 ? (
                    <p className="mt-4 text-slate-600">No recently created users found.</p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-slate-200 text-slate-600">
                                <tr>
                                    <th scope="col" className="px-3 py-2 font-medium">Created at</th>
                                    <th scope="col" className="px-3 py-2 font-medium">Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.createdUsers.map(({ createdAt, username }, index) => (
                                    <tr key={`${createdAt}-${username}-${index}`} className="border-b border-slate-100">
                                        <td className="whitespace-nowrap px-3 py-2">
                                            {new Date(createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-3 py-2">{username}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <p className="text-sm text-slate-500">
                Last updated {new Date(stats.updatedAt).toLocaleString()}
            </p>
        </div>
    );
};

export default GrafanaStats;
