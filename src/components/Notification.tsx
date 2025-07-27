import clsx from "clsx";
import { FC, ReactNode } from "react";

type Props = {
    variant: 'error' | 'success'
    message: ReactNode
}

const Notification: FC<Props> = ({ variant, message }) => {
    return (
        <div className="sticky top-0">
            <div
                className={clsx("p-3 my-2 rounded-lg shadow-lg text-lg", {
                    ['bg-red-500 text-white']: variant === "error",
                    ['bg-green-600 text-white']: variant === "success"
                })}
            >
                {message}
            </div>
        </div>
    )
}

export default Notification