import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  if (!filepath) return null;

  try {
    const result = await cloudinary.uploader.upload(filepath);
    console.log(result);

    // Try to delete file asynchronously; ignore error if file doesn't exist
    await fs.unlink(filepath).catch(() => {});

    return result.secure_url;
  } catch (error) {
    // Attempt to delete file even if upload fails, ignore errors
    await fs.unlink(filepath).catch(() => {});

    console.error(error);
    throw error;  // re-throw so caller knows upload failed
  }
};

export default uploadOnCloudinary;
