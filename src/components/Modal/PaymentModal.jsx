import React, { useState } from "react";
import { CloseModalButton } from "./CloseModalButton";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { increaseBalance } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { openModal } from "../../redux/modal";

export const PaymentModal = () => {
  const { otherUserData } = useSelector((state) => state.authSlice);

  const { id } = otherUserData;

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [fullname, setFullname] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();

  const handleCardNumber = (e) => {
    let input = e.target.value.replace(/\D/g, "");

    let formattedInput = "";
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += " ";
      }
      formattedInput += input[i];
    }

    setCardNumber(formattedInput);
  };
  const handleExpiryDate = (e) => {
    let input = e.target.value;
    if (input.length <= 5) {
      input = input.replace(/\D/g, "");
      if (input.length > 2) {
        input = input.substring(0, 2) + "/" + input.substring(2);
      }
      setExpiryDate(input);
    }
  };
  const handleExpirationDate = (e) => {
    setExpirationDate(e.target.value);
  };
  const handleFullname = (e) => {
    setFullname(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const formData = {
    cardNumber,
    expiryDate,
    expirationDate,
    fullname,
    amount,
  };

  const completePayment = async () => {
    if (cardNumber && expiryDate && expirationDate && fullname && amount) {
      const amountN = parseInt(amount);
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      let balance = docSnap.data().balance;
      balance += amountN;
      await updateDoc(docRef, { balance: balance });
      dispatch(increaseBalance(balance));
      dispatch(openModal("profile"));
      toast.success(`Hesaba ${amountN} TL eklendi.`);
    } else {
      toast.error("Alanları doldurun.");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg w-[500px]">
      <div className="flex justify-between items-center  bg-orange-400 p-4">
        <h1 className="text-white">
          <b>Para ekle</b>
        </h1>
        <CloseModalButton />
      </div>
      {/* <div className="flex flex-col p-5 gap-5"> */}
      <div className="flex flex-col p-5 gap-5">
        <input
          className="bg-gray-100 p-2"
          type="text"
          placeholder="Kart Numarası"
          maxLength="19"
          value={cardNumber}
          onChange={handleCardNumber}
        />
        <input
          className="bg-gray-100 p-2"
          type="text"
          placeholder="AA/YY"
          value={expiryDate}
          onChange={handleExpiryDate}
        />
        <input
          className="bg-gray-100 p-2"
          type="text"
          placeholder="CVC"
          maxLength={4}
          onChange={handleExpirationDate}
        />
        <input
          className="bg-gray-100 p-2"
          type="text"
          placeholder="Ad Soyad"
          onChange={handleFullname}
        />
        <input
          className="bg-gray-100 p-2"
          type="number"
          placeholder="Miktar"
          max={50000}
          min={0}
          onChange={handleAmount}
        />
        <Button onClick={completePayment} label={"Ödemeyi Tamamla"} />
      </div>
      {/* </div> */}
    </div>
  );
};
