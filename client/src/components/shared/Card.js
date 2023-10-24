import React from "react";

const Card = ({title,subtitle,img,cardClick}) => {
  return (
    <>
      <div className="flex" onClick={cardClick}>
        <div className="m-1 p-1 bg-black/[0.15] rounded-md cursor-pointer hover:bg-black/[0.25]">
          <img src={img} alt="" className="rounded-[20px] p-1 h-[150px] w-[150px]"/>
          <div className="text-white text-md pl-4">{title}</div>
          <div className="text-gray-500 text-md pl-4">{subtitle}</div>
        </div>
      </div>
    </>
  );
};

export default Card;
