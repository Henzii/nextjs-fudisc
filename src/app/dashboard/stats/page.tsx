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

    const year = Number(searchParams?.year ?? 2023)
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
                <Link href="?year=2022" className="text-green-700 font-semibold underline mr-5">2022</Link>
                <Link href="?year=2023" className="text-green-700 font-semibold underline mr-5">2023</Link>
            </div>
            <h2 className="text-2xl font-semibold my-2">Stats {year}</h2>
            <StatsTable gameData={stats} />
        </div>
    )
}

export default Stats