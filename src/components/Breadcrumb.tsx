"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const Breadcrumb = () => {
    const pathnames = usePathname().split('/').slice(1, -1)
    if (pathnames.length == 0) {
        return null
    }
    return (
        <div>...
            {pathnames.map((name, index) => (
                <>/
                    <Link
                        key={name + index + ''}
                        href={`/${pathnames.join('/')}`}
                        className="text-blue-700"
                    >
                        {name}
                    </Link>
                </>
            ))}
        </div>
    )
}

export default Breadcrumb
