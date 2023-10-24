import React from "react";

const Button = ({title,submitData,loading}) => {
  return (
    <div className="flex items-center justify-end my-5 w-full">
          <button className="bg-green-400 font-bold p-3 px-8 rounded-full" onClick={submitData}>
            {loading ? <img src={"../../images/loader.svg"} alt="" /> : title}
          </button>
        </div>
  );
};

export default Button;
