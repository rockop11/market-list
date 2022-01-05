import React from "react";

const Input = ({ type, placeholder, onChange, className, inputRef}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        autoComplete="off"
        ref={inputRef}
      />
    </>
  );
};

export default Input;
