import React from "react";

export const SearchBox = () => {
  return (
    <>
      <div className="bg-gray-100 py-1.5 px-3 rounded md:flex gap-2 items-center hidden">
        <input
          placeholder="Ürün ara..."
          className="bg-gray-100 outline-none max-w-96"
          type="text"
        />
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </>
  );
};
