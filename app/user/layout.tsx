import { ReactNode } from "react";
import { SideBar } from "../components/SideBar";
import { getUser } from "../actions/getUser";
import { UserLists } from "../components/UserLists";

export default async function UserLayOut({ children }: { children: ReactNode }) {
    
    const users = await getUser();



    return (
        <SideBar>
            <div className="h-full">
            <UserLists items={users!}/>
            {children}
            </div>
        </SideBar>
    )
}