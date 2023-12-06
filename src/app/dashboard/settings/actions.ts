import { changeUsername } from "@/services/user";
import { ActionState } from "@/types/actions"

export const handleChangeUsername = async (_prevState: unknown, formData: FormData): Promise<ActionState> => {
    "use server";
    const newUsername = formData.get('newUsername')?.toString()
    if (!newUsername) return { error: true, message: 'New username field was empty' }

    const name = await changeUsername(newUsername)

    if (!name) {
        return { error: true, message: "Username was not changed! Username is already taken or did not meet the requirements." }
    } else {
        return {
            success: true
        }
    }
}