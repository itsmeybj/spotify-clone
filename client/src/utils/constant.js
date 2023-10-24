import React from "react";

import { AiFillHome,AiOutlineSetting} from "react-icons/ai";
import {BsSearch,BsFillPlusSquareFill} from "react-icons/bs"
import {LuLibrary} from "react-icons/lu";
import {FcLike} from "react-icons/fc";
import {RiSlideshow4Line} from "react-icons/ri"
export const fcategories_user = [
    { name: "Home", icon: <AiFillHome />,url:"" },
    { name: "Playlist", icon: <BsFillPlusSquareFill />,url:"/user/create-playlist" },
    { name: "Show Playlist", icon: <RiSlideshow4Line />,url:"/user/show-playlist" },
    { name: "Liked Songs", icon: <FcLike color="black" />,url:"/user/like-songs" },
];
export const scategories_user = [
    { name: "Search", icon: <BsSearch />,url:"/user/search" },
    { name: "Your Library", icon: <LuLibrary />,url:"/user/library" },
];

export const fcategories_admin = [
    { name: "Home", icon: <AiFillHome />,url:"/admin/dashboard" },
    { name: "Users", icon: <BsSearch />,url:"/admin/show-users" },
];

export const scategories_admin = [
    { name: "Block/Unblock Artist", icon: <FcLike color="black" />,url:"#" },
];

export const fcategories_artist = [
    { name: "Home", icon: <AiFillHome />,url:"/artist/dashboard" },
    { name: "Upload Song", icon: <BsSearch />,url:"/artist/upload-song" },
];

export const scategories_artist = [
    { name: "Settings", icon: <AiOutlineSetting />,url:"/" },
];

export const cards_data = [
    { title: "Today`s Top Hits", subtitle : "Bad Bunny on the top Hottest 50!", img: "./images/1.jpg" },
    { title: "Peacful Piano Hits", subtitle : "Relax and with beautiful piano", img: "./images/2.jpg" },
    { title: "Deep Focus", subtitle : "Keep calm and deep foucs", img: "./images/3.jpg" },
    { title: "Instrumental Studey", subtitle : "Focus with soft study", img: "./images/4.jpg" },
    { title: "Today`s Top Hits", subtitle : "Bad Bunny on the top Hottest 50!", img: "./images/5.jpg" },
]