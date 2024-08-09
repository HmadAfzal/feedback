import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function DELETE(request: Request) {
    try {
        const { publicId } = await request.json();
console.log(publicId)
        if (!publicId) {
            return Response.json(
                { success: false, message: 'Public ID is required' },
                { status: 400 }
            );
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== 'ok') {
            throw new Error('Failed to delete image');
        }

        return Response.json(
            { success: true, message: 'Image deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting image:', error);
        return Response.json(
            { success: false, message: 'Error deleting image' },
            { status: 500 }
        );
    }
}
