import FormSubmitButton from "@/components/FormSubmitButton"
import { Input } from "@/components/Input"
import { getUserInfo } from "@/services/user"

const Settings = async () => {
    const me = await getUserInfo()

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Set things</h1>
            <div className="flex flex-row items-center">
                <div className="basis-1/4">Name:</div>
                <Input defaultValue={me.name} type="text" />
            </div>
            <div className="flex flex-row items-center mt-1">
                <div className="basis-1/4">Email:</div>
                <Input defaultValue={me.email} type="email" />
            </div>
            <div className="flex flex-row items-center mt-1 mb-4">
                <div className="basis-1/4">Group:</div>
                <div><Input defaultValue={me.groupName} /></div>
            </div>
            <FormSubmitButton disabled>Save</FormSubmitButton>
            <div className="text-sm">Not in use</div>
        </div>
    )
}

export default Settings