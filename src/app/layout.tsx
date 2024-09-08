import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Authprovider from "@/context/Authprovider";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/context/ReduxProvider";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback",
  description: "Feedbacks made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn(
                    "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
                    inter.className
                )}>
        <Authprovider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >           
          <ReduxProvider> 
                {children}
          </ReduxProvider> 
            <Toaster />
          </ThemeProvider>
        </Authprovider>
      </body>
    </html>
  );
}
