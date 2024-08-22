import EmbedCarousel from "@/components/EmbedCarousel";
import { dbConnect } from "@/lib/dbConnect";
import MessageModel from "@/models/MessageModel";

interface EmbedPageProps {
  params: {
    layout: string;
    spaceId: string;
  };
}

export interface PlainMessage {
  _id: string;
  name: string;
  image: string;
  feedback: string;
  createdAt: string;
  isLiked?: boolean;
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  await dbConnect();

  const messages = await MessageModel.find({ space: params.spaceId }).lean();

  const plainMessages: PlainMessage[] = messages.map((message: any) => ({
    _id: message._id.toString(),
    name: message.name,
    image: message.image,
    feedback: message.feedback,
    createdAt: message.createdAt.toISOString(),
    isLiked: message.isLiked,
  }));

  if (!plainMessages || plainMessages.length === 0) {
    return <div>No feedbacks available</div>;
  }

  return <EmbedCarousel messages={plainMessages} />;
}
