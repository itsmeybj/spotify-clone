import React from "react";

const TextInput = ({
  label,
  placeholder,
  classname,
  value,
  name,
  setInput,
  setNewName
}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${classname}`}>
      <label for="124">
        <span className="font-semibold text-md">{label}</span>
      </label>
      <input
        onKeyUp={setNewName}
        onChange={setInput}
        value={value}
        name={name}
        type="text"
        placeholder={placeholder}
        id="124"
        className="text-black border border-gray-400 border-solid rounded placeholder-gray-400 p-3 placeholder:text-sm"
      />
    </div>
  );
};

export default TextInput;
