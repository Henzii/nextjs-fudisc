import { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement>
export const Input = (props: Props) => (
    <input
        {...props}
        className="border rounded-lg p-1 border-emerald-900 shadow-md outline-emerald-300 hover:outline focus:outline-emerald-600 transform duration-200"
    />
)