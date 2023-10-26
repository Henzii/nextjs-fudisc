import { SafeUser } from "./user"

export type Scorecard = {
    hc: number
    plusminus: number
    total: number
    beers: number
    bHc: number
    user: SafeUser
}

export type Game = {
    course: string
    date: string
    id: string
    layout: string
    startTime: string
    scorecards: Scorecard[]
}