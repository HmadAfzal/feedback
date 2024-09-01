import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="container">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}