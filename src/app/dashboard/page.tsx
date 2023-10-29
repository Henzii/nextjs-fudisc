import Card from "@/components/Card"
import Switch from "@/components/Switch"

const Dashboard = () => {
    return (
        <section>
            <h2 className="text-3xl m-4">Dashboard</h2>
            <div className="flex flex-wrap gap-3">
                <Card header="Results" href="/dashboard/stats" image="/competition.png">
                    View group&apos;s competitions results.
                </Card>
                <Card header="Live now" href="/" image="/live.png">
                    Who&apos;s playing online right one. Sry, no spying on random people, only
                    friends&apos; games are listed.
                </Card>
                <Card header="Settings" href="/dashboard/settings" image="/settings.png">
                    Set settings, hammer nails and other stuff
                </Card>
            </div>
        </section>
    )
}

export default Dashboard