import React, { useContext, useEffect, useState } from "react";
import Card from "../shared/Card";
import { cards_data } from "../../utils/constant";
import Cookies from "js-cookie";
import Modal from "../shared/Modal";
import { BiSolidLogIn, BiSolidPlaylist } from "react-icons/bi";
import { addSongToPlaylistApi, allPlaylistFetchApi, allUsersSongFetchApi, getAllArtistApi, likeSongApi } from "../../utils/api";
import songContext from "../../contexts/SongContext";
import { useNavigate } from "react-router-dom";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { MdPlaylistAddCheck } from "react-icons/md";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { Toast } from "../shared/Toast";
import { BsPlusSlashMinus } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";


const UserDashboard = () => {
  const owner = Cookies.get("owner");
  if(owner){
    Cookies.remove("link")
  }
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState();
  const [flag, setFlag] = useState(false);
  const [status, setStatus] = useState();

  const [allSongs, setAllSongs] = useState();
  const [allArtists, setAllArtists] = useState();
  const [playlilsts,setPlaylists] = useState()
  const [song,setSong] = useState()

  const navigate = useNavigate();
  const {
    currentSong,
    setCurrentSong,
    soundPlay,
    isPaused,
    setIsPaused,
    setSoundPlay,
  } = useContext(songContext);

  const fetchAllSongs = async () => {
    setLoading(true);
    const result = await allUsersSongFetchApi("user/song/show-all-user-songs");
    //console.log(result);
    if (result.status) {
      setAllSongs(result.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getAllArtist = async () => {
    setLoading(true);
    const result = await getAllArtistApi("user/get-artist");
    console.log(result);
    if (result.status) {
      setAllArtists(result.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const likeSong = async (song) => {
    //alert(song._id);

    const result = await likeSongApi(`user/song/like-song/${song._id}`);
    console.log(result);
    if (result.status) {
      Toast(
        result.status,
        result.message
      );
      setStatus(result.message);
    } else {
      Toast(
        result.status,
        "Error while like or dilike song"
      );
      setStatus(result.message);
    }
  };

  const addToPlaylist=async(playlilstId)=>{
    console.log(playlilstId)
  ///  console.log(song._id,playlilstId)
    setOpen(false)
    const data = {playlilstId : playlilstId,songId : song._id}
    const result = await addSongToPlaylistApi(`user/playlist/add-to-playlist`,data);
    console.log(result);
    if (result.status) {
      Toast(
        result.status,
        result.message
      );
      setStatus(result.message);
    } else {
      Toast(
        result.status,
        result.message
      );
      setStatus(result.message);
    }
  }

  const showAddToPlaylilstDialog = async (song) => {
    //alert(song._id);
    //console.log(song)
    const result = await allPlaylistFetchApi("user/playlist/show-all");
    console.log(result);
    if (result.status) {
      setPlaylists(result?.data);
      setSong(song)
//      console.log(result.data)
  //    console.log(result.data?.name)
    //  console.log(result.data?._id)
    } else {
      console.log(result);
    }

    setOpen(true)

    // const result = await likeSongApi(`user/song/like-song/${song._id}`);
    // console.log(result);
    // if (result.status) {
    //   Toast(
    //     result.status,
    //     result.message
    //   );
    //   setStatus(result.message);
    // } else {
    //   Toast(
    //     result.status,
    //     "Error while like or dilike song"
    //   );
    //   setStatus(result.message);
    // }
  };

  

  useEffect(() => {
    fetchAllSongs();
    getAllArtist();
  }, []);

  const cardClicked = () => {
    if (owner) {
      //alert("yes");
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} classname="bg-white">
        <div className="font-bold bg-white text-2xl">
          <div className="w-60">
            <BiSolidPlaylist size={56} className="mx-auto text-red-500" />
            <div className={`mx-auto my-4 w-45`}>
              {
                playlilsts ? playlilsts.map((playlilst)=>(
                <div key={playlilst._id} className="flex justify-between my-4">
                <h3 className="text-lg font-black text-gray-800">
                  {playlilst.name}
                </h3>
                <button onClick={()=>addToPlaylist(playlilst._id)}><AiOutlinePlusCircle size={35} color="black"/></button>
                </div>
                )) : ""
              }
              
            </div>
            
          </div>
        </div>
      </Modal>
      <div className={`${owner === "user" ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center mb-4">
        {loading ? (
          <img
            style={{ height: "60px" }}
            src={"../../images/loader.svg"}
            alt=""
          />
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-col font-semibold text-gray-200 p-7 ">
        
        {/* all song  */}
        {
          (allSongs?.length>0) ? <div className="text-xl">All Songs</div> : ""
        }

        <div className="flex w-full overflow-auto">
          {allSongs
            ? allSongs?.map((song) => (
                <div className="flex group relative w-fit m-2 p-1 overflow-x-auto bg-black/[0.25] hover:bg-black/[0.45]">
                  <div
                    onClick={() => setCurrentSong(song)}
                    key={song?._id}
                    className="flex cursor-pointer"
                  >
                    <div className="">
                      <Card
                        title={song?.name}
                        subtitle={song?.artist.name}
                        img={song?.thumbnail}
                        cardClick={cardClicked}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center rounded-lg hidden group-hover:block group-hover:bg-white group-hover:text-black absolute">
                    <div
                      className="hover:cursor-pointer p-2"
                      onClick={() => likeSong(song)}
                    >
                      <IoHeartDislikeOutline size={20} />
                    </div>
                    <div
                      className="hover:cursor-pointer p-2"
                      onClick={() => showAddToPlaylilstDialog(song)}
                    >
                      <AiOutlinePlusCircle size={20} />
                    </div>

                  </div>
                </div>
              ))
            : ""}
        </div>

        {/* all artist list */}
        
        {
          (allSongs?.length>0) ? <div className="text-xl">All Artist</div> : ""
        }
        <div className="flex w-full overflow-auto">
          {allArtists
            ? allArtists.map((artist) => (
                <div className="flex m-2 p-1 overflow-x-auto bg-black/[0.25] hover:bg-black/[0.45]">
                  <div
                    onClick={() => setCurrentSong(artist)}
                    key={artist._id}
                    className="flex cursor-pointer"
                  >
                    <div className="overflow-auto">
                      <Card
                        title={artist.name}
                        subtitle={artist.email}
                        img="../../images/1.jpg"
                        cardClick={cardClicked}
                      />
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>

                
      </div>
      </div>
    </>
  );
};

export default UserDashboard;
