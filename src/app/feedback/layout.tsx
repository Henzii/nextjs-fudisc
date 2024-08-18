import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <section className="p-2 md:p-6 lg:p-8 max-w-5xl m-auto">
            {children}
        </section>
    )
}

export default Layout