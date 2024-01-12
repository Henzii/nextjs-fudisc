import clsx from "clsx";
import { FC } from "react";

type Props = {
    variant: 'error' | 'success'
    message: string
}

const Notification: FC<Props> = ({ variant, message }) => {
    return (
        <div className="absolute top-0 right-5">
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