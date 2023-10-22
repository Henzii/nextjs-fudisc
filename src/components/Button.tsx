import { ButtonHTMLAttributes, ReactNode } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
}
const Button = ({ children, ...rest }: Props) => (
    <button
        {...rest}
        className="px-6 py-1 rounded-2xl border-2 shadow-md hover:bg-emerald-800 hover:text-white transition"
    >
        {children}
    </button>
)

export default Button