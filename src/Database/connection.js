import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`Database has been Connected Successfully`);
  } catch (error) {
    console.log(`fail to Connect`);
  }
};
