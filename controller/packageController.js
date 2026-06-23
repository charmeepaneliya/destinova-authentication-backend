import express from "express";
import fs from "fs";
import cloudinary from "cloudinary";

import Package from "../module/Package.js";
import HttpError from "../middleware/HttpError.js";
import packageRouters from "../routers/packageRouters.js";

const add = async (req, res, next) => {
  try {
    const {
      packageName,
      startDate,
      endDate,
      duration,
      packagePrice,
      packageType,
    } = req.body;
    const packageImage = req.file.path;
    if (
      !packageName ||
      !startDate ||
      !endDate ||
      !duration ||
      !packagePrice ||
      !packageType ||
      !packageImage
    ) {
      return next(new HttpError("all fields are required"));
    }

    const newPackage = new Package({
      packageName,
      startDate,
      endDate,
      duration,
      packagePrice,
      packageType,
      packageImage: req.file.path,
      Cloudinary_id: req.file.filename,
    });

    await newPackage.save();

    res.status(201).json({
      success: true,
      message: "new package added successfully!",
      newPackage,
    });
  } catch (error) {
    console.log("ERROR:", error);
    console.log("MESSAGE:", error.message);
    return next(new HttpError(error.message, 500));
  }
};

const getAllPackage = async (req, res, next) => {
  try {
    const packages = await Package.find({});

    if (packages.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no packages found", data: null });
    }
    res.status(200).json({
      success: true,
      message: "all packages data fatch successfully",
      data: packages,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const packages = await Package.findById( id );

    if (!packages) {
      return next(new HttpError("no package data found", 404));
    }
    res.status(200).json({
      success: true,
      message: "package data found",
      packages,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deletePackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const packageDelete = await Package.findById(id);

    if (!packageDelete) {
      return next(new HttpError("no pakage data found", 404));
    }

    await cloudinary.uploader.destroy(packageDelete.Cloudinary_id);

    await Package.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "package deleted successfully!",
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updatePackage = async(req,res,next)=>{
  try {
    const {id} = req.params;

  const packages = await Package.findById(id);
  if(!packages){
    return next(new HttpError("[package not fount",404));
  }

  const updates = Object.keys(req.body);

  const allowedFields = [
     "packageName",
      "price",
      "startDate",
      "endDate",
      "duration",
      "destination",
      "packageType",
  ];

  const isValidUpdates = updates.every((field)=>
    allowedFields.includes(field),
  );

  if(!isValidUpdates){
    return next(new HttpError("only allowed field can be updated",500));


  }

  updates.forEach((update)=>{
    packages[update] = req.body[update];
  });

  if (req.file) {
      await cloudinary.uploader.destroy(packages.cloudinary_id);

      packages.packageImage = req.file.path;
      packages.cloudinary_id = req.file.filename;
    }

    await packages.save();

    res.status(200).json({
      success: true,
      message: "package data updated successfully!",
      data: updatePackage,
    });

  } catch (error) {
    return next(new HttpError(error.message,500));
  }
  
}

export default { add, getAllPackage, deletePackage,getById, updatePackage };
