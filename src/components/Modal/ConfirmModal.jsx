import React, { useEffect, useState } from "react";

// component
import { CloseModalButton } from "./CloseModalButton";
import { Button } from "../Button";

// redux
import { useDispatch, useSelector } from "react-redux";
import { resetConfirmation } from "../../redux/confirmModalSlice";
import { closeModal } from "../../redux/modal";
import { removeComment } from "../../redux/commentSlice";

// firestore
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

// toast
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { increaseBalance, logout } from "../../redux/authSlice";
import { clearProducts } from "../../redux/shoppingCartSlice";
import { markProduct } from "../../redux/productSlice";

export const ConfirmModal = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { label, transaction, isConfirmed, process, id } = useSelector(
    (state) => state.confirmModalSlice
  );

  const { products } = useSelector((state) => state.productSlice);

  const [isLoading, setIsLoading] = useState(false);

  const deleteComment = async () => {
    const docRef = doc(db, "comments", id);
    await deleteDoc(docRef);
    toast.success("Yorumunuz silindi.");
    dispatch(removeComment(id));
    dispatch(resetConfirmation());
    dispatch(closeModal());
  };

  const deleteProduct = async () => {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
    dispatch(removeComment(id));
    dispatch(resetConfirmation());
    dispatch(closeModal());
    navigate("/");
    toast.success("Ürün silindi.");
  };

  const deleteProfile = async () => {
    dispatch(logout());
    const docRef = doc(db, "users", id.docId);
    await deleteDoc(docRef);
    const user = auth.currentUser;
    await deleteUser(user);
    dispatch(closeModal());
    toast.success("Hesap başarıyla silindi!");
  };

  const buyProduct = async () => {
    let totalPrice = 0;
    for (const item of id) {
      const itemId = item.user;
      const docRef = doc(db, "users", itemId);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      let balance = docData.balance;
      // console.log(balance)
      let amount = parseInt(item.amount);
      if (item.type === "seller") {
        totalPrice += amount;
        balance += amount;
        await updateDoc(docRef, { balance });
        const productDocRef = doc(db, "products", item.productDocId);
        await updateDoc(productDocRef, { isSold: true });
        let isRes = false;
        products.map((product) => {
          if (product.id === item.productDocId) isRes = true;
        });
        if (isRes) dispatch(markProduct(item.productDocId));
      } else {
        balance -= totalPrice;
        await updateDoc(docRef, { balance });
        dispatch(increaseBalance(balance));
        dispatch(clearProducts());
      }
    }

    dispatch(closeModal());
    toast.success("Ödeme başarıyla gerçekleştirildi!");
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    if (process === "DELETE_COMMENT") {
      await deleteComment();
    } else if (process === "DELETE_PRODUCT") {
      await deleteProduct();
    } else if (process === "DELETE_PROFILE") {
      await deleteProfile();
    } else if (process === "BUY_PRODUCT") {
      await buyProduct();
    }
    setIsLoading(false);
  };

  const cancelProcess = () => {
    dispatch(resetConfirmation());
    dispatch(closeModal());
  };

  return (
    <div className="bg-white shadow-xl rounded-lg w-[500px]">
      <div className="flex justify-between items-center  bg-orange-400 p-4">
        <h1 className="text-white">
          <b>{transaction}</b>
        </h1>
        {/* <CloseModalButton /> */}
      </div>
      <div className="flex flex-col p-5 gap-5">
        <p className="bg-orange-100 p-4">{label}</p>
        <div className="flex gap-4">
          <Button
            isLoading={isLoading}
            onClick={handleConfirm}
            label={"Onayla"}
          />
          {!isLoading && (
            <Button
              extraClass={"bg-orange-200"}
              onClick={cancelProcess}
              label={"Vazgeç"}
            />
          )}

          {/* <Button label={"İptal"} /> */}
        </div>
      </div>
    </div>
  );
};
