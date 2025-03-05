import StatsTable from "@/components/StatsTable/StatsTable"
import { getGroupStats } from "@/services/stats"
import clsx from "clsx"
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
            <YearSelector selectedYear={year} />
            <StatsTable gameData={stats} />
        </div>
    )
}

const YearSelector: FC<{ selectedYear: string }> = ({ selectedYear }) => {
    const thisYear = new Date().getFullYear()
    const years = Array.from({ length: thisYear - STARTING_YEAR + 1 }, (_, index) => (STARTING_YEAR + index).toString())
    return (
        <div className="flex gap-3">
            {years.map(year => (
                <Link
                    className={clsx(
                        "text-blue-700 text-lg",
                        year === selectedYear && 'text-blue-500 font-bold'
                    )}
                    href={`?year=${year}`} key={year}>{year}
                </Link>
            ))}
        </div>
    )
}

export default Stats