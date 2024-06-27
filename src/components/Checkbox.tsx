import { FC, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string
}

const Checkbox: FC<Props> = ({ label, name, ...rest }) => {
    return (
        <div className="flex items-center gap-2">
            <input {...rest} type="checkbox" id={name} name={name} className="w-4 h-4" />
            <label htmlFor={name}>{label}</label>
        </div>
    )
}

export default Checkbox