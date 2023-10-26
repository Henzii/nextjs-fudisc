import Card from "@/components/Card"
import Switch from "@/components/Switch"

const Dashboard = () => {
    return (
        <section>
            <h2 className="text-3xl m-4">Dashboard</h2>
            <div className="flex flex-wrap">
                <Card header="Stats" href="/dashboard/stats" />
                <Card header="Live" href="" />
                <Card header="Settings" href="/dashboard/settings" />
            </div>

            <Switch />
        </section>
    )
}

export default Dashboard