"use server";
import InactiveUsers from "./InactiveUsers";
import { getInactiveUsersAction, deleteInactiveUsersAction } from "./actions";

const Page = () => {


    return (
        <InactiveUsers getInactiveUsersAction={getInactiveUsersAction} deleteInactiveUsersAction={deleteInactiveUsersAction} />
    )
}

export default Page;