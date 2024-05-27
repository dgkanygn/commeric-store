import React from "react";

export const HeaderBanner = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-orange-300 to-orange-500 p-10 rounded-lg">
        <div className="flex flex-col gap-2 md:gap-7">
          <h1 className="md:text-3xl text-lg">
            Commeric<b>Store</b>
          </h1>
          <p className="md:text-lg text-lg">Uygun Fiyatlı Online Alışveriş</p>
        </div>
      </div>
    </>
  );
};
