import type { FC, ReactNode } from "react"
import WithToken from "@/components/RequiresAuth"

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {

    return (
        <WithToken>
            <section className="p-8 max-w-5xl m-auto">
                {children}
            </section>
        </WithToken>
    )
}

export default Layout