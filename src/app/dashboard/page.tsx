import Card from "@/components/Card"
import Switch from "@/components/Switch"

const Dashboard = () => {
    return (
        <section>
            <h2 className="text-3xl m-4">Dashboard</h2>
            <div className="flex flex-wrap">
                <Card header="Results" href="/dashboard/stats" image="/competition.png" />
                <Card header="Live" href="" />
                <Card header="Settings" href="/dashboard/settings" />
            </div>
        </section>
    )
}

export default Dashboard