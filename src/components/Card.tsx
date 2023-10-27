import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

type Props = {
    header: string
    href: string
    image?: string
}

const Card: FC<Props> = ({ header, href, image }) => {
    return (
        <Link href={href}>
            <div className="border-2 m-3 min-w-[9rem] h-44 rounded-3xl shadow-lg hover:shadow-none transition duration-200">
                <header className="text-center text-2xl m-5 font-semibold">{header}</header>
                {image && <Image src={image} width={80} height={80} alt="Pic" className="m-auto" />}
            </div>
        </Link>
    )
}

export default Card