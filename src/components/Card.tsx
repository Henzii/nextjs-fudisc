import Link from "next/link"
import { FC } from "react"

type Props = {
    header: string
}

const Card: FC<Props> = ({ header }) => {
    return (
        <Link href="dashboard/settings">
            <section className="border-2 m-3 w-36 h-44 rounded-3xl shadow-lg hover:shadow-none">
                <header className="text-center text-2xl m-5 font-semibold">{header}</header>
            </section>
        </Link>
    )
}

export default Card