"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { Input } from "@/components/Input";
import { SearchUserActionState, handleSearchUser } from "./actions";
import { useFormState } from "react-dom";
import { FC } from "react";
import { isActionSuccessState } from "@/types/actions";
import { SafeUser } from "@/types/user";
import Link from "next/link";

type Props = {
    action: (previousState: SearchUserActionState, formData: FormData) => Promise<SearchUserActionState>
}

const SearchUser: FC<Props> = ({ action }) => {
    const [state, formAction] = useFormState(action, null)
    return (
        <>
            <form action={formAction}>
                Username: <Input name="username" />
                <FormSubmitButton className="ml-2 mt-2">Search</FormSubmitButton>
            </form>
            {isActionSuccessState(state) && (
                <div className="mt-5">
                    <h3 className="text-lg font-semibold">Found users</h3>
                    {state.hasMore && (
                        <p>Not all found users are listed here because there were too many.</p>
                    )}
                    <div className="flex flex-wrap">
                        {state.users.map(user => <SingleUser user={user} key={user.id} />)}
                    </div>
                </div>
            )}
        </>
    )
}

const SingleUser: FC<{ user: SafeUser }> = ({ user }) => {
    return (
        <Link
            href={`/dashboard/admin/${user.id}`}
            className="border rounded-md shadow-sm p-2 mr-2 mt-1 bg-blue-400 text-white"
        >
            {user.name}
        </Link>
    )
}

export default SearchUser