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
import { updatePlaylistApi, updateSongApi } from "../../utils/api";

const ShowEditPlaylist = () => {
  const [playlistData, setPlaylistData] = useState();
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

  const updatePlaylist = () => {
    alert(playlistData);
  };
  
  const [name, setName] = useState();

  useEffect(() => {
    //console.log(state?.song);
    setPlaylistData(state?.playlist);
    setName(state?.playlist.name);

    localStorage.setItem("name",state.playlist.name);
    localStorage.setItem("thumbnail",state.playlist.thumbnail);
    
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

    let data = { name, thumbnail };

    setLoading(true);

    //console.log(data)
    let obj = { "playlistId" : state?.playlist?._id};
    const result = await updatePlaylistApi(`user/playlist/update/${state?.playlist?._id}`, data);
    if (result.status) {
      setLoading(false);

      Toast(result.status, "Playlist Updated successfully");

      setName("");

      localStorage.removeItem("thumbnail");
      localStorage.removeItem("song");

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setLoading(false);
      Toast(result.status, result.message);
    }
  };

  return (
    <div className="flex flex-col font-semibold text-gray-200 p-7 ">
      <div className={`flex flex-col items-center justify-center mt-5`}>
        <div className="flex flex-col w-[100%] ">
          <img
            className="rounded h-32 w-32"
            src={playlistData?.thumbnail}
            alt=""
          />

          <div className="flex items-center">
            <div className="w-1/2">
            <TextInput
              label="Playlist Name"
              placeholder="Enter playlist name"
              classname="my-6 w-1/2"
              name="name"
              value={name}
              setInput={setNameData}
              setNewName={setNewNameData}
            />
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
                title="Update"
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

export default ShowEditPlaylist;
