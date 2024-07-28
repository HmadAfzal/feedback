import mongoose, { Schema, Document } from "mongoose";



export interface User extends Document {
  username: string;
  email: string;
  profilepic: string;
  providerAccountId: string;
  spaces: mongoose.Schema.Types.ObjectId[];
}



const userSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  profilepic: {
    type: String,
  },
  providerAccountId: {
    type: String,
    unique:true
  },
  spaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space',
    },
  ],
}, { timestamps: true });



const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);
export default UserModel;
