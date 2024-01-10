import { isAdmin } from "@/common/utils";
import Card from "@/components/Card"
import { getUserInfo } from "@/services/user"
import { AccountType } from "@/types/user";

const Dashboard = async () => {

    const admin = isAdmin()
    console.log(admin)
    return (
        <section>
            <h2 className="text-3xl m-4">Dashboard</h2>
            <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-4">
                <Card header="Results" href="/dashboard/stats" image="/competition.png">
                    View group&apos;s competitions results.
                </Card>
                <Card header="Live now" href="/dashboard/live" image="/live.png">
                    Who&apos;s playing online right one. Sry, no spying on random people, only
                    friends&apos; games are listed.
                </Card>
                <Card header="Settings" href="/dashboard/settings" image="/settings.png">
                    Set settings, hammer nails and other stuff
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