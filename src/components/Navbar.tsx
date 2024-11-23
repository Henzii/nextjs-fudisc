import Link from "next/link"
import RequiresAuth from "./RequiresAuth"
import LogoutButton from "./LogoutButton"

const Navbar = () => {
    return (
        <header className="bg-emerald-900 flex p-5 text-green-200 place-content-between items-center font-semibold lg:px-52">
            <h1 className="text-3xl font-bold"><Link href="/">FuDisc</Link></h1>
            <nav className="gap-5 flex">
                <RequiresAuth withNoAuth={<Link href="/login">Login</Link>}>
                    <>
                        <Link href="/dashboard">Dashboard</Link>
                        <LogoutButton />
                    </>
                </RequiresAuth>
            </nav>
        </header>
    )
}

export default Navbar
