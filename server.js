import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import HttpError from "./middleware/HttpError.js";
import packageRouters from "./routers/packageRouters.js";



dotenv.config();

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

app.use("/package", packageRouters);

app.get("/", (req, res) => {
  res.json("hello form server");
});


app.use((req, res, next) => {
  return next(new HttpError("request route not found ", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});


const port = 5000;
async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("failed to connect db");
    }
    app.listen(port, (err) => {
      if (err) {
        console.log(err.message);
      }
      console.log(`server running on port ${port}`);
    });


    
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
startServer();
