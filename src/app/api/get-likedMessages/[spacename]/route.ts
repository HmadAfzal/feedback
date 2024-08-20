import { dbConnect } from "@/lib/dbConnect";
import MessageModel from "@/models/MessageModel";
import SpaceModel from "@/models/spaceModel";

export async function GET(request: Request, { params }: { params: { spacename: string } }) {
    await dbConnect();

    const { spacename } = params;

    try {
        const space = await SpaceModel.findOne({ name: spacename })
        if (!space) {
            return Response.json({success:false, message:"Space not found"},{status:404})
        }
        const messages = await MessageModel.find({ space: space._id, isLiked: true });
        return Response.json({messages})

    } catch (error) {
        console.log('Error fetching messages:', error);
        return Response.json({success:false, message:"Error fetching messages"},{status:404})
    }
}
