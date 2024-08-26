import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Feedback",
  description: "Get started with feedback",
}

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <div>
      {children}
    </div>
  )
}