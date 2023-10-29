import clsx from "clsx"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    className?: string
}
const Button = ({ children, disabled = false, className, ...rest }: Props) => (
    <button
        title={disabled ? "Disabled" : undefined}
        className={
            clsx("px-6 py-2 rounded-2xl border-2 shadow-md transition hover:shadow-lg duration-200", {
                ['bg-gray-300 hover:cursor-not-allowed']: disabled,
                ['hover:bg-emerald-800 hover:text-white']: !disabled
            }, className)}
        {...rest}
    >
        {children}
    </button>
)

export default Button