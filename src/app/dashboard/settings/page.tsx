import { getUserInfo } from "@/services/user"

const Settings = async () => {
    const me = await getUserInfo()

    return (
        <div>
            <div>Name: {me.name}</div>
            <div>Email: {me.email}</div>
            <div>Group: {me.groupName}</div>
        </div>
    )
}

export default Settings