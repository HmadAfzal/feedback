import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

export const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Successfully connected to Database");
  } catch (error) {
    console.log("Error connecting to Database", error);
    process.exit(1);
  }
};
