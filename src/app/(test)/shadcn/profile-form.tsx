"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// const profileFormSchema = z.object({
//   username: z
//     .string()
//     .min(2, {
//       message: "Username must be at least 2 characters.",
//     })
//     .max(30, {
//       message: "Username must not be longer than 30 characters.",
//     }),
//   email: z
//     .string({
//       required_error: "Please select an email to display.",
//     })
//     .email(),
//   bio: z.string().max(160).min(4),
//   urls: z
//     .array(
//       z.object({
//         value: z.string().url({ message: "Please enter a valid URL." }),
//       })
//     )
//     .optional(),
// })

// type ProfileFormValues = z.infer<typeof profileFormSchema>

// const defaultValues: Partial<ProfileFormValues> = {
//   bio: "I own a computer.",
//   urls: [
//     { value: "https://shadcn.com" },
//     { value: "http://twitter.com/shadcn" },
//   ],
// }

export function ProfileForm() {
  const form = useForm<any>({
    // resolver: zodResolver(profileFormSchema),
    // defaultValues,
    // mode: "onChange",
  })


  function onSubmit(data:any) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="feedback" {...field} />
              </FormControl>
              <FormDescription>
              This is your public space name. It can be your real name or a pseudonym, using only letters (a-z) and numbers (0-9). You can update it once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Would you like to give us a shoutout?" {...field} />
              </FormControl>
              <FormDescription>
                This is your public space name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
               <FormField
          control={form.control}
          name="buttontext"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button text</FormLabel>
              <FormControl>
                <Input placeholder="Send in feedback" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create space</Button>
      </form>
    </Form>
  )
}