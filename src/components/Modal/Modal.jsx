import React from "react";

// react-redux
import { useSelector } from "react-redux";

// modals
import { LoginModal } from "./LoginModal";
import { FilterModal } from "./FilterModal";
import { CategoryModal } from "./CategoryModal";
import { ProfileModal } from "./ProfileModal";
import { RegisterModal } from "./RegisterModal";
import { ShoppingCartModal } from "./ShoppingCartModal";
import { WishListModal } from "./WishListModal";
import { AddNewProduct } from "./AddNewProduct";
import { PaymentModal } from "./PaymentModal";
import { ConfirmModal } from "./ConfirmModal";

export const Modal = () => {
  const modalArr = [
    {
      name: "login",
      element: <LoginModal />,
    },
    {
      name: "register",
      element: <RegisterModal />,
    },
    {
      name: "category",
      element: <CategoryModal />,
    },
    {
      name: "filter",
      element: <FilterModal />,
    },
    {
      name: "profile",
      element: <ProfileModal />,
    },
    {
      name: "shopping-cart",
      element: <ShoppingCartModal />,
    },
    {
      name: "wish-list",
      element: <WishListModal />,
    },
    {
      name: "add-product",
      element: <AddNewProduct />,
    },
    {
      name: "payment",
      element: <PaymentModal />,
    },
    {
      name: "confirm",
      element: <ConfirmModal />,
    },
  ];

  const states = useSelector((state) => state.modal);

  let modalElement = null;

  modalArr.forEach((item) => {
    if (item.name === states.modalName) {
      modalElement = item.element;
    }
  });

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto bg-orange-400 bg-opacity-30 flex items-center justify-center p-5 md:p-0">
        {modalElement}
      </div>
    </>
  );
};
