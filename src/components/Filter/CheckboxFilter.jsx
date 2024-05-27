import React, { useState } from "react";

export const CheckboxFilter = ({ label, arr, setFormData, formData }) => {
  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData((prev) => ({ ...prev, category: [...prev.category, value] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        category: prev.category.filter((category) => category !== value),
      }));
    }
  };

  return (
    <>
      <div className="shadow-lg rounded">
        <div className="p-3 bg-gradient-to-r from-orange-300 to-orange-500 cursor-pointer text-white">
          <b>{label}</b>
        </div>
        <div className="bg-orange-100 p-2 flex flex-col gap-2 overflow-x-auto custom-scrollbar h-36">
          {arr.map((item, index) => (
            <label key={index} className="flex items-center gap-2 p-1">
              <input
                type="checkbox"
                value={item.label}
                checked={formData.category.includes(item.label)}
                onChange={handleChange}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
