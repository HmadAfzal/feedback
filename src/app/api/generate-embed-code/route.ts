import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const url = new URL(request.url);
        const spaceId = url.searchParams.get('spaceId');

        if (!spaceId) {
            return new Response(
                JSON.stringify({ success: false, message: "Space ID is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const space = await SpaceModel.findById(spaceId);

        if (!space) {
            return new Response(
                JSON.stringify({ success: false, message: "Space not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const iframeSrc = `http://localhost:3000/embed/${spaceId}`;
        const embedCode = `
    <script type="text/javascript" src="http://localhost:3000/js/iframeResizer.min.js"></script>
    <iframe id="embed-${spaceId}" src="${iframeSrc}" frameborder="0" scrolling="no" width="100%"></iframe>
    <script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, '#embed-${spaceId}');</script>
    `;
        return new Response(
            JSON.stringify({ success: true, embedCode }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error('Error in generating embed code: ', error);
        return new Response(
            JSON.stringify({ success: false, message: "Error in generating embed code" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
