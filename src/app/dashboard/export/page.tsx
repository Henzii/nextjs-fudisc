import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import config from "@/config/config";
import { FC } from "react";

const Page: FC = () => {
    return (
        <>
            <h2 className="text-3xl mb-4">Export</h2>
            <p>Export your scroes to a .csv file</p>
            <h3 className="text-xl mb-2 mt-4">Include fields</h3>
            <form className="ml-4" method="post" action={config('fuDiscServerUri') + '/export'}>
                <Checkbox name="startDate" label="Start time" defaultChecked />
                <Checkbox name="endDate" label="End time" defaultChecked />
                <Checkbox name="course" label="Course name" defaultChecked />
                <Checkbox name="layout" label="Layout name" defaultChecked />
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
