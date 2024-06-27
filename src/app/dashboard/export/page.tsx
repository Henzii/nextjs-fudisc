import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import config from "@/config/config";
import { COOKIES } from "@/types/enums";
import { cookies } from "next/headers";
import { FC } from "react";

const Page: FC = () => {
    const token = cookies().get(COOKIES.ServerToken)?.value ?? '';
    return (
        <>
            <h2 className="text-3xl mb-4">Export</h2>
            <p>Export your scroes to a .csv file</p>
            <h3 className="text-xl mb-2 mt-4">Include fields</h3>
            <form className="ml-4" method="get" action={config('fuDiscServerUri') + '/export'}>
                <input type="text" name="token" value={token} hidden />
                <Checkbox name="startTime" label="Start time" defaultChecked />
                <Checkbox name="endTime" label="End time" defaultChecked />
                <Checkbox name="course" label="Course name" defaultChecked />
                <Checkbox name="layout" label="Layout name" defaultChecked />
                <Checkbox name="userName" label="User name" defaultChecked />
                <Checkbox name="par" label="Par" defaultChecked />
                <Checkbox name="total" label="Total" defaultChecked />
                <Checkbox name="hc" label="HC" defaultChecked />
                <Checkbox name="beers" label="Beers" defaultChecked />
                <Checkbox name="scores" label="Scores" defaultChecked />
                <Button className="mt-4" type="submit">Export!</Button>
            </form>
        </  >
    )
}

export default Page;
