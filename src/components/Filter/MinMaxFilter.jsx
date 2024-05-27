import React, { useState, useRef } from "react";

export const MinMaxFilter = ({ label, setFormData, formData }) => {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, price: e.target.value }));
  };

  const handleFocus = () => {
    inputRef.current.select();
  };

  const handleBlur = (e) => {
    if (e.target.value === "") setFormData((prev) => ({ ...prev, price: 0 }));
  };

  return (
    <>
      <div className="shadow-lg rounded">
        <div className="p-3 bg-gradient-to-r from-orange-300 to-orange-500 cursor-pointer text-white">
          <b>{label}</b>
        </div>
        <div className="bg-orange-100 p-2 flex gap-2">
          <input
            className="p-3 max-w-[100px] border-2 border-solid border-orange-200 rounded"
            type="number"
            value={formData.price}
            placeholder="max"
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
            min="0"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};
