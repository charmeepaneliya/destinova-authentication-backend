import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

console.log("Cloudinary Config:", cloudinary.config());

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "destiNovaImg",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      {
        height: 500,
        width: 500,
        crop: "limit",
      },
      {
        fetch_format: "webp",
      },
      {
        quality: "auto",
      },
    ],
  },
});

const upload = multer({ 
  storage, 
  limits: 5 * 1024 * 1024,
 });
export default upload;
