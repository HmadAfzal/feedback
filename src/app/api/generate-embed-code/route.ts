import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const spaceId = url.searchParams.get("spaceId");
    const type = url.searchParams.get("type");
    const bgColor = url.searchParams.get("bgColor");
    const cardBgColor = url.searchParams.get("cardBgColor");
    const textColor = url.searchParams.get("textColor");
    const hideDate = url.searchParams.get("hideDate");
    const sameHeight = url.searchParams.get("sameHeight");
    const enableShadow = url.searchParams.get("enableShadow");

    if (!spaceId) {
      return Response.json(
        {
          success: false,
          message: "Bad Request - Missing required query parameters",
        },
        { status: 400 }
      );
    }

    const space = await SpaceModel.findById(spaceId);
    if (!space) {
      return Response.json(
        { success: false, message: "Not Found - Space not found" },
        { status: 404 }
      );
    }

    const baseUrl = `${url.protocol}//${url.hostname}${
      url.port ? `:${url.port}` : ""
    }`;
    const iframeSrc = `${baseUrl}/embed/${spaceId}?type=${type}&bgColor=${bgColor}
    &cardBgColor=${cardBgColor}&textColor=${textColor}&hideDate=${hideDate}&sameHeight=${sameHeight}&enableShadow=${enableShadow}`;
    const embedCode = `
<iframe id="embed-${spaceId}"
src="${iframeSrc}" frameborder="0" scrolling="no"
width="100%"></iframe>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js"></script>
<script type="text/javascript">iFrameResize({ log: false, checkOrigin: false },'#embed-${spaceId}');</script>
    `;

    return Response.json({ success: true, embedCode }, { status: 200 });
  } catch (error) {
    console.error("Error generating embed code:", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error - Error generating embed code",
      },
      { status: 500 }
    );
  }
}
