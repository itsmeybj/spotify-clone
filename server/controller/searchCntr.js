import Playlist from "../models/PlaylistModel.js";
import Song from "../models/SongModel.js";

export const searchSongsAndPlaylist = async (req, res) => {
  const search = req.query.search;
  try {
    if (search !== "") {
      const songs = await Song.find({
        name: { $regex: search, $options: "i" },
      }).limit(10);

      const playlists = await Playlist.find({
        name: { $regex: search, $options: "i" },
      }).limit(10);

      const result = [songs, playlists];
      return res.status(200).json({ status: true, data: result });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Error while searching songs and playlist ${err.message}`,
    });
  }
};
