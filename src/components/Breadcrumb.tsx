"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

const Breadcrumb = () => {
    const pathnames = usePathname().split('/').slice(1, -1)
    if (pathnames.length == 0) {
        return null
    }
    return (
        <div>...
            {pathnames.map((name, index) => (
                <Fragment key={name + index + ''}>/
                    <Link
                        href={`/${pathnames.join('/')}`}
                        className="text-blue-700"
                    >
                        {name}
                    </Link>
                </Fragment>
            ))}
        </div>
    )
}

export default Breadcrumb
