import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//import Joi from 'joi';
//import passwordComplexity from "joi-password-complexity";

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  month: {
    type: String,
  },
  date: {
    type: String,
  },
  year: {
    type: String,
  },
  likedSongs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "song",
    },
  ],
  likedPlaylists: [
    {
      type: mongoose.Types.ObjectId,
      ref: "playlist",
    },
  ],
  subscribedArtists: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isArtist: {
    type: Boolean,
    default: false,
  },
});

// userScheme.pre("save", async function (next) {
//   const salt = bcrypt.genSalt(10);
//   this.password = bcrypt.hash(this.password, salt);
//   next();
// });

// userScheme.methods.isPAsswordMatched = async function (enteredPassword) {
//   return bcrypt.compareSync(enteredPassword, this.password);
// };

userScheme.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "thisismysecreatekey", {
    expiresIn: "7d",
  });
  return token;
};

// const validate = (user) =>{
//     const schema = Joi.object({
//         name:Joi.string().min(3).max(10).required(),
//         email:Joi.string().email().required(),
//         password:passwordComplexity().required(),
//         month:Joi.string().required(),
//         date:Joi.string().required(),
//         year:Joi.string().required(),
//         gender:Joi.string().valid("male","female","non-binary").required(),
//     });
//     return schema.validate(user)
// }

const User = mongoose.model("User", userScheme);

export default User;

//export {validate}
