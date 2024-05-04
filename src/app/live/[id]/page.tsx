import GameCard from "@/components/GameCard"
import { getLiveGame } from "@/services/games"
import { FC } from "react"

type Props = {
  params: {
    id: string
  }
}
const Page: FC<Props> = async ({ params }) => {

  const gameData = await getLiveGame(params.id)
  const game = gameData?.data.getLiveGame
  if (!game) {
    return (
      <div>
        <h1 className="text-3xl my-4">Not available</h1>
        <p>Game is not available :/</p>
      </div>
    )
  }

  return <GameCard game={game} />
}

export default Page