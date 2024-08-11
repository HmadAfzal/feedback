import { dbConnect } from "@/lib/dbConnect";
import MessageModel from "@/models/MessageModel";
import SpaceModel from "@/models/spaceModel";
import { Message } from "@/schemas/Message";

export async function DELETE(request:Request) {
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

   await MessageModel.findByIdAndDelete(messageId)
    return Response.json({
        success:true, message:"Message deleted sussessfully"
    },{status:200})  


    } catch (error) {
        console.log('error deleting message', error)
        return Response.json({
            success:false, message:"Error deleting message"
        },{status:404})  
    }
}