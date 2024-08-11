import mongoose, { Document, Schema } from 'mongoose';
import UserModel from './userModel';
import { Message } from './MessageModel';
import { MessageSchema } from '@/schemas/Message';



export interface Space extends Document {
  name: string;
  image: string;
  title: string;
  description: string;
  isDarkTheme: boolean;
  buttonText: string;
  ConsentStatement: string;
  thankyouPageTitle: string;
  thankyouPageText: string;
  public_id: string;
  messages: mongoose.Schema.Types.ObjectId[];
  owner: mongoose.Schema.Types.ObjectId;
}




const SpaceSchema: Schema<Space> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  image: {
    type: String,
    required: [true, 'image is required'],
  },
  title: {
    type: String,
    required: [true, 'headline is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  isDarkTheme: {
    type: Boolean,
    default: true,
  },
  buttonText: {
    type: String,
    required: true,
    default: 'Send in feedback',
  },
  ConsentStatement:{
    type: String,
    required: true,
    default: 'I give permission to use this feedback',
  },
  thankyouPageTitle: {
    type: String,
    required: true,
    default: 'Thank you',
  },
  thankyouPageText: {
    type: String,
    required: true,
    default: 'Your feedback means a lot to us',
  },
  public_id: { type: String },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const SpaceModel = mongoose.models.Space || mongoose.model<Space>('Space', SpaceSchema);
export default SpaceModel;
