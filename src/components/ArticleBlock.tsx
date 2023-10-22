import clsx from "clsx"
import Image from "next/image"
import { FC, ReactNode } from "react"

type Props = {
    header: string
    children: string
    className?: string
    variant?: 'black' | 'white'
    smallText?: string | ReactNode
    image?: string
    imageRight?: boolean
}

const ArticleBlock: FC<Props> = ({ header, children, className, image, smallText, variant = 'white', imageRight }) => {
    return (
        <article className={clsx('p-5 py-36 flex content-center text-left relative', className, {
            ['bg-slate-900 text-white']: variant === 'black',
            ['bg-white text-black']: variant === 'white'
        })}>
            <div className={clsx("max-w-7xl m-auto flex flex-col lg:flex-row lg:gap-28", { ['lg:flex-row-reverse']: imageRight })}>
                {image && <Image src={image} width={300} height={300} alt="Beer!" className="m-auto w-52 lg:w-64" />}
                <div>
                    <h2 className="text-3xl font-bold my-5 lg:text-6xl">{header}</h2>
                    <p className="text-2xl lg:text-3xl">
                        {children}
                    </p>
                </div>
                {smallText && (
                    <span className="absolute bottom-0 left-0 text-xs opacity-90 p-1">{smallText}</span>
                )}
            </div>
        </article>
    )
}

export default ArticleBlock