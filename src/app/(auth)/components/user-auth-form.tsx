"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { IoLogoGoogle } from "react-icons/io"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"


export function UserAuthForm() {
const [googleLoading, setGoogleLoading] =React.useState<boolean>(false)
const [githubLoading, setGithubLoading]=React.useState<boolean>(false)

    async function handleSubmit(type:string) {
        if (type=='google') {
            setGoogleLoading(true)
        }else{
         setGithubLoading(true)
        }
        const result = await signIn(type, { redirect: false });
        if (result?.error) {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
          setGithubLoading(false)
          setGoogleLoading(false)

        }}
    

    return (
        <div className={cn("grid gap-2")}>   
        <Button type="button" disabled={googleLoading || githubLoading} onClick={()=>handleSubmit('google')}>
            {googleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <IoLogoGoogle className="mr-2 h-5 w-5" />
            )}{" "}
            Google
        </Button>
        
            <Button type="button" disabled={googleLoading || githubLoading} onClick={()=>handleSubmit('github')}>
                {githubLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                )}{" "}
                GitHub
            </Button>
        </div>
    )
}