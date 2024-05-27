import React from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/modal";
import { logout } from "../../redux/authSlice";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

// toast
import toast from "react-hot-toast";
import { CloseModalButton } from "./CloseModalButton";

//component
import { Button } from "../Button";
import { defineConfirmModal } from "../../redux/confirmModalSlice";
import { ProfilePicture } from "../ProfilePicture";

export const ProfileModal = () => {
  const dispatch = useDispatch();

  const { user, balance, otherUserData } = useSelector(
    (state) => state.authSlice
  );

  const { displayName, fullName } = otherUserData;

  const handleLogout = async () => {
    const result = await signOut(auth);
    dispatch(closeModal());
    dispatch(logout());
    toast.success("Oturum sonlandırıldı!");
  };

  const deleteProfile = async () => {
    dispatch(openModal("confirm"));
    dispatch(
      defineConfirmModal({
        transaction: "Bu hesap silinecek",
        label: "Hesabını silmek istediğine emin misin?",
        process: "DELETE_PROFILE",
        id: { docId: otherUserData.id, uid: user.uid },
      })
    );
  };

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg w-[500px]">
        <div className="flex justify-between items-center  bg-orange-400 p-4">
          <h1 className="text-white">
            <b>Profil</b>
          </h1>
          <CloseModalButton />
        </div>
        <div className="flex flex-col p-5 gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center bg-orange-100 p-3">
              <ProfilePicture />
              <div>
                <h1>
                  <b>{displayName}</b>
                </h1>
                <p>{fullName}</p>
              </div>
            </div>
            <div className="bg-orange-100 p-3 flex justify-between items-center">
              <p>
                Bakiye: <b>{balance} TL</b>
              </p>
              <Button
                label={"Para Ekle"}
                onClick={() => dispatch(openModal("payment"))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => dispatch(openModal("add-product"))}
                label={"Ürün Ekle"}
              />
              <Button
                onClick={handleLogout}
                label={"Çıkış"}
                className="bg-orange-400 p-2 rounded text-white"
              />
              <Button
                onClick={deleteProfile}
                label={"Hesabı Sil"}
                className="bg-orange-400 p-2 rounded text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
