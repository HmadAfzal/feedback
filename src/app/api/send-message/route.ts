import { dbConnect } from "@/lib/dbConnect";
import MessageModel from "@/models/MessageModel";
import SpaceModel from "@/models/spaceModel";
import { validateEmail } from "@/utils/validemail";

export async function POST(request:Request) {
    await dbConnect();
    try {
        const {name, email, feedback, spaceId, image, publicId}= await request.json();
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

const message=await MessageModel.create({
    feedback,
    name,
    email,
    image: image,
    space: space._id,
    public_id:publicId || ''
   })

   const newMessage=await message.save()

   space.messages.push(newMessage._id);

   await space.save();
   return Response.json({ success: true, newMessage, message: 'Message sent successfully'},{ status: 200 });
   
    } catch (error) {
        console.log(error)
        return Response.json({success:false, message:"Error sending message"},{status:500})

    }
}