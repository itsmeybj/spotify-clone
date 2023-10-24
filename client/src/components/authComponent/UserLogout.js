import React, { useContext, useEffect } from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import songContext from '../../contexts/SongContext'

const UserLogout = () => {
  const navigate = useNavigate()
  const {userInfo,setUserInfo,currentSong,setCurrentSong,setIsPaused,setSoundPlay} = useContext(songContext)
  

  useEffect(()=>{
    Cookies.remove("email")
    Cookies.remove("jwtSpotifyToken")
    Cookies.remove("owner")
    setUserInfo(null)
    setCurrentSong("")
    setIsPaused(true)
    setSoundPlay(null)
    //localStorage.clear()
    
    navigate("/")  

    window.location.reload();

  })
  return (
    <h1>UserLogout</h1>
  )
}

export default UserLogout