import { deleteInactiveUsers, getInactiveUsers } from "@/services/user";
import { ActionState } from "@/types/actions";
import { InactiveUser } from "@/types/user";
import { revalidatePath } from "next/cache";

export type InactiveUsers = {
    users: InactiveUser[]
}

export const getInactiveUsersAction = async (_prevState: unknown, formData: FormData): Promise<ActionState<InactiveUsers>> => {
    "use server";
    const createdBefore = formData.get('createdBefore')?.toString()

    if (!createdBefore) {
        return {
            error: true,
            message: 'Created before date is required'
        };
    }

    try {
        const users = await getInactiveUsers(createdBefore)

        return {
            success: true,
            users
        };

    } catch (e: unknown) {
        return {
            error: true,
            message: 'An error occurred while fetching inactive users'
        };
    }
}

export const deleteInactiveUsersAction = async (_prevState: unknown, formData: FormData): Promise<ActionState> => {
    "use server";
    const userIds = formData.getAll('ids') as string[];
    const safetyCheck = formData.get('safetyCheck')?.toString();

    if (safetyCheck !== 'on') {
        return {
            error: true,
            message: 'You must really want to delete these users. Please check the safety checkbox.'
        };
    }

    if (userIds.length === 0) {
        return {
            error: true,
            message: 'No users selected for deletion'
        };
    }

    try {
        await deleteInactiveUsers(userIds);
        return {
            success: true,
        };

    } catch (e: unknown) {
        return {
            error: true,
            message: 'An error occurred while deleting inactive users'
        };
    }
}