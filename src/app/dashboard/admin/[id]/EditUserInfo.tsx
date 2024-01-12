"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { Input } from "@/components/Input";
import { ActionState, isActionErrorState } from "@/types/actions";
import { User } from "@/types/user";
import { FC, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import Notification from "@/components/Notification"

type Props = {
    user: User
    action: (prev: ActionState, formData: FormData) => Promise<ActionState>
}
const EditUserInfo: FC<Props> = ({ user, action }) => {
    const [state, formAction] = useFormState(action, null)
    const [displayNotification, setDisplayNotificaton] = useState(false)
    const passwordRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (state) {
            setDisplayNotificaton(true);
            const timerId = setTimeout(() => setDisplayNotificaton(false), 5000)
            if (passwordRef.current) {
                passwordRef.current.value = ""
            }
            return () => clearTimeout(timerId)
        }
    }, [state])
    return (
        <div>
            {displayNotification && (
                isActionErrorState(state) ? (
                    <Notification variant="error" message="Somethign went wrong :P" />
                ) : (
                    <Notification variant="success" message={`User info changed.`} />
                )
            )}
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <form className="mt-6" action={formAction}>
                <div className="flex items-center mb-2">
                    <span className="basis-16">ID</span>
                    <Input type="text" name="userId" value={user.id} readOnly />
                </div>
                <div className="flex items-center mb-2">
                    <span className="basis-16">Email</span>
                    <Input type="email" name="email" defaultValue={user.email} />
                </div>
                <div className="flex items-center mb-4">
                    <span className="basis-16">Group:</span>
                    <Input type="text" name="group" defaultValue={user.groupName} />
                </div>
                <h2 className="text-xl font-semibold mb-4">Change password</h2>
                <div>
                    <Input type="password" name="password" className="mb-2 mr-2" placeholder="New password" ref={passwordRef} />
                </div>
                <FormSubmitButton className="mt-8">Save changes</FormSubmitButton>
            </form>
        </div>
    )
}

export default EditUserInfo