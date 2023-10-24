import Playlist from "../models/PlaylistModel.js";
import Song from "../models/SongModel.js";
import User from "../models/UserModel.js";

//create playlist
export const createPlaylist = async (req, res) => {
  const { name, thumbnail } = req.body;

  if (!name || !thumbnail)
    return res
      .status(500)
      .json({ status: false, message: "Insufficient data to create playlist" });

  try {
    let playlistData = {
      name,
      thumbnail,
      songs: [],
      user: req.user._id,
      collaborators: [],
    };

    const playlist = await Playlist.create(playlistData);

    if (playlist) {
      return res.status(200).json({ status: true, data: playlist });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "playlist not created" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while creating playlist ${err.message}`,
    });
  }
};

//edit playlist by id
export const updatePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId)
    return res
      .status(500)
      .json({ status: false, message: "Insufficient data to update playlist" });

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist)
      return res
        .status(500)
        .json({ status: false, message: "playlist not found" });

    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(403).json({
        status: false,
        message: "User don`t have access to edit playlist",
      });

    playlist.name = req.body.name;
    playlist.thumbnail = req.body.thumbnail;

    playlist.save();

    return res
      .status(200)
      .json({ status: true, message: "Updated successfully" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while updating playlist ${err.message}`,
    });
  }
};

//remove playlist
export const removePlaylist = async (req, res) => {
  const { playlistId } = req.body;
  console.log(playlistId)

  if (!playlistId)
    return res
      .status(500)
      .json({ status: false, message: "Insufficient data to delete playlist" });

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist)
      return res
        .status(500)
        .json({ status: false, message: "playlist not found" });

    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(403).json({
        status: false,
        message: "User don`t have access to delete playlist",
      });

    const removePlaylist = await Playlist.findByIdAndDelete(playlistId);

    if (!removePlaylist)
      return res.status(403).json({
        status: false,
        message: "can not deleted playlist",
      });

    return res
      .status(200)
      .json({ status: true, message: "Playlist is deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while deleting playlist ${err.message}`,
    });
  }
};

//add song to playlist
export const addToPlaylist = async (req, res) => {
  const { playlilstId, songId } = req.body;
   
  const currentUser = req.user;

  
  try {
    const playlist = await Playlist.findOne({ _id: playlilstId });
    if (!playlist)
      return res
        .status(304)
        .json({ status: false, message: "Playlist does not exist" });

        
    // console.log(playlist);
    // console.log(currentUser);
    // console.log(playlist.user);
    // console.log(currentUser._id);
    // console.log(playlist.user == currentUser._id);
    // console.log(typeof playlist.user);
    // console.log(playlist.user.equals(currentUser._id));

    if (!playlist.user.equals(currentUser._id))
      return res
        .status(304)
        .json({ status: false, message: "User don`t have access to add song" });

        // console.log(currentUser._id)
        // return
    const song = await Song.findOne({ _id: songId });
    if (!song)
      return res
        .status(304)
        .json({ status: false, message: "Song does not exist" });

    const index = playlist.songs.indexOf(songId);
     
    if (index === -1) {
      playlist.songs.push(songId);
      await playlist.save();

      return res.status(200).json({ status: true, message: "Song Added to Playlist" });
    } else {
      return res
        .status(403)
        .json({ status: false, message: "song already exists in playlist" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while adding song to playlist ${err.message}`,
    });
  }
};

//remove song from playlist
export const removeSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const playlist = await Playlist.findById(playlistId);

    if (!user._id.equals(playlist.user))
      return res.status(304).json({
        status: false,
        message: "User don`t have access to remove song",
      });

    const index = playlist.songs.indexOf(songId);

    playlist.songs.splice(index, 1);

    await playlist.save();

    return res
      .status(200)
      .json({ status: true, message: "Removed from playlist" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while removing song to playlist ${err.message}`,
    });
  }
};

//like playlist by user
export const likePlaylist = async (req, res) => {
  const { playlistId } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const playlist = await Playlist.findById(playlistId);

    if (!user._id.equals(playlist.user))
      return res.status(304).json({
        status: false,
        message: "User don`t have access to remove song",
      });

    const index = user.likedPlaylists.indexOf(playlistId);
    if (index === -1) {
      user.likedPlaylists.push(playlistId);
      await user.save();

      return res
        .status(200)
        .json({ status: true, message: "Playlist is added to like playlist" });
    } else {
      user.likedPlaylists.splice(index, 1);
      await user.save();

      return res
        .status(200)
        .json({
          status: true,
          message: "Playlist is removed from your like playlist",
        });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while adding like playlist ${err.message}`,
    });
  }
};

//show all playlist
export const showAllPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs");
    if (playlists) {
      return res.status(200).json({ status: true, data: playlists });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "playlist not found" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while fetching playlist ${err.message}`,
    });
  }
};

//show playlist by playlist-id
export const showPlaylistById = async (req, res) => {
  const playlistId = req.params.playlistId;

  if (!playlistId)
    return res
      .status(400)
      .json({ status: false, message: "playlist is not pass to show song" });

  try {
    const playlist = await Playlist.findById(playlistId);
    if (playlist) {
      return res.status(200).json({ status: true, data: playlist });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "playlist not found" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while fetching playlist ${err.message}`,
    });
  }
};

