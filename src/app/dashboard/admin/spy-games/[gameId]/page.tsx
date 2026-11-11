import GameCard from "@/components/GameCard"
import { getGame } from "@/services/games"

type Props = {
    params: {
        gameId: string
    }
}

const SpyGamePage = async ({ params }: Props) => {
    const game = await getGame(params.gameId)

    if (!game) {
        return (
            <section>
                <h1 className="text-3xl my-4">Game not available</h1>
                <p>This game could not be found.</p>
            </section>
        )
    }

    return <GameCard game={game} />
}

export default SpyGamePage
