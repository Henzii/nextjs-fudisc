import { handleSearchUser } from "./actions";
import SearchUser from "./SearchUser";

const Page = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Admin</h1>
            <h2 className="text-2xl font-bold mb-6">Select user</h2>
            <SearchUser action={handleSearchUser} />
        </>
    )
}

export default Page;