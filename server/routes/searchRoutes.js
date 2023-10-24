import express from "express"
import { isAuth } from "../middleware/authMiddleware.js"
import { searchSongsAndPlaylist } from "../controller/searchCntr.js";

const searchRouter = express.Router()

searchRouter.get("/",isAuth, searchSongsAndPlaylist)

export default searchRouter;