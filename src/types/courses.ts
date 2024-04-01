import internal from "stream"

type Layout = {
    deprecated: boolean
    name: string
    names: string[]
    par: number
    pars: number[]
    holes: internal
    id: string
}

export type Course = {
    id: string
    name: string
    layouts: Layout[]
    distance: {
        string: string
        meters: string
    }
}