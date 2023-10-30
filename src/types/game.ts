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
    startTime: number
    scorecards: Scorecard[]
}

export type LiveGame = {
    id: string,
    course: string,
    layout: string,
    scorecards: {
        user: {
            name: string
        }
    }
    startTime: number
}
