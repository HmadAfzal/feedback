import Nav from "@/components/nav/Nav";

interface RootLayoutProps {
    children: React.ReactNode;
  }
  
  export default async function RootLayout({ children }: RootLayoutProps) {
    return (
      <div className="w-[90%] container">
        
        {children}
      </div>
    );
  }