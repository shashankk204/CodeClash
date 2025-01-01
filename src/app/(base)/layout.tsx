import NavBar from "./NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div className="flex min-h-screen flex-col ">
            <NavBar></NavBar>
            <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5 ">
              {children}
            </div>
        </div>
    
        
  );
}