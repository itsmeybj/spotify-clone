import React, { useContext, useEffect, useState } from "react";
import songContext from "../../contexts/SongContext";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";
import { AiOutlinePauseCircle } from "react-icons/ai";
import NormalButton from "../shared/NormalButton";
import TextInput from "../shared/TextInput";
import CloudinarySongUpload from "../shared/CloudinarySongUpload";
import Button from "../shared/Button";
import { Toast } from "../shared/Toast";
import { updateSongApi } from "../../utils/api";

const ShowEditSongUser = () => {
  const [songData, setSongData] = useState();
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state);
  console.log(state.edit);
  const {
    isPaused,
    currentSong,
    setCurrentSong,
    setIsPaused,
    soundPlay,
    setSoundPlay,
  } = useContext(songContext);

  const updateSong = () => {
    alert(songData);
  };
  const playCurrentSong = (songObj) => {
    setCurrentSong(songObj);
  };
  const [name, setName] = useState();

  useEffect(() => {
    console.log(state.song);
    setSongData(state.song);
    setName(state.song.name)
    
    localStorage.setItem("name",state.song.name);
    localStorage.setItem("thumbnail",state.song.thumbnail);
    localStorage.setItem("song",state.song.song);

  }, [state]);

  const [loading, setLoading] = useState();

  const setNameData = (e) => {
    setName(e.target.value);
  };
  const setNewNameData = () => {
    localStorage.setItem("name", name);
  };

  const formSubmit = async () => {
    const name = localStorage.getItem("name");
    const thumbnail = localStorage.getItem("thumbnail");
    const song = localStorage.getItem("song");

    let data = { name, thumbnail, song };

    setLoading(true);
    const result = await updateSongApi(`artist/song/update-song/${songData._id}`, data);
    if (result.status) {
      setLoading(false);

      Toast(result.status, "Song uploaded successfully");

      setName("");

      localStorage.removeItem("thumbnail");
      localStorage.removeItem("song");
      localStorage.removeItem("name");

      
      setTimeout(() => {         
          navigate("/artist/dashboard")     
      }, 2000);

    } else {
      setLoading(false);
      Toast(result.status, result.message);
    }
  };

  return (
    <div className="flex flex-col font-semibold text-gray-200 p-7 ">
      <div className="text-2xl">
        Song Details
      </div>
      <div
        className={`flex flex-col items-center justify-center`}
      >
        <img src={songData?.thumbnail} alt="" className="rounded-lg " />
        <div className="text-2xl font-bold mt-2">{songData?.name}</div>
        <div className="text-xl font-semibold mt-2">
          {songData?.artist.name}
        </div>
        <div className="text-xl font-semibold mt-2">
          <div
            className="cursor hover:cursor-pointer mr-3"
            onClick={() => {
              playCurrentSong(songData);
            }}
          >
            {isPaused ? (
              <BsPlayCircle size={45} />
            ) : (
              <AiOutlinePauseCircle size={45} />
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ShowEditSongUser;
