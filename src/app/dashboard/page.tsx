import Card from "@/components/Card"

const Dashboard = () => {
    return (
        <section>
            <h2 className="text-3xl m-4">Dashboard</h2>
            <div className="flex flex-wrap">
                <Card header="Stats" />
                <Card header="Live" />
                <Card header="Settings" />
            </div>
        </section>
    )
}

export default Dashboard