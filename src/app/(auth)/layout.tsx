import type { Metadata } from "next";
import { Inter} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get started",
  description: "get started with feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={inter.className} >
        <div className="container w-[30%] h-screen">
      {children}
      </div>
        </body>
    </html>
  );
}
