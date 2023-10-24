import { useState } from "react";

const NormalButton = ({ title, loading,setButtonData,classname}) => {
    return (
    <div className={`flex items-center border border-solid border-white rounded-full ${classname}`}>
      <button
        className="bg-black text-white font-bold p-2 px-10 rounded-full"
        onClick={setButtonData}
      >
        {loading ? <img src={"../../images/loader.svg"} alt="" /> : title}
      </button>
    </div>
  );
};

export default NormalButton;
