"use client"

import { cn } from "@/lib/utils"

const NavItems = [
  {
    title: "Space",
    name: "space",
  },
  {
    title: "Additional",
    name: "additional",
  },
  {
    title: "Appearance",
    name: "appearance",
  },
]

export function SidebarNav({activeItem,}: {activeItem: string}) {
  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}>
      {NavItems.map((item) => (
        <div
          key={item.name}
          className={`font-medium text-sm py-2 px-4 flex items-center cursor-pointer rounded-md transition-colors duration-200 
          ${
            activeItem === item.name
              ? 'bg-primary text-primary-foreground shadow-inner'
              : 'cursor-context-menu'
          }`}
        >
          {item.title}
        </div>
      ))}
    </nav>
  )
}
