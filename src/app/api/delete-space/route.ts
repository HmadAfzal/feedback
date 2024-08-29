import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";
import UserModel from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { spaceId, ownerId } = await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: "Unauthorized - please log in" },
        { status: 401 } 
      );
    }

    if (!spaceId || !ownerId) {
      return Response.json(
        { success: false, message: "Bad Request - Missing required parameters" },
        { status: 400 }  
      );
    }


    const user = await UserModel.findOne({ _id: ownerId });
    if (!user) {
      return Response.json(
        { success: false, message: "Not Found - Invalid user ID" },
        { status: 404 }  
      );
    }

    const space = await SpaceModel.findOne({ _id: spaceId });
    if (!space) {
      return Response.json(
        { success: false, message: "Not Found - Space not found" },
        { status: 404 }  
      );
    }

    const deletionResult = await SpaceModel.deleteOne({ _id: spaceId });
    if (deletionResult.deletedCount > 0) {
      user.spaces.pull(spaceId);
      await user.save();
      return Response.json(
        { success: true, message: "Space deleted successfully" },
        { status: 200 } 
      );
    } else {
      return Response.json(
        { success: false, message: "Internal Server Error - Failed to delete space" },
        { status: 500 } 
      );
    }
  } catch (error) {
    console.log("Error in deleting space:", error);
    return Response.json(
      { success: false, message: "Internal Server Error - An error occurred" },
      { status: 500 } 
    );
  }
}
