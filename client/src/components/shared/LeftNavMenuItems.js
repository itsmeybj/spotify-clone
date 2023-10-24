import react from "react";

const LeftNavMenuItems = ({ text, icon, className, action }) => {
  return (
    <div
      className={
        "text-white cursor-pointer h-10 flex items-center px-1 py-8 mb-[1px] rounded-lg hover:bg-white/[0.14] " +
        className
      }
      onClick={action}
    >
      <span className="text-2xl mr-6 ">{icon}</span>
      <span className="text-lg">{text}</span>
    </div>
  );
};

export default LeftNavMenuItems;
