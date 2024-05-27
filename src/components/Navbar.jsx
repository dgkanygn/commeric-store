import React, { useState } from "react";

// router
import { Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";

// reducers
import { openModal } from "../redux/modal";

// component
import { Button } from "./Button";
import { SearchBox } from "./Navbar/SearchBox";
import { NavbarButton } from "./Navbar/NavbarButton";

export const Navbar = () => {
  const { isLogin, user } = useSelector((state) => state.authSlice);

  const shoppingCardState = useSelector((state) => state.shoppingCartSlice);
  const shoppningCartList = shoppingCardState.products;

  const wishListState = useSelector((state) => state.wishListSlice);
  const wishList = wishListState.products;

  let shoppingCartCount = shoppningCartList.length;
  let wishListCount = wishList.length;

  const dispatch = useDispatch();

  return (
    <>
      <div className="shadow-lg bg-white">
        <div className="container mx-auto max-w-[1300px] px-2 py-5">
          <div className="flex justify-between items-center ">
            <Link to={"/"}>
              <h1 className="text-2xl cursor-pointer">
                Commeric<b>Store</b>
              </h1>
            </Link>
            <div className="md:flex gap-5 hidden">
              <SearchBox />
              <NavbarButton
                count={shoppingCartCount}
                icon={"fa-solid fa-basket-shopping"}
                onClick={() => dispatch(openModal("shopping-cart"))}
              />
              {/* <NavbarButton
                count={wishListCount}
                icon={"fa-solid fa-heart"}
                onClick={() => dispatch(openModal("wish-list"))}
              /> */}
              {isLogin ? (
                <NavbarButton
                  isProfileButton={true}
                  icon={"fa-solid fa-user"}
                  label={user.displayName}
                  onClick={() => dispatch(openModal("profile"))}
                />
              ) : (
                <Button
                  onClick={() => dispatch(openModal("login"))}
                  label={"Giriş Yap"}
                  extraClass={"flex items-center"}
                />
              )}
            </div>

            <NavbarButton
              count={shoppingCartCount}
              icon={"fa-solid fa-basket-shopping"}
              onClick={() => dispatch(openModal("shopping-cart"))}
              extraClass={"flex md:hidden"}
            />

            <div
              onClick={() => dispatch(openModal(isLogin ? "profile" : "login"))}
              className="text-orange-500 cursor-pointer rounded p-3 hover:bg-gray-100 md:hidden"
            >
              <i className="fa-solid fa-user text-xl "></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
