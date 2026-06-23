import mongoose from "mongoose";

const packageShecma = new mongoose.Schema(
  {
    packageName: {
      type: String,
      trim: true,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    packageImage: {
      type: String,
      required: true,
    },
    Cloudinary_id:{
        type:String,
        
    },
    packagePrice: {
      type: Number,
      default: 0,
    },
    packageType: {
      type: String,
      required: true,
      trim: true,
    },
    
  },
  {
    timestamps: true,
  },
);

const Package = mongoose.model("packages", packageShecma);

export default Package;
