import { dbConnect } from "@/lib/dbConnect";
import MessageModel from "@/models/MessageModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const { messageId } = await request.json();

        if (!messageId) {
            return Response.json(
                { success: false, message: "Bad Request - Message ID is required" },
                { status: 400 }
            );
        }

        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json(
                { success: false, message: "Unauthorized - Please log in" },
                { status: 401 }
            );
        }

        const message = await MessageModel.findById(messageId);
        if (!message) {
            return Response.json(
                { success: false, message: "Not Found - Message not found" },
                { status: 404 }
            );
        }

        message.isLiked = !message.isLiked;
        await message.save();

        const action = message.isLiked ? "liked" : "unliked";
        return Response.json(
            { success: true, message: `Message ${action} successfully` },
            { status: 200 }
        );

    } catch (error) {
        console.log("Error updating message:", error);
        return Response.json(
            { success: false, message: "Internal Server Error - An error occurred" },
            { status: 500 }
        );
    }
}
