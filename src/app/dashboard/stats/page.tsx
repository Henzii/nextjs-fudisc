import StatsTable from "@/components/StatsTable/StatsTable"
import { getGroupStats } from "@/services/stats"
import Link from "next/link"
import { FC } from "react"

type Props = {
    searchParams?: {
        year?: string
        minPlayerCount?: string
    }
}

const Stats: FC<Props> = async ({ searchParams }) => {

    const currentYear = new Date().getFullYear()
    const year = Number(searchParams?.year ?? currentYear)
    const minPlayerCount = Number(searchParams?.minPlayerCount ?? 5)

    const stats = (await getGroupStats(year, minPlayerCount))?.reverse()

    if (!stats) {
        return (
            <div>
                No data
            </div>
        )
    }
    return (
        <div>
            <div>
                <YearLinks fromYear={2022} toYear={currentYear} />
            </div>
            <h2 className="text-2xl font-semibold my-2">Stats {year}</h2>
            <StatsTable gameData={stats} />
        </div>
    )
}

const YearLinks: FC<{ fromYear: number, toYear: number }> = ({ fromYear, toYear }) => {
    if (fromYear > toYear) {
        return null
    }

    const yearLinks = []

    for (let year = fromYear; year <= toYear; year++) {
        yearLinks.push(
            <Link href={`?year=${year}`} className="text-green-700 font-semibold underline mr-5">{year}</Link>
        )
    }

    return yearLinks;
}


export default Stats