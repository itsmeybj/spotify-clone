import React, { useState } from "react";
import Cookies from "js-cookie";

import { IoEarthOutline } from "react-icons/io5";
import white_logo from "../../images/white_logo.svg";
import LeftNavMenuItems from "../shared/LeftNavMenuItems";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";

import { MdLanguage } from "react-icons/md";
import { BiSolidLogIn } from "react-icons/bi";

const LeftNav = ({ fcategories, scategories }) => {
  const [open, setOpen] = useState(false);
  const [openLogedInDialogMessage, setOpenLogedInDialogMessage] =
    useState(false);

  const [selectCategories, setSelectCategories] = useState("Home");

  const navigate = useNavigate();

  const owner = Cookies.get("owner");

  const clickHandler = (name, url) => {
    if (owner) {
      switch (name) {
        case name:
          setSelectCategories(name);
        default:
          break;
      }

      navigate(url);
    } else {
      //alert("pls loged in first");
      setOpenLogedInDialogMessage(true);
    }
  };
  return (
    <>
      <Modal
        open={openLogedInDialogMessage}
        onClose={() => setOpenLogedInDialogMessage(false)}
      >
        <div className="bg-white">
          <div className="text-center w-56">
            <BiSolidLogIn size={40} className="mx-auto text-red-500" />
            <div className={`mx-auto my-4 w-48`}>
              <h3 className="text-lg font-semibold text-gray-800">
                Authenticate First
              </h3>
              <p className="text-sm text-gray-500">
                Experience Music Sign-In First
              </p>
            </div>
            <div className={`block flex gap-4`}>
              <button
                className="text-black font-semibold bg-white shadow-md w-full rounded-lg p-2"
                onClick={() => setOpenLogedInDialogMessage(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        classname="bg-black border border-solid border-white"
      >
        <div className="bg-black mx-auto text-md">
          <div className="text-center w-56">
            <MdLanguage size={35} className="mx-auto text-gray-500" />
            <div className="flex my-4 items-center justify-center text-gray-500  ">
              <div className="mr-3 hover:cursor-pointer hover:text-white">
                मराठी
              </div>
              <div className="mr-3 hover:cursor-pointer hover:text-white">
                हिंदी
              </div>
              <div className="mr-3 hover:cursor-pointer hover:text-white">
                ENGLISH
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* left side bar */}
      <div className="mt-2 ml-2 w-[18%] flex flex-col pb-1">
        <div className="h-full flex flex-col">
          <div className="h-fit px-5 bg-white/[0.1] rounded-lg pb-5">
            {/* top logo */}
            <Link to="/user">
              <img src={white_logo} alt="" width={120} className="py-6" />
            </Link>

            {/* top 1st menu */}
            {fcategories.map((item) => {
              return (
                <React.Fragment key={item.name}>
                  <LeftNavMenuItems
                    text={item.name}
                    icon={item.icon}
                    action={() => {
                      clickHandler(item.name, item.url);
                    }}
                    className={`${
                      selectCategories === item.name ? "bg-white/[0.15]" : ""
                    }`}
                  />
                </React.Fragment>
              );
            })}
          </div>

          {/* second menu */}
          <div className="h-3/4 px-5 pt-5 mt-2 bg-white/[0.1] rounded-lg flex flex-col justify-between">
            <div>
              {scategories.map((item) => {
                return (
                  <React.Fragment key={item.name}>
                    <LeftNavMenuItems
                      text={item.name}
                      icon={item.icon}
                      action={() => {
                        clickHandler(item.name, item.url);
                      }}
                      className={`${
                        selectCategories === item.name ? "bg-white/[0.15]" : ""
                      }`}
                    />
                  </React.Fragment>
                );
              })}
            </div>

            {/* left menu bottom language change option  */}
            <div className="flex flex-col justify-end">
              <div className="text-white/[0.4] text-sm mb-7">
                <span className="mx-2">Legal</span>
                <span className="mx-2">Policy</span>
                <span className="mx-1">Cookie</span>
              </div>

              <div
                onClick={() => setOpen(true)}
                className="mb-3 cursor-pointer border border-gray-300 text-white flex rounded-full items-center justify-center py-2 w-2/6"
              >
                <IoEarthOutline size={25} className="ml-2" />
                <div className="ml-1 mr-1 text-sm font-semibold">English</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftNav;
