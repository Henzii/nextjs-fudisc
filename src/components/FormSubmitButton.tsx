'use client'

import { FC, ReactNode } from "react"
import Button from "./Button"
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import Spinner from "@/components/Spinner";

type Props = {
    children: ReactNode
}

const FormSubmitButton: FC<Props> = ({ children }) => {
    const { pending } = useFormStatus()
    return <Button type="submit">{pending ? <Spinner /> : children}</Button>
}

export default FormSubmitButton