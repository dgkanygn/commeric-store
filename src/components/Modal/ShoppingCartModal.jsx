import React from "react";
import { useSelector, useDispatch } from "react-redux";

// component
import toast from "react-hot-toast";
import { Button } from "../Button";

// firebase
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// redux
import { clearProducts, removeProduct } from "../../redux/shoppingCartSlice";
import { openModal } from "../../redux/modal";
import { CloseModalButton } from "./CloseModalButton";
import { defineConfirmModal } from "../../redux/confirmModalSlice";

export const ShoppingCartModal = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.shoppingCartSlice);
  const { isLogin, balance, user, otherUserData } = useSelector(
    (state) => state.authSlice
  );

  let productCount = products.length;

  const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0
  );

  const clearShoppingCart = async () => {
    if (products.length > 0) {
      dispatch(clearProducts());

      const docRef = doc(db, "users", otherUserData.id);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      let shoppingCart = docData.shoppingCart;
      shoppingCart = [];
      await updateDoc(docRef, { shoppingCart });

      toast.success("Sepet boşaltıldı.");
    } else {
      toast.error("Sepet zaten boş.");
    }
  };

  const RemoveProduct = async (productId) => {
    dispatch(removeProduct(productId));
    const docRef = doc(db, "users", otherUserData.id);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    let shoppingCart = docData.shoppingCart;
    const updated = shoppingCart.filter((i) => i.id !== productId);
    await updateDoc(docRef, { shoppingCart: updated });
  };

  const beginPayment = () => {
    if (isLogin) {
      if (balance > totalPrice) {
        if (products.length > 0) {
          const sellerPriceArr = products.map((product) => {
            return {
              productDocId: product.id,
              user: product.userDocId,
              amount: product.price,
              type: "seller",
            };
          });

          sellerPriceArr.push({
            user: otherUserData.id,
            amount: totalPrice,
            type: "buyer",
          });
          dispatch(openModal("confirm"));
          dispatch(
            defineConfirmModal({
              transaction: "Satın alma işlemi",
              label: `Bu satın almayı onaylıyor musunuz? Hesabınızdan ${totalPrice} TL eksilecek.`,
              process: "PURCHASING",
              id: sellerPriceArr,
            })
          );
        } else {
          toast.error("Sepet boş.");
        }
      } else {
        toast.error("Cüzdanda yeterli miktarda para yok.");
      }
    } else {
      toast.error("Ödeme işlemi için giriş yapmalısınız.");
    }
  };

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg w-[500px]">
        <div className="flex justify-between items-center  bg-orange-400 p-4">
          <h1 className="text-white">
            <b>Sepet</b>
          </h1>
          <CloseModalButton />
        </div>
        <div className="flex flex-col p-3 gap-5">
          <div className="flex flex-col gap-2">
            <div className="bg-orange-100 rounded p-5 flex flex-col gap-6 md:justify-between md:flex-row">
              <div className="flex flex-col gap-2 ">
                <p>
                  Sepette <b>{productCount}</b> ürün var
                </p>
                <p>
                  Toplam tutar <b>{totalPrice} TL</b>
                </p>
                <p>
                  Bakiye: <b>{balance} TL</b>
                </p>
              </div>
              <div className="flex flex-col justify-between gap-2">
                <Button onClick={clearShoppingCart} label={"Sepeti boşalt"} />
                <Button onClick={beginPayment} label={"Ödemeyi tamamla"} />
              </div>
            </div>
            {products.length > 0 && (
              <div className=" bg-orange-100 flex flex-col overflow-y-scroll h-52 custom-scrollbar">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-5 gap-4 border-b-2 border-white rounded"
                  >
                    <div className="flex items-center gap-4">
                      <h1 className="text-base text-[15px]">
                        {product.brand + " " + product.model}
                      </h1>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => RemoveProduct(product.id)}
                        label={"Kaldır"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
