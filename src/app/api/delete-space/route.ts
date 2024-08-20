import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";
import UserModel from "@/models/userModel";

export async function DELETE(request:Request) {
    await dbConnect();
    try {
        const {spaceId, owner}=await request.json();
  
 if(!spaceId || !owner){
    return Response.json({
        success:false, message:"Some error occured"
    },{status:500})
 }

 const user=await UserModel.findOne({_id:owner})
 if(!user){
    return Response.json({
        success:false, message:"User not found"
    },{status:404})
 }

const space=await SpaceModel.findOne({_id:spaceId})
if(!space){
    return Response.json({
        success:false, message:"space not found"
    },{status:404})
}

const deletionSuccess=await SpaceModel.deleteOne({_id:spaceId})
if(deletionSuccess){
    user.spaces.pull(spaceId)
    await user.save();
    return Response.json({
        success:true, message:"Space deleted successfully"
    },{status:200})
} else{
    return Response.json({
        success:false, message:"Some error occured"
    },{status:500})
}

    } catch (error) {
        console.log('error in deleting space: ', error)
        return Response.json({
            success:false, message:"Error in deleting space"
        },{status:500})
    }
} 