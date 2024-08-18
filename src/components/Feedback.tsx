"use client";
import { ActionState, isActionErrorState, isActionSuccessState } from "@/types/actions";
import FormSubmitButton from "./FormSubmitButton";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { FC } from "react";
import { useFormState } from "react-dom";
import Notification from "./Notification";

type Props = {
    action: (previousState: ActionState, formData: FormData) => Promise<ActionState>
}

const Feedback: FC<Props> = ({ action }) => {
    const [state, formAction] = useFormState(action, null)

    if (isActionSuccessState(state)) {
        return (
            <div className="border-green-600 border-4 rounded-lg p-5 bg-green-50 md:p-10">
                <h2 className="text-green-600 font-semibold text-xl md:text-2xl">Success!</h2>
                Thank you for your feedback! We&apos;ll promise to ignore it.
            </div>
        )
    }

    return (
        <>
            {isActionErrorState(state) && <Notification variant="error" message={state.message ?? 'Feedback not sent :P'} />}
            <form action={formAction}>
                <input type="text" name="hunajapurkki" style={{ visibility: 'hidden' }} />
                <div className="flex flex-col max-w-sm">
                    <label htmlFor="email">Email </label>
                    <Input type="email" id="email" name="email" />
                </div>
                <div className="flex flex-col max-w-sm mt-2">
                    <label htmlFor="subject">Subject</label>
                    <Input type="text" id="subject" name="subject" />
                </div>
                <div className="flex flex-col max-w-sm mt-3 mb-3">
                    <label htmlFor="message">Message</label>
                    <Textarea id="message" rows={5} name="message" />
                </div>
                <FormSubmitButton>Send</FormSubmitButton>
            </form>
        </>
    )
}

export default Feedback