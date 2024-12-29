import NavBar from "./NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div className="min-h-screen w-screen flex flex-col">
            <NavBar></NavBar>
            <div className="mx-auto max-w-7xl p-5">{children}</div>
        </div>
    
        
  );
}