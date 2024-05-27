import React from "react";

export const SelectFilter = ({ label, arr, name, formData, setFormData }) => {
  const handleChange = (e) => {
    const category = e.target.value;
    setFormData({ ...formData, category });
  };

  return (
    <>
      <div className="shadow-lg rounded">
        <div className="p-3 bg-gradient-to-r from-orange-300 to-orange-500 cursor-pointer text-white">
          <b>{label}</b>
        </div>
        <div className="bg-orange-100 p-2 flex gap-2">
          <select name={name} onChange={handleChange}>
            {arr.map((item, index) => (
              <option key={index} value={item.name}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
