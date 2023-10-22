"use client"

import Link from "next/link"
import { redirect } from "next/navigation"

const LogoutButton = () => {
    const handleLogout = () => {
        console.log(document.cookie)
        document.cookie = "loginToken=;serverToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT"
        redirect('/')
    }
    return <Link href="/" onClick={handleLogout}>Logout</Link>
}

export default LogoutButton