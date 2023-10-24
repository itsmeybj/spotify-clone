import mongoose from "mongoose";
//import Joi from 'joi';
//import passwordComplexity from "joi-password-complexity";

const songScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail : {
        type:String,
        required:true,
    },
    song:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
})

// const validate = (song) =>{
//     const schema = Joi.object({
//         name:Joi.string().min(3).max(10).required(),
//         thumbnail:Joi.string().required(),
//         track:Joi.string().required(),
//         
//     });
//     return schema.validate(song)
// }

const Song = mongoose.model("Song",songScheme);

export default Song;

//export {validate}