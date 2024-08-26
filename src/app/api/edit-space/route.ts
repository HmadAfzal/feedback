import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";
import UserModel from "@/models/userModel";

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const { name, image, title, description,  userId, publicId, spaceId} = await request.json();
        if (!name || !title || !description) {
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

        if (!spaceId) {
            return Response.json(
                {
                    success: false,
                    message: 'space id is required',
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
        const existingspace = await SpaceModel.findOne({ name: name });

        if (existingspace) {
            return Response.json(
                {
                    success: false,
                    message: 'Space with this name already exists',
                },
                { status: 400 }
            );
        }


                const space = await SpaceModel.findOne({ _id: spaceId });
        if (!space) {
            return Response.json(
                {
                    success: false,
                    message: 'Space not found',
                },
                { status: 403 }
            );
        }
        space.image = image || space.image;
        space.name = name;
        space.title = title;
        space.description = description;
        space.public_id = publicId || space.public_id


        await space.save();

        return Response.json(
            {
                success: true,
                message: 'Space updated successfully',
                space: space,
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


