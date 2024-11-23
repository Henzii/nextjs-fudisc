import { getLogs } from "@/services/log"
import { LogType } from "@/types/log"
import clsx from "clsx"
import { format, fromUnixTime } from "date-fns"

const LogViewer = async () => {

    const logs = await getLogs()
    return (
        <section className="mt-8">
            <h2 className="text-2xl font-semibold">Captain&apos;s log</h2>
            {!logs && <p>Failed to fetch logs</p>}
            <div className="overflow-x-scroll">
                <table className="[>th]: text-left border-2 w-full" cellSpacing={1} cellPadding={2}>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Message</th>
                            <th>Type</th>
                            <th>Context</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs?.map((entry, index) => {
                            const date = format(fromUnixTime(+entry.createdAt / 1000), 'dd.MM.yyyy HH:mm')
                            return (
                                <tr key={index} className={clsx({
                                    ['bg-green-100']: entry.type === LogType.SUCCESS,
                                    ['bg-red-200']: entry.type === LogType.ERROR,
                                    ['bg-orange-200']: entry.type === LogType.WARNING
                                })}>
                                    <td>{date}</td>
                                    <td>{entry.message}</td>
                                    <td>{entry.type}</td>
                                    <td>{entry.context}</td>
                                    <td>{entry.user?.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default LogViewer