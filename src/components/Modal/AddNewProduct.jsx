import React, { useState } from "react";

// component
import { CloseModalButton } from "./CloseModalButton";
import { Button } from "../Button";

// firebase
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

//toast
import toast from "react-hot-toast";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/productSlice";
import { closeModal } from "../../redux/modal";

export const AddNewProduct = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authSlice);

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isSecondHand, setIsSecondHand] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // tek
  const [img, setImg] = useState("");

  // çok
  const [images, setImages] = useState("");

  console.log(images);

  const handleSubmit = async (event) => {
    if (
      category !== "Kategori seç" &&
      brand.trim() !== "" &&
      model.trim() !== "" &&
      description.trim() !== "" &&
      price > 0
    ) {
      if (images.length >= 2) {
        event.preventDefault();
        setIsLoading(true);

        const imageUrls = [];

        for (const image of images) {
          const storageRef = ref(
            storage,
            `products/${brand + " " + model}/${image.name}`
          );
          await uploadBytes(storageRef, image);
          const url = await getDownloadURL(storageRef);
          imageUrls.push(url);
        }

        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userDocId = querySnapshot.docs[0].id;

        const formData = {
          brand,
          model,
          price,
          isSecondHand,
          description,
          category,
          // category: { title: "", name: "" },
          imageUrls,
          seller: user.displayName,
          userDocId,
          isSold: false,
        };

        const result = await addDoc(collection(db, "products"), formData);

        formData.id = result.id;

        dispatch(addProduct(formData));
        setIsLoading(false);
        dispatch(closeModal());
        toast.success("Yeni ürün eklendi");
      } else toast.error("En az iki görsel eklemelisiniz.");
    } else {
      toast.error("Tüm alanlar doldurulmalıdır.");
    }
  };

  const categories = [
    {
      id: 0,
      label: "Akıllı Telefon",
      name: "smart-phone",
    },
    {
      id: 1,
      label: "Bilgisayar",
      name: "computer",
    },
    {
      id: 3,
      label: "TV",
      name: "tv",
    },
    {
      id: 4,
      label: "Kulaklık",
      name: "earphone",
    },
    {
      id: 5,
      label: "Oyun Konsolu",
      name: "game-console",
    },
    {
      id: 6,
      label: "Tablet",
      name: "tablet",
    },
    {
      id: 7,
      label: "Beyaz Eşya",
      name: "appliance",
    },
    {
      id: 8,
      label: "Diğer",
      name: "others",
    },
  ];

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg w-[500px]">
        <div className="flex justify-between items-center  bg-orange-400 p-4">
          <h1 className="text-white">
            <b>Ürün ekle</b>
          </h1>
          <CloseModalButton />
        </div>
        <div className="flex flex-col p-5 gap-5">
          <form className="flex flex-col gap-4 overflow-y-scroll h-80 custom-scrollbar">
            <select
              className="p-2 rounded bg-orange-100"
              name="selectedOption"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Kategori seç</option>
              {categories.map((item, index) => (
                <option value={item.label}>{item.label}</option>
              ))}
            </select>
            <input
              className="bg-orange-100 p-2 rounded"
              name="marka"
              placeholder="Marka"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <input
              className="bg-orange-100 p-2 rounded"
              name="model"
              placeholder="Model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <input
              className="bg-orange-100 p-2 rounded"
              name="fiyat"
              placeholder="Fiyat"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <div className="bg-orange-100 p-2 flex flex-col gap-2">
              <p>Parça değişimi var mı?</p>
              <div className="flex items-center gap-2 p-1">
                <input
                  type="radio"
                  id="parcaDegisimiEvet"
                  name="parcaDegisimi"
                  value="true"
                  checked={isSecondHand === true}
                  onChange={() => setIsSecondHand(true)}
                />
                <label htmlFor="parcaDegisimiEvet">Var</label>
                <input
                  type="radio"
                  id="parcaDegisimiHayir"
                  name="parcaDegisimi"
                  value="false"
                  checked={isSecondHand === false}
                  onChange={() => setIsSecondHand(false)}
                />
                <label htmlFor="parcaDegisimiHayir">Yok</label>
              </div>
            </div>

            <div>
              <textarea
                className="bg-orange-100 p-2 flex flex-col gap-2 w-full"
                placeholder="Açıklama"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <input
                type="file"
                onChange={(e) => setImages(Array.from(e.target.files))}
                multiple
                className="w-full"
              />
            </div>
          </form>
          <Button
            isLoading={isLoading}
            type={"submit"}
            onClick={handleSubmit}
            label="Ürün Ekle"
            extraClass={"flex justify-center items-center"}
          />
        </div>
      </div>
    </>
  );
};
