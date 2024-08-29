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
  theme: z.enum(["light", "dark"], {message: "Please select a theme.",}),
  buttonText: z.string().min(1, { message: "Button text is required" }),
  thankyouPageTitle: z.string().min(1, { message: "Thank you page title is required" }),
  thankyouPageText: z.string().min(1, { message: "Thank you page text is required" }),
  public_id:z.string().optional()
});


export interface Space {
name:string,
image: string,
title: string,
description: string,
theme: 'light' | 'dark';
buttonText:string,
thankyouPageTitle: string,
thankyouPageText:string,
sticker:string,
_id:string,
createdAt:string,
public_id: string;
messages:Message[],
owner:string
}


export const EditSpaceSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Only characters from a-z, A-Z, and numbers from 0-9 are allowed' })
    .min(1, { message: "Name is required" }),
  image: z.string(),
  title: z.string().min(6, { message: "Title must be at least 6 characters long" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters long" }),
});
