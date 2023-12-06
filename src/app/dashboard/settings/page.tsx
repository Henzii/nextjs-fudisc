"use server";

import { getUserInfo } from "@/services/user"
import { handleChangeUsername } from "./actions"
import ChangeUsername from "@/components/ChangeUsername"

const Settings = async () => {
    const me = await getUserInfo()
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Set things</h1>
            <ChangeUsername me={me} action={handleChangeUsername} />
        </div>
    )
}

export default Settings