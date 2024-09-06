import { Metadata } from "next"



export const metadata: Metadata = {
  title: "Create space",
  description: "Create a space to get started",
}



interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:px-20">
        {children}
      </div>
    </>
  )
}