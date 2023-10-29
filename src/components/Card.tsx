import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import Button from "./Button"

type Props = {
    header: string
    href: string
    image?: string
    children?: string
}

const Card: FC<Props> = ({ header, href, image, children }) => {
    return (
        <Link href={href}>
            <article className="border-2 rounded-xl w-[11rem] min-h-full pt-2 hover:shadow-lg transition duration-300 flex flex-col">
                {image && (
                    <div className="h-[3rem] w-full">
                        <Image src={image} width={50} height={50} alt="Pic" className="m-auto" />
                    </div>
                )}
                <header className="text-center text-2xl font-semibold my-2">{header}</header>
                <div className="p-2 text-sm text-center">
                    <p>{children}</p>
                </div>
                <div className="mt-auto w-full py-4">
                    <Button className="mx-auto block">Check out</Button>
                </div>
            </article>
        </Link>
    )
}

export default Card