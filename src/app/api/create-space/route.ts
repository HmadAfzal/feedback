import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";
import UserModel from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { name, image, public_id, title, description, theme, buttonText, thankyouPageTitle, thankyouPageText, userId } = await request.json();

    if (!name || !title || !description || !thankyouPageTitle || !thankyouPageText || !buttonText) {
      return Response.json(
        {
          success: false,
          message: "Bad Request - Please fill all the required fields",
        },
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
        {
          success: false,
          message: "Bad Request - User ID is required",
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Not Found - User not found",
        },
        { status: 404 }
      );
    }

    const spaceAlreadyExists = await SpaceModel.findOne({ name });
    if (spaceAlreadyExists) {
      return Response.json(
        {
          success: false,
          message: "Conflict - Space name is already taken",
        },
        { status: 409 }
      );
    }

    const newSpace = await SpaceModel.create({
      name,
      image: image || user.profilepic,
      public_id,
      title,
      description,
      theme: theme || "light",
      buttonText,
      thankyouPageText,
      thankyouPageTitle,
      owner: user._id,
    });

    user.spaces.push(newSpace._id);
    await user.save();

    return Response.json(
      {
        success: true,
        space: newSpace,
        message: "Space created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating space:", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error - An error occurred",
      },
      { status: 500 }
    );
  }
}
