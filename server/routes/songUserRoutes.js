import express from "express"
import { likeSong, showAllUserSongs, showLikeSongs, showSongByArtist, showSongByName } from "../controller/songUserCntr.js"
import { isAuth } from "../middleware/authMiddleware.js"

const songUserRouter = express.Router()

songUserRouter.get("/show-all-user-songs",isAuth, showAllUserSongs)
songUserRouter.get("/show-song-name/:songName",isAuth,showSongByName)
songUserRouter.get("/show-song-artist/:songArtistId",isAuth,showSongByArtist)

songUserRouter.put("/like-song/:songId",isAuth,likeSong)
songUserRouter.get("/show-like-songs",isAuth,showLikeSongs)

export default songUserRouter;