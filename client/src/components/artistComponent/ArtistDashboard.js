import React, { useContext, useEffect, useState } from "react";
import { allSongFetchApi, deleteSongByIdApi } from "../../utils/api";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import { Howl, Howler } from "howler";
import songContext from "../../contexts/SongContext";
import Modal from "../shared/Modal";
import { useNavigate } from "react-router-dom";

const ArtistDashboard = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState();
  const [songs, setSongs] = useState();
  const [deleteState,setDeleteState] = useState()
  const [flag,setFlag] = useState(false)
  const [status,setStatus] = useState()

const navigate = useNavigate()
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
    const result = await allSongFetchApi("artist/song/show-all-songs");
    //console.log(result);
    if (result.status) {
      setSongs(result.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const setSongDelete=(song)=>{
    setOpen(true)
    setDeleteState(song._id)
  }

  const deleteSong=async()=>{
    console.log(deleteState)
    //alert(deleteState)
    setLoading(true);
    const data = {"songId" : deleteState}
    const result = await deleteSongByIdApi("artist/song/delete-song",data);
    console.log(result);
    if (result.status) {
      setFlag(true)
      //setSongs(result.data);
      setLoading(false);
      setStatus(result.message)
    } else {
      setFlag(true)
      setLoading(false);
      setStatus(result.message)
    }

    setTimeout(() => {         
      setFlag(false)
      setStatus("")
      setOpen(false)  
      //navigate("/dashboard")   
    }, 2000);

  }

  useEffect(() => {
    fetchAllSongs();
    console.log(songs);
  }, [open,setOpen]);
  
  const dialogClose=()=>{
    setOpen(false)
    setFlag(false)
    setStatus(false)
    navigate("artist/dashboard")   
  }
  return (
     <>
      <Modal open={open} onClose={()=>dialogClose()}>
        <div className="font-bold bg-white text-2xl">
          <div className="text-center w-56">
            <BsTrash size={40} className="mx-auto text-red-500"/>
            <div className={`${flag ? "block" : "hidden"} mx-auto my-4 w-48`}>
              <h3 className="text-md text-gray-800">{status}</h3>
            </div>
            <div className={`${flag ? "hidden" : "block"} mx-auto my-4 w-48`}>
              <h3 className="text-lg  text-gray-800">Confirm Delete</h3>
              <p className="text-sm text-gray-500">Are you sure you want to delete this song?</p>
            </div>
            <div className={`${flag ? "hidden" : "block"} flex gap-4`}>
              <button onClick={deleteSong} className="text-white font-light bg-red-500 w-full shadow-md rounded-lg p-2">
                {loading ? <img src={"../../images/loader.svg"} alt="" style={{color:"red",marginLeft:"30px"}} />  : "Delete"}</button>
              <button className="text-slate-700  font-semibold bg-white shadow-md w-full rounded-lg p-2" onClick={()=>setOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>
      
    <div className="flex flex-col font-semibold text-gray-200 p-7 ">
      <div className="text-xl">Spotify Song Dashboard</div>
      <div className="flex items-center justify-center mb-4">
        {loading ? (
          <img
            style={{ height: "40px" }}
            src={"../../images/loader.svg"}
            alt=""
          />
        ) : (
          ""
        )}
      </div>

      {songs
        ? songs.map((song) => (
            <div className="flex justify-between m-1 p-3 bg-black/[0.25] hover:bg-black/[0.45]">
              <div
                onClick={() => setCurrentSong(song)}
                key={song._id}
                className="flex justify-between cursor-pointer w-full"
              >
                <div className="flex">
                  <div>
                    <img
                      style={{ height: "80px" }}
                      className="rounded-lg"
                      src={song.thumbnail}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="font-semibold text-md text-gray-300 ml-5 hover:underline">
                      {song.name}
                    </div>
                    <div className="font-semibold text-sm text-gray-300 ml-5 hover:underline">
                      {song.artist.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="m-2 hover:cursor-pointer">
                  <BsTrash onClick={()=>setSongDelete(song)} color="white" size={20} />
                </div>
                <div className="m-2 hover:cursor-pointer">
                  <BiEdit onClick={()=>{navigate("/artist/show-edit-song-artist",{state:{song,edit:true}})  }} color="white" size={20} />
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
    </>
  );
};

export default ArtistDashboard;
