import { searchUser } from "@/services/user";
import { ActionState } from "@/types/actions"
import { User } from "@/types/user";

export type SearchUserActionState = ActionState<{
    users: Pick<User, 'id' | 'name'>[]
    hasMore: boolean
}>

export const handleSearchUser = async (_prevState: unknown, formData: FormData): Promise<SearchUserActionState> => {
    "use server";
    const search = formData.get('username')?.toString()
    if (!search) return { error: true, message: 'Username field was empty' }

    const response = await searchUser(search)
    if (!response) {
        return { error: true, message: "Username was not changed! Username is already taken or did not meet the requirements." }
    } else {
        return {
            success: true,
            users: response.users,
            hasMore: response.hasMore
        }
    }
}