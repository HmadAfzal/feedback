import { dbConnect } from "@/lib/dbConnect";
import MessageModel from "@/models/MessageModel";
import SpaceModel from "@/models/spaceModel";
import { validateEmail } from "@/utils/validemail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { name, email, feedback, spaceId, image, publicId } = await request.json();

        if (!name || !email || !feedback) {
            return Response.json(
                { success: false, message: 'Bad Request - Please enter all required fields' },
                { status: 400 }
            );
        }

        if (feedback.length < 25) {
            return Response.json(
                { success: false, message: 'Bad Request - Feedback must be at least 25 characters long' },
                { status: 400 }
            );
        }
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            return Response.json(
                { success: false, message: 'Bad Request - Invalid email address' },
                { status: 400 }
            );
        }

        const space = await SpaceModel.findById(spaceId);
        if (!space) {
            return Response.json(
                { success: false, message: 'Not Found - Space not found' },
                { status: 404 }
            );
        }

        const message = new MessageModel({
            feedback,
            name,
            email,
            image,
            space: space._id,
            public_id: publicId || ''
        });

        await message.save();

        space.messages.push(message._id);
        await space.save();

        return Response.json(
            { success: true, message: 'Message sent successfully', newMessage: message },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error sending message:', error);
        return Response.json(
            { success: false, message: 'Internal Server Error - An error occurred' },
            { status: 500 } 
        );
    }
}
