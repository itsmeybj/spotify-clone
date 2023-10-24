import React, { useContext, useEffect, useState } from 'react'
import Cookies from "js-cookie"
import songContext from '../../contexts/SongContext'
import { BsTrash } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'
import { deleteUserApi } from '../../utils/api'


const UserProfile = () => {
  const navigate = useNavigate()
    const owner = Cookies.get("owner")
    const [loading, setLoading] = useState();
    const {userInfo,setUserInfo} = useContext(songContext)
    const [open, setOpen] = useState(false)
    const [flag,setFlag] = useState(false)
    const [status,setStatus] = useState()
    
    useEffect(()=>{
        if(!userInfo) alert("user info is set inside context api, after page refresh data loss, thats why may be data is not shown here.")
        //console.log(userInfo)
    }) 
    const dialogClose=()=>{
      setOpen(false)
      setFlag(false)
      setStatus(false)
//      navigate("artist/dashboard")   
    }
    const deleteUser=async()=>{
      console.log(userInfo)
      //alert(deleteState)
      setLoading(true);
      let result;
      
      const data = {"artistId" : userInfo.id}
      result = await deleteUserApi("user/delete-user",data);
            
      console.log(result);
      if (result.status) {
        setFlag(true)
        //setSongs(result.data);
        setLoading(false);
        setStatus(result.message)
      } else {
        setFlag(true)
        setLoading(false);
        setStatus(result.message)
      }
  
      setTimeout(() => {         
        setFlag(false)
        setStatus("")
        setOpen(false)  
        Cookies.remove("email")
    Cookies.remove("jwtSpotifyToken")
    Cookies.remove("owner")
    setUserInfo(null)
    
    navigate("/") 
        //navigate("/dashboard")   
      }, 2000);
  
    }
  return (
    <>
  <Modal open={open} onClose={()=>dialogClose()}>
        <div className="font-bold bg-white text-2xl">
          <div className="text-center w-56">
            <BsTrash size={56} className="mx-auto text-red-500"/>
            <div className={`${flag ? "block" : "hidden"} mx-auto my-4 w-48`}>
              <h3 className="text-lg font-black text-gray-800">{status}</h3>
            </div>
            <div className={`${flag ? "hidden" : "block"} mx-auto my-4 w-48`}>
              <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
              <p className="text-sm text-gray-500">Are you sure you want to delete Account?</p>
            </div>
            <div className={`${flag ? "hidden" : "block"} flex gap-4`}>
              <button onClick={deleteUser} className="text-white font-semibold bg-red-500 w-full shadow-md rounded-lg p-2">{loading ? <img src={"../../images/loader.svg"} alt="" style={{color:"red",marginLeft:"30px"}} />  : "Delete"}</button>
              <button className="text-black font-semibold bg-white shadow-md w-full rounded-lg p-2" onClick={()=>setOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>
    <div className="flex flex-col font-semibold text-gray-200 p-7 ">
        <div className="text-xl">{owner === "artist" ? "Artist Profile" : owner === "admin" ? "Admin Profile" : "User Profile"}</div>
        <div className='flex items-center justify-between mt-5 bg-white/[0.15] p-4 w-full hover:bg-white/[0.20]'>
            <div className='flex text-md '>
                <div className='mr-8'>{userInfo?.name}</div>
            <div>{userInfo?.email}</div>
            </div>
            <div className="flex items-center justify-center">
                <div className="m-2 hover:cursor-pointer">
                  <BsTrash onClick={()=>setOpen(true)} color="white" size={20} />
                </div>
                <div className="m-2 hover:cursor-pointer">
                  <BiEdit onClick={()=>{navigate(`/${owner}/profile-update`,{state:{userInfo}})}} color="white" size={20} />
                  
                </div>
              </div>

        </div>
    </div>
    </>
     )
     
}

export default UserProfile