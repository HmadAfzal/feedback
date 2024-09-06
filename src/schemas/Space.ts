import { z } from "zod";
import { Message } from "./Message";

export interface Space {
  name: string;
  image: string;
  title: string;
  description: string;
  theme: "light" | "dark";
  buttonText: string;
  thankyouPageTitle: string;
  thankyouPageText: string;
  sticker: string;
  _id: string;
  createdAt: string;
  public_id: string;
  messages: Message[];
  owner: string;
}

export const EditSpaceSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Only characters from a-z and numbers from 0-9 are allowed",
    })
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." }),
  image: z.string(),
  title: z
    .string()
    .min(1, { message: "Title is Required" })
    .max(120, { message: "Title must not be longer than 120 characters." }),
  description: z
    .string()
    .min(1, { message: "Description is Required" })
    .max(200, {
      message: "description must not be longer than 200 characters.",
    }),
});
