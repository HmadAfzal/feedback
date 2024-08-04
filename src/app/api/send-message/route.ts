import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";
import { Message } from "@/schemas/Message";
import { validateEmail } from "@/utils/validemail";

export async function POST(request:Request) {
    await dbConnect();
    try {
        const {name, email, feedback, spaceId, image}= await request.json();
if(!name || !email || !feedback){
    return Response.json({success:false, message:'Please Enter all the fields'},{status:400})
}
if(feedback.length<=24){
    return Response.json({success:false, message:'Please lengthen the text to 25 chrachters or more'},{status:400})
}
 const validemail=validateEmail(email)
 if(!validemail){
    return Response.json({success:false, message:'Email is not valid'},{status:400})
}

const space=await SpaceModel.findOne({_id:spaceId})
if(!space){
        return Response.json({success:false, message:'Space not found'},{status:400})
}

const newMessage={
    feedback,
    name,
    email,
    image: image
   }

   space.messages.push(newMessage as Message);
   await space.save();
   return Response.json({success:true, message:"Message sent successfully"},{status:200}) 

    } catch (error) {
        console.log(error)
        return Response.json({success:false, message:"Error sending message"},{status:500})

    }
}