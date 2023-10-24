import { useState } from "react";
import { openUploadWidget } from "../../utils/CloudinaryService";

const CloudinarySongUpload = ({ title, tag}) => {
  const [loading, setLoading] = useState();

  const uploadImageWidget = () => {
    setLoading(true);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dn7rp1pnb",
        uploadPreset: "wehrtk3m",
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          //console.log(result.info);
          setLoading(false);
          if (tag === "image") {
            // setNewThumbnail(result.info.secure_url)
            //console.log('in thumbnail - ',result.info.secure_url)
            
            localStorage.setItem("thumbnail", result.info.secure_url);
          }
          if (tag === "song") {
            //setNewSong(result.info.secure_ur)
            //console.log('in song - ',result.info.secure_url)
            localStorage.setItem("song", result.info.secure_url);
          }
          //props.onImageUpload(result.info.public_id);
        } else {
          setLoading(false);
          console.log(error);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <div className="flex items-center my-8 border border-solid border-white rounded-full">
      <button
        className="bg-black text-white font-bold p-4 px-10 rounded-full"
        onClick={uploadImageWidget}
      >
        {loading ? <img src={"../../images/loader.svg"} alt="" /> : title}
      </button>
    </div>
  );
};

export default CloudinarySongUpload;
