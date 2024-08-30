import { z } from "zod";

export interface Message {
    feedback: string;
    name: string;
    email: string;
    image?: string;
    _id:string;
    createdAt:string;
    isLiked:boolean;
    public_id:string;
    space:string;
  }
  

  export const MessageSchema = z.object({

    feedback: z.string().min(10,{message:'Please lengthen the text to 25 chrachters or more'}),
    name: z.string().min(1,{message:'Name is required'}),
    email: z.string().email(),
    image: z.string().optional(),

});
