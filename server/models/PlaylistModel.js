import mongoose from "mongoose";
//import Joi from 'joi';
//import passwordComplexity from "joi-password-complexity";

const playlistScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
});

// const validate = (song) =>{
//     const schema = Joi.object({
//         name:Joi.string().min(3).max(10).required(),
//         thumbnail:Joi.string().required(),
//         track:Joi.string().required(),
//
//     });
//     return schema.validate(song)
// }

const Playlist = mongoose.model("Playlist", playlistScheme);

export default Playlist;

//export {validate}
