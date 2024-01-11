"use server";

import { getUser } from "@/services/user"
import { FC } from "react"
import EditUserInfo from "./EditUserInfo"
import { handleChangeSettings } from "./actions"

type Props = {
    params: {
        id: string
    }
}

const Page: FC<Props> = async ({ params }) => {
    const user = await getUser(params.id)

    if (!user) {
        return (
            <>
                <h1 className="text-3xl font-bold mb-6">Not found</h1>
                <p>User with id <b>{params.id}</b> not found.</p>
            </>
        )
    }
    return (
        <EditUserInfo user={user} action={handleChangeSettings} />
    )
}

export default Page