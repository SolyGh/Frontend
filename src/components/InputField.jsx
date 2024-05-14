import React, { useState } from "react";

const InputField = ({ id, label, type, value, setValue, placeholder, error, setError }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim() === "") {
      setError("This field is required.");
    } else {
      setError("");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default InputField;
