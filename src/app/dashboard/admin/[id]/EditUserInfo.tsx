"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { Input } from "@/components/Input";
import { ActionState } from "@/types/actions";
import { User } from "@/types/user";
import { FC } from "react";
import { useFormState } from "react-dom";

type Props = {
    user: User
    action: (prev: ActionState, formData: FormData) => Promise<ActionState>
}
const EditUserInfo: FC<Props> = ({ user, action }) => {
    const [state, formAction] = useFormState(action, null)
    return (
        <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <form className="mt-6" action={formAction}>
                <div className="flex items-center mb-2">
                    <span className="basis-16">ID</span>
                    <span>{user.id}</span>
                </div>
                <div className="flex items-center mb-2">
                    <span className="basis-16">Email</span>
                    <Input type="email" name="email" defaultValue={user.email} />
                </div>
                <div className="flex items-center mb-4">
                    <span className="basis-16">Group:</span>
                    <Input type="text" name="group" defaultValue={user.groupName} />
                </div>
                <FormSubmitButton>Save</FormSubmitButton>
            </form>
            <form action={formAction} className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Change password</h2>
                <Input type="password" name="password" className="mb-2 mr-2" placeholder="New password" />
                <FormSubmitButton>Change</FormSubmitButton>
            </form>
        </div>
    )
}

export default EditUserInfo