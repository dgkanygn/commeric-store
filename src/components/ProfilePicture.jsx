import React from "react";

import profilePicture from "../assets/blank.png";

export const ProfilePicture = () => {
  return (
    <>
      <img
        className="w-10 h-10 object-cover rounded-full"
        src={profilePicture}
      />
    </>
  );
};
