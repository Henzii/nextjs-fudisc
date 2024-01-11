import { ActionState } from "@/types/actions"

export const handleChangeSettings = async (_prevState: unknown, formData: FormData): Promise<ActionState> => {
    "use server";

    const email = formData.get('email')?.toString()
    const group = formData.get('group')?.toString()
    const password = formData.get('password')?.toString()

    console.log(email, group, password)

    await new Promise(resolve => { setTimeout(resolve, 1000) })

    return {
        success: true
    }
}