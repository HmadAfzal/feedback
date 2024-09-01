import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComputerIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

  return (
    <Tabs defaultValue={theme}>
    <TabsList className="flex rounded-full bg-neutral-200 dark:bg-neutral-900">
      <TabsTrigger value="system" className="p-2 rounded-full " onClick={() => setTheme("system")} >
        <ComputerIcon className="size-3" />
      </TabsTrigger>
      <TabsTrigger value="light" className="p-2 rounded-full " onClick={() => setTheme("light")} >
        <SunIcon className="size-3" />
      </TabsTrigger>
      <TabsTrigger value="dark" className="p-2 rounded-full " onClick={() => setTheme("dark")} >
        <MoonIcon className="size-3" />
      </TabsTrigger>
    </TabsList>
  </Tabs>
  )
}

export default ThemeToggle
