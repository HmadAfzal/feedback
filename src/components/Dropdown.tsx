import {
  Computer,
  ComputerIcon,
  Github,
  LifeBuoy,
  LogOut,
  Menu,
  Moon,
  MoonIcon,
  PlusCircle,
  Sun,
  SunIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { clearSpaceSlice } from "@/redux/spaceslice";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Dropdown() {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const handleSignout = async () => {
    dispatch(clearSpaceSlice());
    await signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 dark:border-neutral-800 border-neutral-300 p-3 rounded-lg dark:bg-[#121212] bg-[#ffffff] text-muted-foreground">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center justify-between py-2 rounded-lg px-2">
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between py-2 rounded-lg px-2">
            <span>
              <Link href={"/create-space"}>Create space</Link>
            </span>
            <PlusCircle className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between rounded-lg px-2 hover:bg-transparent">
            <span>Theme</span>
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
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center justify-between py-2 rounded-lg px-2">
            <span><Link href={"https://github.com/HmadAfzal/feedback"}>GitHub</Link></span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between py-2 rounded-lg px-2">
            <span>Support</span>
            <LifeBuoy className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignout}
            className="flex items-center justify-between py-2 rounded-lg px-2"
          >
            <span>Log out</span>
            <LogOut className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
