import clsx from "clsx"
import { FC, ReactNode } from "react"

type Props = {
    header: string
    children: string
    className?: string
    variant?: 'black' | 'white'
    smallText?: string | ReactNode
}

const ArticleBlock: FC<Props> = ({ header, children, className, smallText, variant = 'white' }) => {
    return (
        <article className={clsx('p-5 py-36 flex content-center text-left relative', className, {
            ['bg-black text-white']: variant === 'black',
            ['bg-white text-black']: variant === 'white'
        })}>
            <div className="max-w-6xl m-auto">
                <h2 className="text-3xl font-bold my-5 lg:text-6xl">{header}</h2>
                <p className="text-2xl lg:text-3xl">
                    {children}
                </p>
                {smallText && (
                    <span className="absolute bottom-0 left-0 text-xs opacity-90 p-1">{smallText}</span>
                )}
            </div>
        </article>
    )
}

export default ArticleBlock