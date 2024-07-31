import { z } from "zod";

export interface Message {
    feedback: string;
    name: string;
    email?: string;
    image?: string;
  }
  

  export const MessageSchema = z.object({

    feedback: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    image: z.string().optional(),

});
