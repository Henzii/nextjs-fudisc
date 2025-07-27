import { handleSearchUser } from "./actions";
import SearchUser from "./SearchUser";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Admin</h1>
            <h2 className="text-2xl font-bold mb-6">Select user</h2>
            <SearchUser action={handleSearchUser} />
            <h2 className="text-2xl font-bold my-6">Inactive users</h2>
            <Link href="/dashboard/admin/inactive" className="text-blue-500 hover:underline mb-6">
                View Inactive Users
            </Link>
            <h2 className="text-2xl font-bold my-6">Logs</h2>
            <Link href="/dashboard/admin/logs" className="text-blue-500 hover:underline mb-6">View Logs</Link >
        </>
    )
}

export default Page;