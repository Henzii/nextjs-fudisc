import { isAdmin } from "@/common/utils";
import Card from "@/components/Card"

const Dashboard = async () => {

    const admin = isAdmin()
    return (
        <section>
            <h2 className="text-3xl m-4">Dashboard</h2>
            <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-4">
                <Card header="Results" href="/dashboard/stats" image="/competition.png">
                    View group&apos;s competitions results.
                </Card>
                <Card header="Live now" href="/dashboard/live" image="/live.png">
                    Who&apos;s playing online right now. Sry, no spying on random people, only
                    friends&apos; games are listed.
                </Card>
                <Card header="Settings" href="/dashboard/settings" image="/settings.png">
                    Set settings, hammer nails and other stuff
                </Card>
                <Card header="My games" href="/dashboard/games" image="/games.png">
                    My 10 latest games
                </Card>
                <Card header="Export" href="/dashboard/export" image="/export.png">
                    Export games to .csv file
                </Card>
                {admin && (
                    <Card header="Admin stuff" href="/dashboard/admin" image="/admin.png">
                        Admin stuff here
                    </Card>
                )}
            </div>
        </section>
    )
}

export default Dashboard