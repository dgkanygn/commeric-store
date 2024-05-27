import React from "react";

import { Oval } from "react-loader-spinner";

export const Button = ({ label, onClick, type, isLoading, extraClass }) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`${
          isLoading ? "bg-orange-200" : "bg-orange-400 hover:bg-orange-500"
        }  text-white rounded p-2 font-bold text-center   transition duration-200 ease-in-out ${extraClass}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <Oval
            height={20}
            width={20}
            color="white"
            secondaryColor="lightblue"
            strokeWidth={5}
          />
        ) : (
          <p>{label}</p>
        )}
      </button>
    </>
  );
};
