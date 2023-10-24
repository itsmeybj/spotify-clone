import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GrPrevious } from "react-icons/gr";
import { AiFillCaretDown } from "react-icons/ai";
import {
  MdOutlineNavigateNext,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";

import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import { BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";
import { showSongByArtistName } from "../../utils/api";
import songContext from "../../contexts/SongContext"
const Header = ({ owner }) => {
  //const owner = Cookies.get("owner");
  const navigate = useNavigate()
  const email = Cookies.get("email");
  //console.log("hello",owner);
  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState();
  const [searchData, setSearchData] = useState();
  

  const showSongArtist=(song)=>{
    setSearchData(null)
    setSearchText("")
    if(owner==="artist")
    navigate("show-edit-song-artist",{state:{song}})
    else if(owner ==="admin")
    navigate("show-edit-song-admin",{state:{song}})
  else if(owner==="user")
  navigate("show-edit-song-user",{state:{song}})
  
  }


  const showSearch = async (e) => {
    //console.log(e.type == "keyup")

    if (e.type == "keyup" || e.type == "Enter" || e.type == "Backspace") {
      if (searchText == 0) {
        setSearchData("");
      } else {    
        setLoading(true);
        let result;
        if(owner==="artist"){
          result = await showSongByArtistName(
            `artist/song/show-song-name/${searchText}`
            );
        
        }else{//admin or user
          result = await showSongByArtistName(
            `user/song/show-song-name/${searchText}`
            );
        
        }
            
            //console.log(result)  
         if (result.status) {
            //setSongs(result.data);
           // console.log(result);
            setLoading(false);
            setSearchData(result.data);
            // console.log(searchData.length);
          } else {
            console.log(`${owner} not found`);
            setLoading(false);
          }       
    }
  }

  };

  return (
    <>
      <div className="w-full h-[10%] bg-white/[0.15] text-white flex items-center justify-between mt-2 ml-2 rounded-tr-lg rounded-tl-lg">
        <div className="flex items-center">
          <div className="ml-8 cursor-pointer rounded-full h-[35px] w-[35px] flex items-center justify-center bg-black/[0.15] hover:bg-black/[0.5] text-white">
            <MdOutlineArrowBackIosNew size={20} color="white" />
          </div>
          <div className="ml-4 cursor-pointer rounded-full h-[35px] w-[35px] flex items-center justify-center bg-black/[0.15] hover:bg-black/[0.5] text-white">
            <MdOutlineNavigateNext size={30} color="white" />
          </div>
          {owner ? (
            <div className="flex ml-5 relative">
              <div className="flex ">
                <div className="rounded-tl-full rounded-bl-full h-[40px] w-[40px] flex items-center justify-center bg-white text-white">
                  <BsSearch size={20} color="black" />
                </div>
                <input
                  name="search"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onKeyUp={showSearch}
                  placeholder="Search song"
                  className="outline-0 w-[400px] text-black rounded-tr-full rounded-br-full placeholder:text-md font-semibold placeholder:text-black/[0.80] pl-2"
                />
              </div>
              <div className="z-50 flex flex-col w-full text-md text-gray-400 mt-[60px] absolute ">
                {searchData && searchData?.length > 0
                  ? searchData?.map((song) => (
                      <>
                        <div onClick={()=>showSongArtist(song)}
                          className={`flex items-center rounded-lg ${
                            searchData.length > 0 ? "block" : "hidden"
                          } px-10 py-3 bg-black hover:text-white cursor-pointer ${searchData?.length > 0 ? "block" : "hidden"}`}
                        >
                          <img src={song?.thumbnail} style={{height:"50px"}} className="rounded-lg"/>
                          <div className="flex flex-col justify-center text-md"><div className="ml-3">{song?.name}</div>
                          <div className="ml-3 text-sm">{song?.artist?.name}</div></div>
                        </div>
                      </>
                    ))
                  : ""}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="flex items-center mr-9">
          {owner ? (
            ""
          ) : (
            <div className="flex items-center">
              <Link to="/auth/register">
                <div className="text-white/[0.70] font-semibold text-md cursor-pointer">
                  Sign up
                </div>
              </Link>

              <Link to="/auth/login">
                <div className="rounded-full bg-white text-black font-semibold text-md px-8 py-3 ml-5 cursor-pointer">
                  Log in
                </div>
              </Link>
            </div>
          )}

          {owner ? (
            <div className="group flex flex-col relative">
              <div className="flex items-center justify-center bg-black rounded-full">
                <div className="ml-1 cursor-pointer rounded-full h-[40px] w-[40px] flex items-center justify-center bg-white/[0.15] text-white font-semibold text-md">
                  {email?.charAt(0).toUpperCase()}
                </div>
                <div className="cursor-pointer font-semibold text-md p-2">
                  {email}
                </div>
                <div className="cursor-pointer rounded-full h-[35px] w-[35px] flex items-center justify-center bg-black/[0.15] text-white">
                  <AiFillCaretDown size={15} color="white" />
                </div>
              </div>
              <div className="border-t-2 w-full text-md flex flex-col hidden group-hover:block absolute mt-10 px-30 bg-black text-white rounded">
                <div className="pt-3 pl-3 pb-3 flex items-center">
                  <div>
                    <CgProfile size={25} color="white" />
                  </div>
                  <div className="ml-3">
                    <Link to={`/${owner}/profile`}>Profile</Link>
                  </div>
                </div>
                <div className="pl-3 pb-3 flex items-center">
                  <div>
                    <BiLogOutCircle size={25} color="white" />
                  </div>
                  <div className="ml-3">
                    <Link to="/auth/logout">Logout</Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
