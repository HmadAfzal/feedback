import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function DELETE(request: Request) {
  try {
    const { publicId } = await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    if (!publicId) {
      return Response.json(
        { success: false, message: "Bad Request - Public ID is required" },
        { status: 400 }
      );
    }

    const response = await cloudinary.uploader.destroy(publicId);

    if (response.result !== 'ok') {
      return Response.json(
        { success: false, message: "Internal Server Error - Failed to delete image" },
        { status: 500 } 
      );
    }

    return Response.json(
      { success: true, message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting image:", error);
    return Response.json(
      { success: false, message: "Internal Server Error - An error occurred" },
      { status: 500 }
    );
  }
}
