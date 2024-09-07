'use client'
import {
  Github,
  LifeBuoy,
  LogOut,
  Menu,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { clearSpaceSlice } from "@/redux/spaceslice";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import ThemeToggle from "./ThemeToggle";

export function Dropdown() {
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
          <Link href={"/dashboard"}>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between py-2 rounded-lg px-2">
          <Link href={"/"}>Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between py-2 rounded-lg px-2">
            <span>
              <Link href={"/create-space"}>Create space</Link>
            </span>
            <PlusCircle className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between rounded-lg px-2 hover:bg-transparent">
            <span>Theme</span>
<ThemeToggle/>
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
