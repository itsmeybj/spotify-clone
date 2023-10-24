import React, { useState } from "react";
import TextInput from "../shared/TextInput";
import { Toast } from "../shared/Toast";
import Button from "../shared/Button";
import { songApi } from "../../utils/api";
import CloudinarySongUpload from "../shared/CloudinarySongUpload";
import { useNavigate } from "react-router-dom";

const UserCreatePlaylist = () => {
  //Note - after upload song or image then this component again start and all prev. value become invisible, thats why we use here localstorge

  //check bellow statement for just confim that cloudinary is added or not
  // console.log(window.cloudinary)

  const [name, setName] = useState("");
  const [loading, setLoading] = useState();
  const navigate = useNavigate()

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
    const result = await songApi("user/playlist/create", data);
    if (result.status) {
      setLoading(false);

      Toast(result.status, "Playlist Created successfully");

      setName("");

      localStorage.removeItem("thumbnail");
      localStorage.removeItem("name");

      setTimeout(() => {
        navigate("/user/show-playlist")
      }, 2000);
    } else {
      setLoading(false);
      Toast(result.status, result.message);
    }
  };
  return (
    <>
      <div className="flex flex-col font-semibold text-gray-200 p-7 ">
        <div className="text-2xl">Spotify Create Playlists</div>
        <div className="flex">
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

          <div className="ml-5 mr-5 mt-5">
            <CloudinarySongUpload title="Upload Image" tag="image" />
          </div>
          <div className="mt-8">
            <Button title="Upload" submitData={formSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCreatePlaylist;
