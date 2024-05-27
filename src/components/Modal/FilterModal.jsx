import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../redux/productSlice";
import { closeModal } from "../../redux/modal";
import { CloseModalButton } from "./CloseModalButton";

export const FilterModal = () => {
  const dispatch = useDispatch();

  const categories = [
    {
      id: 0,
      label: "Akıllı Telefon",
      value: "smart-phone",
    },
    {
      id: 1,
      label: "Bilgisayar",
      value: "computer",
    },
    {
      id: 3,
      label: "TV",
      value: "tv",
    },
    {
      id: 4,
      label: "Kulaklık",
      value: "earphone",
    },
    {
      id: 5,
      label: "Oyun Konsolu",
      value: "game-console",
    },
    {
      id: 6,
      label: "Tablet",
      value: "tablet",
    },
    {
      id: 7,
      label: "Beyaz Eşya",
      value: "appliance",
    },
  ];

  const [formData, setFormData] = useState({
    isSecondHand: false,
    price: 0,
    category: [],
  });

  const handleCheckboxChange = (value) => {
    const updatedCategories = formData.category.includes(value)
      ? formData.category.filter((category) => category !== value)
      : [...formData.category, value];
    setFormData({ ...formData, category: updatedCategories });
  };

  const handleRadioChange = (value) => {
    setFormData({ ...formData, isSecondHand: value });
  };

  const handleInputChange = (e) => {
    const price = parseInt(e.target.value);
    setFormData({ ...formData, price });
  };

  const handleSubmit = () => {
    console.log(formData);
    dispatch(filterProducts(formData));
    dispatch(closeModal());
  };

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg w-[900px]">
        <div className="flex justify-between items-center  bg-orange-400 p-4">
          <h1 className="text-white">
            <b>Filtrele</b>
          </h1>
          <CloseModalButton />
        </div>

        <div className="flex flex-col p-2 gap-2">
          <div className="bg-orange-100 p-2 flex flex-col gap-2 ">
            <p>Kategori</p>
            <div className="flex flex-col gap-2 p-1 overflow-x-auto custom-scrollbar h-36">
              {categories.map((category) => (
                <label key={category.id} className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    value={category.label}
                    checked={formData.category.includes(category.label)}
                    onChange={() => handleCheckboxChange(category.label)}
                  />
                  {category.label}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-orange-100 p-2 flex flex-col gap-2">
            <p>Parça Değişimi</p>
            <div className="flex items-center gap-2 p-1">
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  value={true}
                  checked={formData.isSecondHand === true}
                  onClick={() => handleRadioChange(true)}
                />
                Var
              </label>
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  value={false}
                  checked={formData.isSecondHand === false}
                  onClick={() => handleRadioChange(false)}
                />
                Yok
              </label>
            </div>
          </div>

          <input
            className="bg-orange-100 p-2 rounded"
            name="fiyat"
            placeholder="Fiyat"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            onFocus={(e) => e.target.select()}
          />

          <button
            onClick={handleSubmit}
            className="bg-orange-400 rounded text-white p-2"
          >
            Filtrele
          </button>
        </div>
      </div>
    </>
  );
};
