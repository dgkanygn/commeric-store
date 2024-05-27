import React from "react";
import { CloseModalButton } from "./CloseModalButton";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../redux/productSlice";
import { closeModal } from "../../redux/modal";

export const CategoryModal = () => {
  const dispatch = useDispatch();

  const categories = [
    {
      id: 0,
      label: "Akıllı Telefon",
      name: "smart-phone",
    },
    {
      id: 1,
      label: "Bilgisayar",
      name: "computer",
    },
    {
      id: 3,
      label: "TV",
      name: "tv",
    },
    {
      id: 4,
      label: "Kulaklık",
      name: "earphone",
    },
    {
      id: 5,
      label: "Oyun Konsolu",
      name: "game-console",
    },
    {
      id: 6,
      label: "Tablet",
      name: "tablet",
    },
    {
      id: 7,
      label: "Beyaz Eşya",
      name: "appliance",
    },
  ];

  const selectCategory = (category) => {
    dispatch(filterProducts({ category }));
    dispatch(closeModal());
  };

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg w-[900px]">
        <div className="flex justify-between items-center  bg-orange-400 p-4">
          <h1 className="text-white">
            <b>Kategoriler</b>
          </h1>
          <CloseModalButton />
        </div>
        <div className="overflow-y-scroll h-96 flex flex-col gap-4 p-4">
          {categories.map((category, index) => (
            <div
              onClick={() => selectCategory(category.label)}
              key={index}
              className="bg-orange-400 rounded p-4 text-white text-center"
            >
              {category.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
