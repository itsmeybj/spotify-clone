import Song from "../models/SongModel.js";

export const createSong = async (req, res) => {
  const { name, thumbnail, song } = req.body;

  if (!name || !thumbnail || !song)
    return res
      .status(400)
      .json({ status: false, message: "Insufficient info to create a song" });

  if (req.user) {
    //if user or artist found from artist middleware
    try {
      const artist = req.user._id;
      const songDetails = { name, thumbnail, song, artist };

      const crreatedSong = await Song.create(songDetails);
      return res.status(200).json({ status: true, data: crreatedSong });
    } catch (err) {
      return res
        .status(500)
        .json({
          status: false,
          message: `Error while creating song ${err.message}`,
        });
    }
  } else {
    return res
      .status(500)
      .json({
        status: false,
        message: "there is no user or token is not matched. pls login again",
      });
  }
};

export const showAllSongs = async (req, res) => {
  if (req.user) {
    try {
      const songs = await Song.find({ artist: req.user._id }).populate(
        "artist"
      );
      if (songs) {
        return res.status(200).json({ status: true, data: songs });
      } else {
        return res
          .status(500)
          .json({ status: false, message: "songs not found" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({
          status: false,
          message: `Error while fetching songs ${err.message}`,
        });
    }
  } else {
    return res
      .status(500)
      .json({
        status: false,
        message: "there is no user or token is not matched. pls login again",
      });
  }
};

//localhost:5000/artist/song/show-song/6527eb5b28ac2a3af803992f
export const showSongByName = async (req, res) => {
  const songName = req.params.songName;

  if (!songName)
    return res
      .status(400)
      .json({ status: false, message: "song name is not pass to show song" });

  try {
    const song = await Song.find({name: { "$regex": `${songName}`, "$options": "i" }}).populate("artist");
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

//localhost:5000/artist/song/show-song/6527eb5b28ac2a3af803992f
export const showSong = async (req, res) => {
  const id = req.params.songId;

  if (!id)
    return res
      .status(400)
      .json({ status: false, message: "id is not pass to show song" });

  if (req.user) {
    try {
      const song = await Song.findById(id);
      if (song) {
        return res.status(200).json({ status: true, data: song });
      } else {
        return res
          .status(500)
          .json({ status: false, message: "song not found" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({
          status: false,
          message: `Error while fetching song ${err.message}`,
        });
    }
  } else {
    return res
      .status(500)
      .json({
        status: false,
        message: "there is no user or token is not matched. pls login again",
      });
  }
};

export const updateSong = async (req, res) => {
  const { name, thumbnail, song } = req.body;
  const id = req.params.songId;

  if (!name || !thumbnail || !song)
    return res
      .status(400)
      .json({ status: false, message: "Insufficient info to update a song" });

  if (req.user) {
    //if user or artist found from artist middleware
    try {
      const songDetails = { name, thumbnail, song };

      const updatedSong = await Song.findByIdAndUpdate(id, songDetails, {
        new: true,
      });
      return res.status(200).json({ status: true, data: updatedSong });
    } catch (err) {
      return res
        .status(500)
        .json({
          status: false,
          message: `Error while updating song ${err.message}`,
        });
    }
  } else {
    return res
      .status(500)
      .json({
        status: false,
        message: "there is no user or token is not matched. pls login again",
      });
  }
};

export const deleteSong = async (req, res) => {
  const { songId } = req.body;

  if (songId === "")
    return res
      .status(400)
      .json({ status: false, message: "Insufficient info to update a song" });

  if (req.user) {
    //if user or artist found from artist middleware
    try {
      const deletedSong = await Song.findByIdAndDelete(songId);
      return res
        .status(200)
        .json({ status: true, message: "Song Deleted successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({
          status: false,
          message: `Error while deleting song ${err.message}`,
        });
    }
  } else {
    return res
      .status(500)
      .json({
        status: false,
        message: "there is no user or token is not matched. pls login again",
      });
  }
};
