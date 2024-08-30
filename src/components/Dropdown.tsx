import {
    Computer,
    Github,
    LifeBuoy,
    LogOut,
    Menu,
    Moon,
    Settings,
    Sun,
    User,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { clearSpaceSlice } from "@/redux/spaceslice";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
  
  export function Dropdown() {
    const { setTheme } = useTheme();
    const dispatch=useAppDispatch()
    const handleSignout = async () => {
        dispatch(clearSpaceSlice())
        await signOut();
      
   };
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost"><Menu/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 border-neutral-800 p-3 rounded-lg dark:bg-[#121212] bg-[#ffffff]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Account  setting</span>
             
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Sun className="mr-2 h-4 w-4" />
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="border-neutral-800 p-2 rounded-lg dark:bg-[#121212] bg-[#ffffff]">
                  <DropdownMenuItem>
                    <Sun className="mr-2 h-4 w-4" />
                    <span onClick={() => setTheme("light")}>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Moon className="mr-2 h-4 w-4" />
                    <span onClick={() => setTheme("dark")}>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Computer className="mr-2 h-4 w-4" />
                    <span onClick={() => setTheme("system")}>System</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  