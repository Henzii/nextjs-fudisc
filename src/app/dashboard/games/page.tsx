import GameCard from "@/components/GameCard";
import { getGames } from "@/services/games";
import { FC } from "react";

const Page: FC = async () => {
    const games = await getGames(10)

    if (!games) {
        return "No games"
    }
    return (
        <section>
            <h2 className="text-3xl">Games</h2>
            {games.map(game => <GameCard game={game} key={game.id} />)}
        </section>
    )
}

export default Page
