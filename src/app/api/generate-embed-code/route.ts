import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const spaceId = url.searchParams.get('spaceId');
    const layout = url.searchParams.get('layout');
    const type = url.searchParams.get('type');
    const bgColor = url.searchParams.get('bgColor');
    const cardBgColor = url.searchParams.get('cardBgColor');
    const textColor = url.searchParams.get('textColor');

    if (!spaceId) {
      return new Response(JSON.stringify({ error: 'Missing required query parameters' }), { status: 400 });
    }

    const space = await SpaceModel.findById(spaceId);
    if (!space) {
      return new Response(
        JSON.stringify({ success: false, message: "Space not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const iframeSrc = `http://localhost:3000/embed/${spaceId}?type=${type}&bgColor=${bgColor}&cardBgColor=${cardBgColor}&textColor=${textColor}`;
    const embedCode = `<iframe id="embed-${spaceId}" src="${iframeSrc}" frameborder="0" scrolling="no" width="100%" style="background: transparent;"></iframe>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js"></script>
<script type="text/javascript">iFrameResize({ log: false, checkOrigin: false }, '#embed-${spaceId}')</script>`;

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
