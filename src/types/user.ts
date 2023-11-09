export type User = {
    name: string
    email?: string
    groupName?: string
}

export type SafeUser = {
    name: string,
    id: string,
}