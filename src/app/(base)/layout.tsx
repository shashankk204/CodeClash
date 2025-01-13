import MenuBar from "./MenuBar";
import NavBar from "./NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div className="flex min-h-screen flex-col ">
            <NavBar></NavBar>
            <div className="mx-auto flex w-full max-w-[90rem] grow gap-5 p-5  ">
              <MenuBar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80 "/>
              {children}
            </div>
            <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
        </div>
    
        
  );
}