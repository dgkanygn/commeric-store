import React, { useState } from "react";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";

// toast
import toast from "react-hot-toast";

// redux
import { useSelector, useDispatch } from "react-redux";
import { closeModal, openModal } from "../../redux/modal";
import { CloseModalButton } from "./CloseModalButton";
import { fillOtherUserData, login } from "../../redux/authSlice";
import { Button } from "../Button";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const LoginModal = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);

      const uid = res.user.uid;

      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const doc = querySnapshot.docs[0];

      const userData = doc.data();

      // userData.docId = doc.id;
      dispatch(
        login({
          user: res.user,
          balance: doc.data().balance,
          otherUserInfo: doc.data(),
        })
      );

      // dispatch(fillOtherUserData(userData));
      setIsLoading(false);
      toast.success("Hoş geldiniz!");
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
            <b>Giriş yap</b>
          </h1>
          <CloseModalButton />
        </div>
        <div className="flex flex-col p-5 gap-5">
          <div className="flex flex-col gap-2">
            <div className="bg-orange-100 p-2 rounded">
              <p className="mb-1">
                Test etmek için aşağıdaki bilgilerle giriş sağlayabilirsiniz:
              </p>
              <p>
                mail: <b>test@gmail.com</b>
              </p>
              <p>
                şifre:
                <b> 123123</b>
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="bg-orange-100 p-2"
                placeholder="E-Posta"
                type="text"
                name=""
                id=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-orange-100 p-2"
                placeholder="Parola"
                type="password"
                name=""
                id=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
                label={"Giriş Yap"}
                className="bg-orange-400 rounded text-white p-2"
                extraClass={"flex justify-center items-center"}
              >
                Giriş Yap
              </Button>
              <p>
                Hesabın varsa{" "}
                <b
                  onClick={() => dispatch(openModal("register"))}
                  className="cursor-pointer hover:text-gray-400 transition duration-200 ease-in-out"
                >
                  kaydol.
                </b>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
