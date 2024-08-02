import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import SpaceModel from "@/models/spaceModel";

export async function GET(request:Request) {
    await dbConnect();
    try {
        const session=await getServerSession(authOptions);
    if(!session){
        return Response.json({success:false, message:"unauthorzed - please login again"},{status:400})
    }
const user=await UserModel.findOne({_id:session.user._id})
if(!user){
    return Response.json({success:false, message:"unauthorzed - user not found"},{status:404})  
    }

    const spaces=await SpaceModel.find({owner:user._id})
console.log(spaces)
return Response.json({success:true, spaces},{status:200})


} catch (error) {
        console.log(error)
        return Response.json({success:false, message:"Error fetching user"},{status:500})

    }
}


