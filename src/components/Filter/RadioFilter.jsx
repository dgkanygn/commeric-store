import React, { useState } from "react";

export const RadioFilter = ({ label, arr, setFormData, formData }) => {
  const [selectedOption, setSelectedOption] = useState(false);

  const handleChange = (event) => {
    // setSelectedOption(event.target.value === "true");

    setFormData((prev) => ({
      ...prev,
      isSecondHand: event.target.value === "true",
    }));
  };

  return (
    <div>
      <div className="shadow-lg rounded">
        <div className="p-3 bg-gradient-to-r from-orange-300 to-orange-500 cursor-pointer text-white">
          <b>{label}</b>
        </div>
        <div className="bg-orange-100 p-2 flex flex-col gap-2">
          <label className="flex items-center gap-2 p-1">
            <input
              type="radio"
              value="true"
              checked={formData.isSecondHand === true}
              onChange={handleChange}
            />
            Var
          </label>
          <label className="flex items-center gap-2 p-1">
            <input
              type="radio"
              value="false"
              checked={formData.isSecondHand === false}
              onChange={handleChange}
            />
            Yok
          </label>
        </div>
      </div>
    </div>
  );
};
