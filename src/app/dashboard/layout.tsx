import type { FC, ReactNode } from "react"
import WithToken from "@/components/RequiresAuth"
import Breadcrumb from "@/components/Breadcrumb"

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <WithToken>
            <section className="p-2 md:p-6 lg:p-8 max-w-5xl m-auto">
                <nav className="lg:ml-[-4rem] mb-6 text-xl">
                    <Breadcrumb />
                </nav>
                {children}
            </section>
        </WithToken>
    )
}

export default Layout