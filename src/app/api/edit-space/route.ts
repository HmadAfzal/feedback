import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";
import UserModel from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function PUT(request: Request) {
  await dbConnect();
  try {
    const { name, image, title, description, userId, publicId, spaceId } = await request.json();

    if (!name || !title || !description) {
      return Response.json(
        { success: false, message: "Bad Request - Please fill all the required fields" },
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

    if (!userId) {
      return Response.json(
        { success: false, message: "Bad Request - User ID is required" },
        { status: 400 } 
      );
    }

    if (!spaceId) {
      return Response.json(
        { success: false, message: "Bad Request - Space ID is required" },
        { status: 400 } 
      );
    }

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return Response.json(
        { success: false, message: "Not Found - User not found" },
        { status: 404 } 
      );
    }

    const existingSpace = await SpaceModel.findOne({ name, _id: { $ne: spaceId } });
    if (existingSpace) {
      return Response.json(
        { success: false, message: "Conflict - Space with this name already exists" },
        { status: 409 } 
      );
    }

    const space = await SpaceModel.findOne({ _id: spaceId });
    if (!space) {
      return Response.json(
        { success: false, message: "Not Found - Space not found" },
        { status: 404 }
      );
    }


    space.image = image || space.image;
    space.name = name;
    space.title = title;
    space.description = description;
    space.public_id = publicId || space.public_id;

    await space.save();

    return Response.json(
      {
        success: true,
        message: "Space updated successfully",
        space,
      },
      { status: 200 } 
    );

  } catch (error) {
    console.log("Error in editing space:", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error - An error occurred",
      },
      { status: 500 } 
    );
  }
}
