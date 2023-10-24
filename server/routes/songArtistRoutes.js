import express from "express"
import {isArtist} from "../middleware/artistMiddleware.js"
import { createSong, deleteSong, showAllSongs, showSong, updateSong,showSongByName } from "../controller/songArtistCntr.js";

const songArtistRouter = express.Router()

songArtistRouter.post("/create-song", isArtist, createSong)
songArtistRouter.get("/show-all-songs",isArtist,showAllSongs)
songArtistRouter.get("/show-song/:songId",isArtist,showSong)
songArtistRouter.get("/show-song-name/:songName",isArtist,showSongByName)
songArtistRouter.put("/update-song/:songId",isArtist,updateSong)
songArtistRouter.delete("/delete-song",isArtist,deleteSong)

export default songArtistRouter;