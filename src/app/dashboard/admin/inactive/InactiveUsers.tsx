"use client";
import FormSubmitButton from "@/components/FormSubmitButton"
import { Input } from "@/components/Input"
import { ActionState, isActionErrorState, isActionSuccessState } from "@/types/actions";
import { FC, useRef } from "react";
import { useFormState } from "react-dom"
import { type InactiveUsers } from "./actions";
import Notification from "@/components/Notification";
import Checkbox from "@/components/Checkbox";
import Link from "next/link";
import { revalidatePath } from "next/cache";

type Props = {
    getInactiveUsersAction: (previousState: unknown, formData: FormData) => Promise<ActionState<InactiveUsers>>,
    deleteInactiveUsersAction: (previousState: unknown, formData: FormData) => Promise<ActionState>
}

const InactiveUsers: FC<Props> = ({ getInactiveUsersAction, deleteInactiveUsersAction }) => {
    const ref = useRef<HTMLFormElement>(null)
    const [inactivesState, getInactiveAction] = useFormState(getInactiveUsersAction, null)
    const [deleteInactiveState, deleteInactiveAction] = useFormState(deleteInactiveUsersAction, null)

    return (
        <div>
            {isActionErrorState(inactivesState) && (
                <Notification
                    variant="error"
                    message={inactivesState.message || "An error occurred while fetching inactive users"} />
            )}
            {isActionErrorState(deleteInactiveState) && (
                <Notification
                    variant="error"
                    message={deleteInactiveState.message || "An error occurred while deleting inactive users"} />
            )}
            {isActionSuccessState(deleteInactiveState) && (
                <Notification
                    variant="success"
                    message={<>
                        Users deleted successfully. <button
                            form="get-inactive-users"
                            type="submit"
                        >Refresh</button>
                    </>} />
            )}
            <form action={getInactiveAction} id="get-inactive-users">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    List users that haven&apos;t played any games and were created before a specific date.
                </label>
                <div className="flex flex-row gap-3 items-baseline">
                    <Input
                        type="text"
                        placeholder="MM.DD.YYYY"
                        className="mb-4"
                        name="createdBefore"
                    />
                    <FormSubmitButton>Ok</FormSubmitButton>
                </div>
            </form>

            {isActionSuccessState(inactivesState) && (
                <form className="flex flex-col gap-5" action={deleteInactiveAction}>
                    <div className="overflow-x-auto mb-5">
                        <table className="w-full table" cellPadding={6}>
                            <thead>
                                <tr>
                                    <th className="text-left">Select</th>
                                    <th className="text-left">#</th>
                                    <th className="text-left">Name</th>
                                    <th className="text-left">id</th>
                                    <th className="text-left">Created</th>
                                </tr>
                            </thead>
                            <tbody className="[&>tr:nth-child(odd)]:bg-slate-100 text-gray-600">
                                {inactivesState.users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td><Checkbox name={"ids"} value={user.id} defaultChecked /></td>
                                        <td>{index + 1}.</td>
                                        <td>{user.name}</td>
                                        <td>{user.id}</td>
                                        <td>{new Date(+user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Checkbox name="safetyCheck" label="I really want to delete these users" className="mb-10" />
                    <FormSubmitButton>Delete users</FormSubmitButton>
                </form>
            )}
        </div>
    )
}

export default InactiveUsers