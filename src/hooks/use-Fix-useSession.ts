import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useFixSession(){
    const usersession=useSession();
    useEffect(()=>{
        async function Resolve() {
            const session=await getSession();
            await usersession.update(session)
        }
        Resolve();
    },[])
    return usersession
}