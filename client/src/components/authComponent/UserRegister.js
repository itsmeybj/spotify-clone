import React, { useState } from "react";
import logo from "../../images/black_logo.svg";
import TextInput from "../shared/TextInput";
import PasswordInput from "../shared/PasswordInput";
import Button from "../shared/Button";
import { Link, Navigate, useNavigate,Router, redirect } from "react-router-dom";
import { authUserApiDataToServer } from "../../utils/api";
import { Toast } from "../shared/Toast";
import Cookies from "js-cookie"

const UserRegister = () => {
  
  const navigate = useNavigate()

  const linkName = Cookies.get("link")

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [loading, setLoading] = useState();

  const setInputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const formSubmit = async () => {
    setLoading(true);
    if(linkName==="Artist"){
      data.isArtist=true
    }
    else if(linkName ==="Admin"){
      data.isAdmin=true
    }
   
    const result = await authUserApiDataToServer("user/register", data);
    if (result.status) {
      setLoading(false);
      Toast(
        result.status,
        "Sing Up successfully! your will be redirected to Sing In page"
      );

      setData({
        email: "",
        password: "",
        name: "",
      });

      //Cookies.remove("link")

      setTimeout(() => {        
       navigate("/auth/login")
      }, 3000);
    } else {
      setLoading(false);
      Toast(result.status,result.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full border-b border-solid border-gray-200 p-2 flex justify-center">
        <img src={logo} alt="" width={135} />
      </div>
      <div className="inputRegion w-1/4 py-6 flex flex-col items-center justify-center">
        <div className="text-xl font-bold mb-2">
          Sign up for free to start listening
        </div>
        <TextInput
          label="What`s your email"
          placeholder="Enter your email"
          classname="my-3"
          name="email"
          value={data.email}
          setInput={setInputData}
        />
        
        <TextInput
          label="What should we call you?"
          placeholder="Enter a profile name"
          classname="my-2"
          name="name"
          value={data.name}
          setInput={setInputData}
        />
        <PasswordInput
          label="Create a password"
          placeholder="Creat a password"
          name="password"
          classname="my-3"
          value={data.password}
          setInput={setInputData}
        />
        <Button title="SIGN UP" submitData={formSubmit} loading={loading} />
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-3 font-semibold text-md">Already have an account?</div>

        <Link to="/auth/login " className="w-full">
          <div className="border border-gray-400 text-gray-500 flex items-center justify-center rounded-full py-3 font-bold text-sm">
            LOG IN INSTEAD
          </div>
        </Link>
        <span className="text-xl font-semibold ml-2 mt-1 underline hover:cursor-pointer" onClick={()=>{navigate("/")}}>Home</span>
      </div>
    </div>
  );
};

export default UserRegister;
