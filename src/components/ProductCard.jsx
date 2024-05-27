import React from "react";
import { Link } from "react-router-dom";

import { toggleProduct as addShoppingCart } from "../redux/shoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const ProductCard = ({
  id,
  brand,
  model,
  imageUrls,
  price,
  seller,
  userDocId,
  isSold,
}) => {
  const dispatch = useDispatch();

  const { otherUserData } = useSelector((state) => state.authSlice);

  const toggleShoppingCart = async () => {
    if (!isSold) {
      const product = {
        id,
        brand,
        model,
        imageUrls,
        price,
        seller,
        userDocId,
      };

      dispatch(addShoppingCart(product));
      toast.success("İşlem başarıyla gerçekleştirildi");

      const docRef = doc(db, "users", otherUserData.id);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      let shoppingCart = docData.shoppingCart;
      shoppingCart.push(product);
      await updateDoc(docRef, { shoppingCart });
    } else toast.error("Bu ürün satıldı.");
  };

  return (
    <>
      <div className="flex flex-col justify-between rounded-lg p-4 border-2 border-orange-100 bg-white md:w-56 ">
        <div className="flex items-center justify-between">
          {/* <i
            className="fa-solid fa-heart text-orange-500 cursor-pointer rounded p-2 text-lg hover:bg-gray-100"
            onClick={toggleWishList}
          ></i> */}
          {/* <i
            className="fa-solid fa-basket-shopping text-orange-500 cursor-pointer rounded p-2 text-lg hover:bg-gray-100"
            onClick={toggleShoppingCart}
          ></i> */}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <Link to={`/product/${id}`}>
              <img
                className="h-20 w-20 md:w-52 md:h-52 object-cover"
                src={imageUrls}
                alt="product"
              />
            </Link>
            <p>{brand + " " + model}</p>
          </div>
          <div className="flex justify-center gap-5 items-center">
            <div className="flex items-center justify-center gap-1 text-orange-500 bg-orange-100 p-2 px-5 rounded">
              {!isSold ? (
                <p className="font-bold ">{price} TL</p>
              ) : (
                <p>
                  <b>Satıldı</b>
                </p>
              )}
            </div>
            {!isSold && (
              <i
                className="fa-solid fa-basket-shopping text-orange-500 cursor-pointer rounded p-2 text-lg hover:bg-gray-100"
                onClick={toggleShoppingCart}
              ></i>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
