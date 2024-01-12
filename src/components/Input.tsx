import clsx from "clsx"
import { InputHTMLAttributes, forwardRef } from "react"

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
    <input
        {...props}
        ref={ref}
        className={clsx(
            "border rounded-lg p-1 border-emerald-900 shadow-md outline-emerald-600",
            "hover:outline focus:outline-emerald-800 transform duration-200", {
            "bg-gray-200": props.disabled || props.readOnly
        }, props.className)
        }
    />
))

Input.displayName = "Input"