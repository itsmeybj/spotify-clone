import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LeftNav from "../shared/LeftNav";
import Header from "../shared/Header";
import { fcategories_user, scategories_user } from "../../utils/constant";
import { FcLike } from "react-icons/fc";
import FooterSongPlayPanel from "../../components/shared/FooterSongPlayPanel"
import songContext from "../../contexts/SongContext";

const UserHome = () => {
  
  const navigate = useNavigate();

  const owner = Cookies.get("owner");
  const {currentSong,setCurrentSong} = useContext(songContext)

  //console.log(currentSong);

  useEffect(() => {
    if (owner === "admin") {
      navigate("/admin/dashboard");
    } else if (owner === "artist") {
      navigate("/artist/dashboard");
    } else if (owner === "user") {
      navigate("/user");
    } else {
      navigate("/user");
    }
  }, []);

  return (
    <div className="h-full w-full bg-black">
      <div className={`${currentSong ? "h-[90%]" : "h-full"} w-full flex`}>
        {/* left nav bar */}
        <LeftNav
          fcategories={fcategories_user}
          scategories={scategories_user}
        />
        {/* right side bar*/}
        <div className="h-full w-[80%]">
          {/* Header */}
          <Header owner={owner} />
          {/* content  */}
          <div className={`ml-2 w-full h-[88%] bg-white/[0.11] text-white overflow-auto scrollbar:overflow display-none`}>
            <Outlet />
          </div>
        </div>
      </div>
      {/* <div className="pl-10 pr-10 flex justify-between h-[10%] w-full bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="flex items-center">
          <div>
            <img style={{height:"70px"}} className="rounded-lg" src="https://res.cloudinary.com/dn7rp1pnb/image/upload/v1697809891/j8b2oqrbdtoqzhnx0fdd.jpg" alt="" />
          </div>
          <div className="ml-3">
            <div className="text-xl font-semibold text-black/[0.15]">Curtains</div>
            <div className="text-md font-semi-bold text-black/[0.18]">Ed Shareen</div>
          </div>
          <div>
            <FcLike color="white" size={30} />
          </div>
        </div>
        <div>sfsd</div>
        <div>df</div>
      </div> */}
      {
        currentSong && <FooterSongPlayPanel/>
      }
    </div>
  );
};

export default UserHome;
