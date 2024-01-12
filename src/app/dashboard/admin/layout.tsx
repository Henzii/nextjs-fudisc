import { isAdmin } from "@/common/utils";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode
}
const Layout: FC<Props> = ({ children }) => {
    const admin = isAdmin()

    if (!admin) {
        redirect('/dashboard')
    }

    return (
        <>{children}</>
    )
}

export default Layout