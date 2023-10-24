import express from "express"
import { isAuth } from "../middleware/authMiddleware.js"
import { addToPlaylist, createPlaylist, likePlaylist, removePlaylist, removeSongFromPlaylist, showAllPlaylist, showPlaylistById, updatePlaylist } from "../controller/playlistCntr.js"

const playlistRouter = express.Router()

//create a playlist
playlistRouter.post("/create",isAuth, createPlaylist)

//edit playlist
playlistRouter.put("/update/:playlistId",isAuth, updatePlaylist)

//delete playlist
playlistRouter.delete("/delete",isAuth, removePlaylist)

//add song to playlist
playlistRouter.put("/add-to-playlist",isAuth,addToPlaylist)

//remove song from playlist
playlistRouter.delete("/remove-song-from-playlist",isAuth,removeSongFromPlaylist)

//like or dislike playlist 
playlistRouter.put("/like-unlike-playlist",isAuth,likePlaylist)

//show all playlist
playlistRouter.get("/show-all",isAuth,showAllPlaylist)

//show playlist by playlist id
playlistRouter.get("/show-by-id/:playlistId",isAuth,showPlaylistById)

export default playlistRouter;