import React from "react";

const PasswordInput = ({ label, placeholder, value, name, setInput }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label for="124">
        <span className="font-semibold text-md">{label}</span>
      </label>
      <input
        onChange={setInput}
        value={value}
        name={name}
        type="password"
        placeholder={placeholder}
        id="124"
        className="border border-gray-400 border-solid rounded placeholder-gray-400 p-3 placeholder:text-sm"
      />
    </div>
  );
};

export default PasswordInput;
