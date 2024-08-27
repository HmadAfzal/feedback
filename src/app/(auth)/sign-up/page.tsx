
import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserAuthForm } from "../components/user-auth-form"
import { buttonVariants } from "@/components/ui/button"

export default function page() {
  return (
    <>
      <div className="container relative h-screen flex items-center justify-center">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
      
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-3 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
              Sign up with Google or GitHub to get started.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By signing up, you agree to our{" "}
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