import { createContext } from "react";

const songContext = createContext({
    currentSong:null,
    setCurrentSong:(currentSong)=>{},
    isPaused : null,
    setIsPaused:(isPaused)=>{},
    soundPlay:null,
    setSoundPlay:()=>{},
    songClicked:null,
    setSongClicked:()=>{},
    userInfo:null,
    setUserInfo:()=>{},
})

export default songContext;