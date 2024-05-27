import React, { useEffect, useState } from "react";

// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const ProductGallery = ({ id }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const [imagesArr, setImagesArr] = useState([]);

  const getProduct = async () => {
    const result = await getDoc(doc(db, "products", id));
    const arr = result.data().imageUrls;
    setImagesArr(arr);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="bg-gray-800 flex justify-center items-center rounded-md shadow-lg">
          <img
            className="h-40 w-40 md:h-96 md:w-96 object-cover"
            src={imagesArr[imgIndex]}
            alt="product"
          />
        </div>
        <div className="flex items-center gap-6 bg-white p-2 shadow-lg">
          <div className="flex gap-6 overflow-x-auto">
            {imagesArr.map((img, index) => (
              <img
                key={index}
                className={`h-24 w-h-24 object-cover border-2  cursor-pointer ${
                  imgIndex === index ? "border-orange-400" : "border-orange-100"
                }`}
                src={img}
                alt="product"
                onMouseEnter={() => setImgIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
