"use server";
import Feedback from "@/components/Feedback"
import { sendFeedback } from "./actions"

const Page = () => {
    return (
        <>
            <h2 className="text-3xl mb-4">Feedback</h2>
            <Feedback action={sendFeedback} />
        </>

    )
}

export default Page