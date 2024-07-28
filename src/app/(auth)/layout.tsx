
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-[30%] container h-screen">
      {children}
    </div>
  );
}