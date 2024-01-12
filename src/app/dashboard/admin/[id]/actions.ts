import { updateSettings } from "@/services/user";
import { ActionState } from "@/types/actions"

export const handleChangeSettings = async (_prevState: unknown, formData: FormData): Promise<ActionState> => {
    "use server";

    const email = formData.get('email')?.toString()
    const group = formData.get('group')?.toString()
    const password = formData.get('password')?.toString() || undefined
    const userId = formData.get('userId')?.toString()

    if (!userId) {
        return {
            error: true
        }
    }

    const response = await updateSettings({ userId, email, groupName: group, password })

    if (!response) {
        return {
            error: true
        }
    }

    return {
        success: true,
    }
}