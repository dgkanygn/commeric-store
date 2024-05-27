import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal } from "../../redux/modal";

export const CloseModalButton = () => {
  const states = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      <i
        onClick={() => dispatch(closeModal())}
        class="fa-solid fa-xmark bg-orange-100 p-2 rounded text-orange-400 cursor-pointer  hover:bg-orange-200 transition duration-200 ease-in-out"
      ></i>
    </>
  );
};
