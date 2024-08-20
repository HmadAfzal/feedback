import { dbConnect } from "@/lib/dbConnect";
import MessageModel from "@/models/MessageModel";
import SpaceModel from "@/models/spaceModel";
import { Message } from "@/schemas/Message";
import { Space } from "@/schemas/Space";
import { notFound } from "next/navigation";

interface EmbedPageProps {
  params: {
    spacename: string;
  };
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  await dbConnect();

  const messages = await MessageModel.find({ space: params.spacename });
console.log(messages)
  if (!messages) {
   <div>No feedbacks avalible</div>
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{'Messages'}</h1>
      <div>
        {messages?.length > 0 ? (
          messages.map((message:Message) => (
            <div key={message._id} style={{ marginBottom: '10px' }}>
              <strong>{message.name}</strong>: {message.feedback}
            </div>
          ))
        ) : (
          <p>No feedbacks available</p>
        )}
      </div>
    </div>
  );
}
