import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  feedback: string;
  name: string;
  email: string;
  image: string;
  isLiked: boolean;
  public_id: string;
  space: mongoose.Schema.Types.ObjectId;
}

export const MessageSchema: Schema<Message> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    feedback: {
      type: String,
      required: [true, "feedback is required"],
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    public_id: {
      type: String,
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
  },
  { timestamps: true }
);

const MessageModel =
  mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);
export default MessageModel;
