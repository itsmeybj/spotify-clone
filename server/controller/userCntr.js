import Cookies from "js-cookie";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  //console.log(req.body)

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ status: false, message: "Please do not empty fileds" });
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      // const user = new User({
      //     name,
      //     email,
      //     password: hashedPassword,
      //     isArtist:isArtist?true:false,
      //     isAdmin:isAdmin?true:false,
      //   });
      
      //let data = req.body;
      req.body.password = hashedPassword;

      const save_user = await User(req.body).save();

      save_user.password = undefined;
      save_user.__v = undefined;
      return res.status(200).json({ status: true, data: save_user });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while creating account ${err.message}`,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  if (!email || !password)
    return res
      .status(400)
      .json({ status: false, message: "Please do not empty fields" });

  try {
    let token;
    const findUser = await User.findOne({ email });
    console.log("token",findUser)
    console.log("find-user-pass-",findUser.password)
    console.log("pass-",password)

    const isPassValidated = await bcrypt.compare(password, findUser.password);
    // if(!isPassValidated) return response.status(403).send('wrong password');

    console.log("xxx-",isPassValidated)

    if (findUser && isPassValidated) {
      token = findUser.generateAuthToken();
      console.log("findusr-admin-",findUser.isAdmin)
      console.log("finduser-artist",findUser.isArtist)

      if (findUser.isAdmin) {
        console.log("findUser.isAdmin-",findUser.isAdmin)
        res.cookie("owner", "admin", {
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 30 * 1000,
        });
      } else if (findUser.isArtist) {
        console.log("findUser.isArtist",findUser.isArtist)
        res.cookie("owner", "artist", {
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 30 * 1000,
        });
      } else {
        console.log("findUser.isUser",findUser)
        res.cookie("owner", "user", {
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 30 * 1000,
        });
      }

      res.cookie("jwtSpotifyToken", token, {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });

      let userObj = {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        token: token,
      };
      console.log("userObj-",userObj)

      return res.status(200).json({ status: true, data: userObj });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "email or password does not matched" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, message: `Error while login : it looks like you do not have account or ${err.message}` });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    if (!users) {
      return res
        .status(500)
        .json({ status: false, message: "dont have users" });
    } else {
      return res.status(200).json({ status: true, data: users });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `error while fetching users ${err.message}`,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    if (!user) {
      return res
        .status(500)
        .json({ status: false, message: "don`t have a user" });
    } else {
      return res.status(200).json({ status: true, data: user });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `error while fetching user ${err.message}`,
    });
  }
};

export const getAllArtist = async (req, res) => {
  try {
    const user = await User.find({ isArtist: true }).select("-password -__v");
    if (!user) {
      return res
        .status(500)
        .json({ status: false, message: "don`t have a artist" });
    } else {
      return res.status(200).json({ status: true, data: user });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `error while fetching user ${err.message}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res
        .status(500)
        .json({ status: false, message: "don`t have a user" });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "user is deleted!!" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `error while deleting user ${err.message}`,
    });
  }
};

export const deleteUserById = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(500)
        .json({ status: false, message: "don`t have a user" });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "user is deleted!!" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `error while deleting user ${err.message}`,
    });
  }
};

export const updateUser = async (req, res) => {
  const { name, gender, month, date, year } = req.body;

  if (!name || !gender || !month || !year || !date)
    return res
      .status(400)
      .json({ status: false, message: "Please do not empty fileds" });

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        date: req.body.date,
        month: req.body.month,
        year: req.body.year,
      },
      { new: true }
    );
    if (!user) {
      return res.status(500).json({
        status: false,
        message: "something went wrong while updating",
      });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "user is updated!!" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `error while updating user ${err.message}`,
    });
  }
};
