import clsx from "clsx"
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react"

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => (
    <textarea
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

Textarea.displayName = "Textarea"