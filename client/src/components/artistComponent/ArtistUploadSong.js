import React, { useState } from "react";
import TextInput from "../shared/TextInput";
import { Toast } from "../shared/Toast";
import Button from "../shared/Button";
import { songApi } from "../../utils/api";
import CloudinarySongUpload from "../shared/CloudinarySongUpload";

const ArtistUploadSong = () => {
  //Note - after upload song or image then this component again start and all prev. value become invisible, thats why we use here localstorge

  //check bellow statement for just confim that cloudinary is added or not
  // console.log(window.cloudinary)

  const [name, setName] = useState("");
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
    const result = await songApi("artist/song/create-song", data);
    if (result.status) {
      setLoading(false);

      Toast(result.status, "Song uploaded successfully");

      setName("");

      localStorage.removeItem("thumbnail");
      localStorage.removeItem("song");
      localStorage.removeItem("name");
    } else {
      setLoading(false);
      Toast(result.status, result.message);
    }
  };
  return (
    <>
      <div className="flex flex-col font-semibold text-gray-200 p-7 ">
        <div className="text-2xl">Spotify Playlists</div>
        <div className="flex">
          <div className="w-1/2">
          <TextInput
            label="Song Name"
            placeholder="Enter song name"
            classname="my-6 w-1/2"
            name="name"
            value={name}
            setInput={setNameData}
            setNewName={setNewNameData}
          />
          </div>
          <div className="ml-5 mr-5 mt-5">
            <CloudinarySongUpload title="Upload Song" tag="song" />
          </div>
          <div className="mr-5 mt-5">
            <CloudinarySongUpload title="Upload Image" tag="image" />
          </div>
          <div className="mt-9">
            <Button title="Upload" submitData={formSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistUploadSong;
