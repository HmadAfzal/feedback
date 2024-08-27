import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import Image from "next/image"
import { SidebarNav } from "./components/sidebar-nav"



export const metadata: Metadata = {
  title: "Create space",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Space",
    href: "/shadcn",
  },
  {
    title: "Additional",
    href: "/shadcn/account",
  },
  {
    title: "Appearance",
    href: "/shadcn/appearence",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Create space</h2>
          <p className="text-muted-foreground">
            Create a space and set other preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}