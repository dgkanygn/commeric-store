import React from "react";

// component
import { Button } from "../../Button";
import toast from "react-hot-toast";

// redux
import { useDispatch, useSelector } from "react-redux";
import { toggleProduct as addShoppingCart } from "../../../redux/shoppingCartSlice";
import { openModal } from "../../../redux/modal";
import { defineConfirmModal } from "../../../redux/confirmModalSlice";

export const ProductDetails = ({
  brand,
  model,
  category,
  price,
  isSecondHand,
  description,
  seller,
  id,
  isSold,
}) => {
  const dispatch = useDispatch();

  const { user, isLogin } = useSelector((state) => state.authSlice);

  const isOwner = user?.displayName === seller;

  const isShowButton = isOwner && isLogin;

  const toggleShoppingCart = () => {
    dispatch(addShoppingCart({ id, brand, model, price }));
    toast.success("İşlem başarıyla gerçekleştirildi");
  };

  const deleteProduct = () => {
    dispatch(openModal("confirm"));
    dispatch(
      defineConfirmModal({
        transaction: "Bu ürün silinecek",
        label: "Ürünü silmek istediğine emin misin?",
        process: "DELETE_PRODUCT",
        id: id,
      })
    );
  };

  return (
    <div>
      <div className="bg-white shadow-lg p-4 flex flex-col gap-8">
        <h1 className="md:text-3xl">
          <b>{brand + " " + model}</b>
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-orange-100 border-2 border-orange-200 p-2 flex justify-between gap-4">
            <h1>Fiyat</h1>
            <h1>
              <b>{price} TL</b>
            </h1>
          </div>
          <div className="bg-orange-100 border-2 border-orange-200 p-2 flex justify-between gap-4">
            <h1>Kategori</h1>
            <h1>
              <b>{category}</b>
            </h1>
          </div>
          <div className="bg-orange-100 border-2 border-orange-200 p-2 flex justify-between gap-4">
            <h1>Parça Değişimi</h1>
            <h1>
              <b>{isSecondHand ? "Var" : "Yok"}</b>
            </h1>
          </div>
        </div>
        <div>
          <p>
            <b>{seller}</b> bu ürünü satışa koydu.
          </p>
        </div>
        <p className="text-sm md:text-base">{description}</p>
        <div className="flex gap-2">
          {!isSold ? (
            <>
              <Button onClick={toggleShoppingCart} label={"Sepete Ekle"} />
            </>
          ) : (
            <p className="bg-orange-100 p-2">
              <b>Bu ürün artık satılık değil.</b>
            </p>
          )}
          {isShowButton && (
            <Button onClick={deleteProduct} label={"Ürünü Sil"} />
          )}
        </div>
      </div>
    </div>
  );
};
