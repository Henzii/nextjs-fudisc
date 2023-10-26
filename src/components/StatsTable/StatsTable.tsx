"use client"

import { Game } from "@/types/game"
import { FC, useState } from "react"
import { getResultForPlayer, getUniquePlayerNames } from "./utils"
import { parseISO, format } from 'date-fns'
import { ResultFields } from "@/types/enums"
import Link from "next/link"
import Button from "../Button"

type Props = {
    gameData: Game[]
}

const StatsTable: FC<Props> = ({ gameData }) => {
    const names = getUniquePlayerNames(gameData)
    const [showResultType, setShowResultType] = useState<ResultFields>(ResultFields.Total)
    return (
        <div>
            <div>
                <Button onClick={() => setShowResultType(ResultFields.PlusMinus)}>Show plusminus</Button>
                <Button onClick={() => setShowResultType(ResultFields.Total)}>Show Total</Button>
            </div>
            <div className="overflow-x-scroll w-auto">
                <table className="text-sm w-full">
                    <thead>
                        <tr className="[&>th]:px-3">
                            <th className="text-left">Date</th>
                            <th className="text-left">Course</th>
                            {names.map(name => (
                                <th key={name} className="px-3">
                                    {name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="[&>tr:nth-child(odd)]:bg-slate-200">
                        {gameData.map(game => {
                            const date = new Date(game.date)
                            return (
                                <tr key={game.id} className="[&>td]:p-2">
                                    <td>{format(date, 'dd.MM.yy hh:mm')}</td>
                                    <td>{game.course}</td>
                                    {names.map(player => {
                                        const cellValue = getResultForPlayer(game, player, showResultType)
                                        return (
                                            <td key={`${game.id}-${player}`} className="text-center border-l-2 border-l-slate-400">
                                                {cellValue}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StatsTable