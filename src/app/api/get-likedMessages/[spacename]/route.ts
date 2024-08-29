import { dbConnect } from "@/lib/dbConnect";
import MessageModel from "@/models/MessageModel";
import SpaceModel from "@/models/spaceModel";

export async function GET(request: Request, { params }: { params: { spacename: string } }) {
    await dbConnect();

    const { spacename } = params;

    try {
        if (!spacename) {
            return Response.json(
                { success: false, message: "Bad Request - Missing required query parameters" },
                { status: 400 }
            );
        }

        const space = await SpaceModel.findOne({ name: spacename });
        if (!space) {
            return Response.json(
                { success: false, message: "Not Found - Space not found" },
                { status: 404 }
            );
        }

        const messages = await MessageModel.find({ space: space._id, isLiked: true });
        return Response.json(
            { success: true, messages },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching messages:', error);
        return Response.json(
            { success: false, message: "Internal Server Error - Error fetching messages" },
            { status: 500 }
        );
    }
}
