export enum AccountType {
    GOD = 'god',
    ADMIN = 'admin',
    PLEB = 'pleb'
}
export type User = {
    id: string
    name: string
    email?: string
    groupName?: string
    accountType: AccountType
}

export type SafeUser = {
    name: string,
    id: string,
}

export type SearchUserResponse = {
    hasMore: boolean
    users: SafeUser[]
}