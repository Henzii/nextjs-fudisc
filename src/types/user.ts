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
    groupJoinedDate?: string
    accountType: AccountType
}

export type InactiveUser = Pick<User, 'id' | 'name'> & { createdAt: string }

export type SafeUser = {
    name: string,
    id: string,
    groupName: string | undefined,
    groupJoinedDate: string | undefined,
}

export type SearchUserResponse = {
    hasMore: boolean
    users: SafeUser[]
}

export type TokenPayload = Pick<User, 'id' | 'name' | 'accountType' | 'groupName'>