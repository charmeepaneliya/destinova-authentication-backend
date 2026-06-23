import express from "express";
import packageController from "../controller/packageController.js";
import uploads from "../middleware/uploads.js";

const router = express.Router();

router.post("/add", uploads.single("packageImage"), packageController.add);

router.get("/getAllPackage", packageController.getAllPackage);

router.get("/:id", packageController.getById);

router.delete("/:id", packageController.deletePackage);

router.patch(
  "/:id",
  uploads.single("packageImage"),
  packageController.updatePackage,
);

export default router;
