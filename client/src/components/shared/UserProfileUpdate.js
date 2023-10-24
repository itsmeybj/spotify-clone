import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import songContext from "../../contexts/SongContext";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";
import NormalButton from "../shared/NormalButton"

const UserProflieUpdate = () => {
  const owner = Cookies.get("owner");
  const { state } = useLocation();
  const navigate = useNavigate()

  console.log(state)
  const userUpdate = () => {
    alert("user update");
    console.log(state)
  };

  const updateUser=()=>{
    alert("update")
  }

  return (
    <>
      <div className="flex flex-col font-semibold text-gray-200 p-7 ">
        <div className="text-xl">
          {owner === "artist"
            ? "Update Artist Profile"
            : owner === "admin"
            ? "Update Admin Profile"
            : "Update User Profile"}
        </div>
        <div className="flex items-center justify-between mt-5 bg-white/[0.15] p-4 w-full hover:bg-white/[0.20]">
          <div className="mr-8">{state?.userInfo?.name}</div>
          <div className="mr-8">{state?.userInfo?.email}</div>
          <div className="flex ">
          <NormalButton title="Update User" setButtonData={updateUser} />
          <NormalButton title="Cancel" setButtonData={()=>{navigate(-1)}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProflieUpdate;
