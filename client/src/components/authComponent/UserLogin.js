import React, { useContext, useState } from "react";
import logo from "../../images/black_logo.svg"
import TextInput from "../shared/TextInput";
import PasswordInput from "../shared/PasswordInput";
import Button from "../shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { authUserApiDataToServer } from "../../utils/api";
import { Toast } from "../shared/Toast";
import Cookies from "js-cookie"
import songContext from "../../contexts/SongContext";
import NormalButton from "../shared/NormalButton";

const UserLogin = () => {

  const navigate = useNavigate()

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState();
  const {userInfo,setUserInfo} = useContext(songContext)

  const setInputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const formSubmit = async () => {
    setLoading(true);
    console.log(data)
    const result = await authUserApiDataToServer("user/login", data);
    if (result.status) {
      Cookies.set("email",result.data.email)
      setUserInfo(result.data)
      Toast(result.status,"Sing In successfully! your will be redirected to Home page")
      setData({
        email: "",
        password: "",
      });
      //Cookies.remove("link")
      setTimeout(() => {
        const owner = Cookies.get("owner")
        if(owner ==="artist"){
          navigate("/artist")
        }else if(owner === "admin"){
          navigate("/admin")
        }else if(owner === "user"){
          navigate("/user")
        }
      }, 2000);
      setLoading(false);
    } else {
      setLoading(false);
      Toast(result.status,result.message);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full border-b border-solid border-gray-200 p-5 flex justify-center">
        <img src={logo} alt="" width={135} />
      </div>
      <div className="inputRegion w-1/4 py-8 flex flex-col items-center justify-center">
        <div className="text-xl font-bold mb-3">
          To continue, log in to Spotify
        </div>
        <TextInput
          label="Email address or username"
          placeholder="Email address or username"
          classname="my-6"
          name="email"
          value={data.email}
          setInput={setInputData}
        />
        <PasswordInput
          label="Password"
          placeholder="password"
          name="password"
          value={data.password}
          setInput={setInputData}
        />
        <Button title="LOG IN" submitData={formSubmit} loading={loading} />
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-md">Don`t have an account?</div>
        <Link to="/auth/register " className="w-full">
          <div className="border border-gray-400 text-gray-500 flex items-center justify-center rounded-full py-3 font-bold text-md">
            SIGN UP FOR SPOTIFY
          </div>
        </Link>
        <span className="text-xl font-semibold ml-2 mt-2 underline hover:cursor-pointer" onClick={()=>{navigate("/")}}>Home</span>
      </div>
    </div>
  );
};

export default UserLogin;
