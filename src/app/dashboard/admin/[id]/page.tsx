import { FC } from "react"

type Props = {
    params: {
        id: string
    }
}

const Page: FC<Props> = ({ params }) => {
    return (
        <h2>{params.id}</h2>
    )
}

export default Page