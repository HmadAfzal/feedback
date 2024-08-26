
import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserAuthForm } from "../components/user-auth-form"
import { buttonVariants } from "@/components/ui/button"

export default function page() {
  return (
    <>
      <div className="container relative h-screen flex items-center justify-center">
        
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8")}>
         Signup
        </Link>
      
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
              Sign in to pick up where you left off.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By logging in, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
  
    </>
  )
}