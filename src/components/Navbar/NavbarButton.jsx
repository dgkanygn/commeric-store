import React from "react";

export const NavbarButton = ({
  count,
  icon,
  label,
  onClick,
  isProfileButton,
  extraClass,
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`flex items-center bg-orange-100 gap-3 text-orange-500 cursor-pointer rounded p-3 hover:bg-orange-200 transition duration-200 ease-in-out ${extraClass}`}
      >
        <i className={`text-xl ${icon}`}></i>
        <p>
          <b>{isProfileButton ? label : count}</b>
        </p>
      </div>
    </>
  );
};
