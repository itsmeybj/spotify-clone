import Song from "../models/SongModel.js";
import User from "../models/UserModel.js";

export const showAllUserSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    if (songs) {
      return res.status(200).json({ status: true, data: songs });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "songs not found" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while fetching songs ${err.message}`,
    });
  }
};

//localhost:5000/artist/song/show-song/6527eb5b28ac2a3af803992f
export const showSongByName = async (req, res) => {
  const {songName} = req.params;
  console.log(songName)

  if (!songName)
    return res
      .status(400)
      .json({ status: false, message: "song name is not pass to show song" });

  try {
    const song = await Song.find({name: { "$regex": `${songName}`, "$options": "i" }}).populate("artist");
   // console.log(song)
    if (song) {
      return res.status(200).json({ status: true, data: song });
    } else {
      return res.status(500).json({ status: false, message: "song not found" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while fetching song ${err.message}`,
    });
  }
};

export const showSongByArtist = async (req, res) => {
  const songArtistId = req.params.songArtistId;

  if (!songArtistId)
    return res
      .status(400)
      .json({ status: false, message: "song artist is not pass to show song" });

  try {
    const song = await Song.find({ artist: songArtistId });
    if (song) {
      return res.status(200).json({ status: true, data: song });
    } else {
      return res.status(500).json({ status: false, message: "song not found" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while fetching song ${err.message}`,
    });
  }
};

export const likeSong = async (req, res) => {
  const { songId } = req.params;
  let resMessage = "";

  if (!songId)
    return res
      .status(400)
      .json({ status: false, message: "song is not pass to show song" });

  try {
    const song = await Song.findById(songId);
    if (!song)
      return res
        .status(400)
        .json({ status: false, message: "song does not exist" });

    const user = await User.findById(req.user._id);
    
    const index = user.likedSongs.indexOf(song._id);

    if (index === -1) {
      user.likedSongs.push(song._id);
      resMessage = "Added to your liked songs";
    } else {
      user.likedSongs.splice(index, 1);
      resMessage = "Removed from your likes songs";
    }
    await user.save();
    return res.status(200).json({ status: true, message: resMessage });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while like song ${err.message}`,
    });
  }
};

export const showLikeSongs = async (req, res) => {
  
  try {
    const user = await User.findById(req.user._id)

    const songs = await Song.find({ _id : user.likedSongs });

    if (!songs) 
      return res.status(500).json({ status: false, message: "song does not exist found" });
      
      return res.status(200).json({ status: true, data: songs });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while fetching like song ${err.message}`,
    });
  }
};
