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

const ShowEditSongArtist = () => {
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
      <div className="text-xl">
        {state.edit ? "Edit Song Details" : "Song Details"}
      </div>
      <div
        className={`${
          state.edit ? "hidden" : "block"
        } flex flex-col items-center justify-center`}
      >
        <img src={songData?.thumbnail} alt="" className="rounded-lg " />
        <div className="text-xl font-bold mt-2">{songData?.name}</div>
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
              <BsPlayCircle size={40} />
            ) : (
              <AiOutlinePauseCircle size={40} />
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          state?.edit ? "block" : "hidden"
        } flex flex-col items-center justify-center mt-5`}
      >
        <div className="flex flex-col w-[100%] ">
          <img className="rounded h-32 w-32" src={songData?.thumbnail} alt="" />

          <div className="flex items-center justify-between ">
            
            <TextInput
              label="Song Name"
              placeholder="Enter song name"
              classname="my-6 w-[370px]"
              name="name"
              value={name}
              setInput={setNameData}
              setNewName={setNewNameData}
            />

            <div className="mt-7">
              <CloudinarySongUpload title="Upload Song" tag="song" />
            </div>
            
            <div className="mt-7">
              <CloudinarySongUpload title="Upload Image" tag="image" />
            </div>

            <div className="mt-7">
              <NormalButton
              classname="p-2"
                title="Cancel"
                setButtonData={() => {
                  navigate(-1);
                }}
              />
            </div>

            <div className="mt-7">
              <Button
                title="Update for Upload"
                submitData={formSubmit}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowEditSongArtist;
