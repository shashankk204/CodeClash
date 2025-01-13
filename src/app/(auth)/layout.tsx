import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


    const user=await auth();
    console.log(user)
    if(user) redirect('/');

    
  return (
    <>
    
              {children}
            
    </>
           
      
  );
}