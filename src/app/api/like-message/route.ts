import { dbConnect } from "@/lib/dbConnect";
import MessageModel from "@/models/MessageModel";
import SpaceModel from "@/models/spaceModel";
import { Message } from "@/schemas/Message";

export async function PUT(request:Request) {
    await dbConnect();
    try {
        const {messageId}=await request.json();
        if(!messageId){
            return Response.json({
                success:false, message:"Message id is required"
            },{status:404})
        }

    const message=await MessageModel.findById(messageId)
    if(!message){
        return Response.json({
            success:false, message:"Message not found"
        },{status:404})  
    }

    if(message.isLiked==false){
        message.isLiked=true
        await message.save();
        return Response.json({
            success:true, message:"Message liked"
        },{status:200}) 
    }else{
        message.isLiked=false
        await message.save();
        return Response.json({
            success:true, message:"Message unliked"
        },{status:200}) 
    }


    } catch (error) {
        console.log('error updating message', error)
        return Response.json({
            success:false, message:"Error updating message"
        },{status:404})  
    }
}