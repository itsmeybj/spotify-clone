import express from "express"
import { createUser, deleteUser, deleteUserById, getAllArtist, getAllUsers, getUser, loginUser, updateUser } from "../controller/userCntr.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import {isAuth} from "../middleware/authMiddleware.js";

const userRouter = express.Router()

userRouter.post("/register",createUser)
userRouter.post("/login",loginUser)

userRouter.get("/get-all-users", isAdmin, getAllUsers)

//this bellow router will work for simple user and artist both
userRouter.get("/get-user",isAuth,getUser)
userRouter.delete("/delete-user",isAuth,deleteUser)
userRouter.delete("/delete-user-by-id",isAuth,deleteUserById)
userRouter.put("/update-user",isAuth,updateUser)
//get all artist
userRouter.get("/get-artist",isAuth,getAllArtist)
export default userRouter;