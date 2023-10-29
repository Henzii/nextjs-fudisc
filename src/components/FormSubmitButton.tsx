'use client'

import { ButtonHTMLAttributes, FC, ReactNode } from "react"
import Button from "./Button"
import { useFormStatus } from 'react-dom'
import Spinner from "@/components/Spinner";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    children: ReactNode
}

const FormSubmitButton: FC<Props> = ({ children, ...rest }) => {
    const { pending } = useFormStatus()
    return <Button type="submit" {...rest}>{pending ? <Spinner /> : children}</Button>
}

export default FormSubmitButton