import { SafeUser } from "./user"

export type Scorecard = {
    hc: number
    plusminus: number
    total: number
    beers: number
    bHc: number
    user: SafeUser
    scores: number[]
    hcPlusminus: number
}

export type Game = {
    course: string
    date: string
    id: string
    layout: string
    startTime: number
    pars: number[]
    par: number
    scorecards: Scorecard[]
    bHcMultiplier: number
}
