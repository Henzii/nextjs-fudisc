"use client"

import { Game } from "@/types/game"
import { FC, useState } from "react"
import { getResultForPlayer, getUniquePlayerNames } from "./utils"
import { format } from 'date-fns'
import { ResultFields } from "@/types/enums"
import Switch from "../Switch"

const displayOptions = [
    { label: 'Total', value: ResultFields.Total },
    { label: '+/-', value: ResultFields.PlusMinus },
    { label: 'Rank', value: ResultFields.Rank },
    { label: 'Points', value: ResultFields.Points },
    { label: 'HC', value: ResultFields.Handicap },
    { label: 'Beers', value: ResultFields.Beers },
    { label: 'HC +/-', value: ResultFields.HCPlusMinus }
]

type Props = {
    gameData: Game[]
}

const StatsTable: FC<Props> = ({ gameData }) => {
    const names = getUniquePlayerNames(gameData)
    const [showResultType, setShowResultType] = useState<ResultFields>(ResultFields.Total)
    return (
        <div className="relative">
            <div className="py-2 mb-2 px-1 sticky top-0 left-0 bg-white">
                <Switch options={displayOptions} selected={showResultType} onSwitchClicked={setShowResultType} />
            </div>
            <div className="overflow-x-scroll w-auto">
                <table className="text-sm w-full">
                    <thead>
                        <tr className="[&>th]:px-3 text-bold">
                            <th className="text-left">Date</th>
                            <th className="text-left">Course</th>
                            {names.map(name => (
                                <th key={name} className="px-3">
                                    {name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="[&>tr:nth-child(odd)]:bg-slate-100 text-gray-600">
                        {gameData.map(game => {
                            const date = new Date(game.date)
                            return (
                                <tr key={game.id} className="[&>td]:p-1">
                                    <td className="whitespace-nowrap">{format(date, 'dd.MM.yy hh:mm')}</td>
                                    <td>{game.course}</td>
                                    {names.map(player => {
                                        const cellValue = getResultForPlayer(game, player, showResultType)
                                        return (
                                            <td key={`${game.id}-${player}`} className="text-center border-l-2 border-l-slate-200">
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