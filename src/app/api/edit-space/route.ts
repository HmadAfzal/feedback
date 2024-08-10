import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";
import UserModel from "@/models/userModel";

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const { name, image, title, description, isDarkTheme, buttonText, ConsentStatement, thankyouPageTitle, thankyouPageText, userId, publicId} = await request.json();

        if (!name || !title || !description || !thankyouPageTitle || !thankyouPageText || !buttonText || !ConsentStatement) {
            return Response.json(
                {
                    success: false,
                    message: 'Please fill all the required fields',
                },
                { status: 400 }
            );
        }
        if (!userId) {
            return Response.json(
                {
                    success: false,
                    message: 'User id is required',
                },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User not found',
                },
                { status: 400 }
            );
        }

        const existingSpace = await SpaceModel.findOne({ owner: userId });
        if (!existingSpace) {
            return Response.json(
                {
                    success: false,
                    message: 'Space not found',
                },
                { status: 403 }
            );
        }

        existingSpace.image = image || existingSpace.image;
        existingSpace.name = name;
        existingSpace.title = title;
        existingSpace.description = description;
        existingSpace.isDarkTheme = isDarkTheme;
        existingSpace.buttonText = buttonText;
        existingSpace.ConsentStatement = ConsentStatement;
        existingSpace.thankyouPageTitle = thankyouPageTitle;
        existingSpace.thankyouPageText = thankyouPageText;

        if (publicId) {
            existingSpace.public_id = publicId;
        }

        await existingSpace.save();

        return Response.json(
            {
                success: true,
                message: 'Space updated successfully',
                space: existingSpace,
            },
            { status: 200 }
        );

    } catch (error) {
        console.log('Error in editing space', error);
        return Response.json(
            {
                success: false,
                message: 'Error in editing space',
            },
            { status: 500 }
        );
    }
}









//sticker, delete route