"use client";

import { FC } from "react";
import { Input } from "./Input";
import FormSubmitButton from "./FormSubmitButton";
import { User } from "@/types/user";
import { ActionState, isActionErrorState } from "@/types/actions";
import { useFormState } from "react-dom";

type Props = {
    me: User
    action: (previousState: ActionState, formData: FormData) => Promise<ActionState>
}

const ChangeUsername: FC<Props> = ({ me, action }) => {
    const [state, formAction] = useFormState(action, null)
    return (
        <section>
            <h2 className="text-2xl">Username</h2>
            <p className="mb-2">
                Username must be unique and have at least three characters.
            </p>
            {isActionErrorState(state) ? (
                <div className="text-red-500 font-bold">Failed! {state.message}</div>
            ) : state?.success ? (
                <div className="text-green-600 font-bold">Username changed.</div>
            ) : <div />}
            <form action={formAction}>
                <Input type="text" defaultValue={me.name} className="mr-3" name="newUsername" />
                <FormSubmitButton>Change</FormSubmitButton>
            </form>
        </section>
    )
}

export default ChangeUsername