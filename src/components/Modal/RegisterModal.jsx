import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";

// component
import toast from "react-hot-toast";
import { Button } from "../Button";

// redux
import { closeModal, openModal } from "../../redux/modal";
import { CloseModalButton } from "./CloseModalButton";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export const RegisterModal = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: username,
      });

      const formData = {
        uid: result.user.uid,
        displayName: username,
        email: email,
        balance: 0,
        fullName,
      };

      const res = await addDoc(collection(db, "users"), formData);
      const docRef = doc(db, "users", res.id);
      await updateDoc(docRef, { id: res.id });

      setIsLoading(false);
      toast.success("Başarıyla kaydolundu.");
      dispatch(closeModal());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg w-[500px]">
        <div className="flex justify-between items-center  bg-orange-400 p-4">
          <h1 className="text-white">
            <b>Kaydol</b>
          </h1>
          <CloseModalButton />
        </div>
        <div className="flex flex-col p-5 gap-5">
          <div className="flex flex-col gap-2">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="bg-orange-100 p-2"
                placeholder="E-Posta"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-orange-100 p-2"
                placeholder="Parola"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="bg-orange-100 p-2"
                placeholder="Kullanıcı Adı"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="bg-orange-100 p-2"
                placeholder="Ad Soyad"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
                label={"Kaydol"}
                className="bg-orange-400 rounded text-white p-2"
                extraClass={"flex justify-center items-center"}
              />

              <p>
                Hesabın varsa
                <b
                  onClick={() => dispatch(openModal("login"))}
                  className="cursor-pointer hover:text-gray-400 transition duration-200 ease-in-out"
                >
                  {" "}
                  giriş yap.
                </b>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
