"use client"

import { Game } from "@/types/game"
import { FC, useMemo, useState } from "react"
import { MappedPlayer, getResultForPlayer, getUniquePlayerNames, parseGames } from "./utils"
import { format, fromUnixTime } from 'date-fns'
import Switch from "../Switch"
import PointsTable from "./PointsTable"
import clsx from "clsx"

type Options = {
  label: string,
  value: keyof Omit<MappedPlayer, 'name'>
}
const displayOptions: Options[] = [
  { label: 'Total', value: 'total' },
  { label: 'Rank', value: 'rank' },
  { label: 'Points', value: 'points' },
  { label: '+/-', value: 'plusminus' },
  { label: 'HC +/-', value: 'hcPlusminus' },
  { label: 'HC', value: 'hc' },
  { label: 'Beers', value: 'beers' },

]

const beerOptions = [
  { label: 'Prohibition', value: 'noBeers' },
]

type Props = {
  gameData: Game[]
}

const StatsTable: FC<Props> = ({ gameData }) => {
  const names = getUniquePlayerNames(gameData)
  const [showResultType, setShowResultType] = useState<Options['value']>('total')
  const [prohibition, setProhibition] = useState<boolean>(false)

  const parsedGames = useMemo(() => parseGames(gameData, prohibition), [gameData, prohibition])

  return (
    <div className="relative">
      <div className="py-2 mb-2 px-1 sticky top-0 left-0 bg-white flex gap-4 overflow-x-scroll">
        <Switch options={displayOptions} selected={showResultType} onSwitchClicked={setShowResultType} />
        <Switch options={beerOptions} selected={prohibition ? 'noBeers' : undefined} onSwitchClicked={() => setProhibition(!prohibition)} />
      </div>
      <div className="overflow-x-scroll w-auto">
        <table className="text-sm w-full">
          <thead>
            <tr className="[&>th]:px-3 text-bold">
              <th className="text-left">#</th>
              <th className="text-left">Date</th>
              <th className="text-left">Course</th>
              {!prohibition && <th>bHCx</th>}
              {parsedGames.playerNames.map(name => (
                <th key={name} className="px-3">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(odd)]:bg-slate-100 text-gray-600">
            {parsedGames.competitions.map((game, index) => {
              const date = fromUnixTime(game.startTime / 1000)
              return (
                <tr key={game.id} className="[&>td]:p-1">
                  <td>{index + 1}.</td>
                  <td className="whitespace-nowrap">{format(date, 'dd.MM.yy HH:mm')}</td>
                  <td>{game.course}</td>
                  {!prohibition && <th>{game.bHcMultiplier > 1 ? game.bHcMultiplier : ''}</th>}
                  {names.map(player => {
                    const cellValue = getResultForPlayer(player, showResultType, game.players)
                    const rank = getResultForPlayer(player, 'rank', game.players)
                    return (
                      <td
                        key={`${game.id}-${player}`}
                        className={clsx("text-center border-l-2 border-l-slate-200", {
                          ['bg-gradient-to-tl from-green-100']: rank === 1
                        })}>
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
      <PointsTable mappedGames={parsedGames} />
    </div>
  )
}

export default StatsTable