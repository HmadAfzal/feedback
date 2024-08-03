import { z } from "zod";
import { Message } from "./Message";

export const SpaceSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Only characters from a-z, A-Z, and numbers from 0-9 are allowed' })
    .min(1, { message: "Name is required" }),
  image: z.string(),
  title: z.string().min(6, { message: "Title must be at least 6 characters long" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters long" }),
  isDarkTheme: z.boolean(),
  buttonText: z.string().min(1, { message: "Button text is required" }),
  ConsentStatement: z.string().min(1, { message: "Consent statement is required" }),
  thankyouPageTitle: z.string().min(1, { message: "Thank you page title is required" }),
  thankyouPageText: z.string().min(1, { message: "Thank you page text is required" }),
});


export interface Space {
name:string,
image: string,
title: string,
description: string,
isDarkTheme: string,
buttonText:string,
ConsentStatement: string,
thankyouPageTitle: string,
thankyouPageText:string,
sticker:string,
_id:string,
createdAt:string,
Messages:Message[],
owner:string
}