import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
//import "./config/db.js"

import userRouter from "./routes/userRoutes.js";
import songArtistRouter from "./routes/songArtistRoutes.js";
import songUserRouter from "./routes/songUserRoutes.js";
import playlistRouter from "./routes/playlistRoutes.js";
import searchRouter from "./routes/searchRoutes.js";

const app = express();

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("connected!!!");
  })
  .catch((err) => {
    console.log(`error while connection.. ${err}`);
  });

const PORT = process.env.PORT || 5000;

//app.use(express.json())
//app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use("/user", userRouter);

app.use("/artist/song", songArtistRouter);

app.use("/user/song", songUserRouter);

app.use("/user/playlist", playlistRouter);

app.use("/search", searchRouter);

app.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`);
});
