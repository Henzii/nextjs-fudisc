import StatsTable from "@/components/StatsTable/StatsTable"
import { getGroupStats } from "@/services/stats"
import Link from "next/link"
import { FC } from "react"

const STARTING_YEAR = 2024

type Props = {
    searchParams?: { year?: string }
}

const Stats: FC<Props> = async ({ searchParams }) => {
    const year = searchParams?.year ?? new Date().getFullYear().toString()

    const stats = (await getGroupStats(year))?.reverse()

    if (!stats) {
        return (
            <div>
                No data
            </div>
        )
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold my-2">Stats</h2>
            <YearSelector />
            <StatsTable gameData={stats} />
        </div>
    )
}

const YearSelector: FC = () => {
    const thisYear = new Date().getFullYear()
    const years = Array.from({ length: thisYear - STARTING_YEAR + 1 }, (_, index) => STARTING_YEAR + index)
    return (
        <div className="flex gap-3">
            {years.map(year => <Link className="text-blue-700" href={`?year=${year}`} key={year}>{year}</Link>)}
        </div>
    )
}

export default Stats