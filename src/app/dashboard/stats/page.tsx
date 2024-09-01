import StatsTable from "@/components/StatsTable/StatsTable"
import { getGroupStats } from "@/services/stats"
import { FC } from "react"

const Stats: FC = async () => {

    const stats = (await getGroupStats())?.reverse()

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
            <StatsTable gameData={stats} />
        </div>
    )
}

export default Stats