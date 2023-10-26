import StatsTable from "@/components/StatsTable/StatsTable"
import { getGroupStats } from "@/services/stats"
import { ResultFields } from "@/types/enums"
import Link from "next/link"
import { FC, cache } from "react"

type Props = {
    searchParams?: {
        year?: string
        minPlayerCount?: string
        display?: string
    }
}

export const revalidate = 120    // Revalidates cached getGroupStats every two minutes


const Stats: FC<Props> = async ({ searchParams }) => {

    const year = Number(searchParams?.year ?? 2023)
    const minPlayerCount = Number(searchParams?.minPlayerCount ?? 5)

    const display = searchParams?.display === 'total' ? ResultFields.Total : ResultFields.PlusMinus

    const stats = await getGroupStats(year, minPlayerCount)

    if (!stats) {
        return (
            <div>
                No data
            </div>
        )
    }
    return (
        <div>
            <h2>Stats</h2>
            <p>
                <StatsTable gameData={stats} />
            </p>
        </div>
    )
}

export default Stats