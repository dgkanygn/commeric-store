import React, { useEffect, useState } from "react";

// components
import { ProductCard } from "../components/ProductCard";
import { MinMaxFilter } from "../components/Filter/MinMaxFilter";
import { CheckboxFilter } from "../components/Filter/CheckboxFilter";
import { Button } from "../components/Button";
import { HeaderBanner } from "../components/Pages/Home/HeaderBanner";
import { RadioFilter } from "../components/Filter/RadioFilter";
import { Modal } from "../components/Modal/Modal";

// redux
import { useSelector, useDispatch } from "react-redux";

// reducer
import {
  filterProducts,
  clearFilteredProducts,
  getProductsData,
} from "../redux/productSlice";
import { openModal } from "../redux/modal";
import toast from "react-hot-toast";

export const Home = () => {
  const dispatch = useDispatch();

  const states = useSelector((state) => state.modal);

  const { products, filteredProducts } = useSelector(
    (state) => state.productSlice
  );

  const [formData, setFormData] = useState({
    isSecondHand: false,
    price: 0,
    category: [],
  });

  const [willRenderProducts, setWillRenderProducts] = useState([]);

  useEffect(() => {
    setWillRenderProducts(
      filteredProducts.length > 0 ? filteredProducts : products
    );
  }, [filteredProducts, products]);

  useEffect(() => {
    dispatch(getProductsData());
  }, []);

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

  const sendFormData = () => {
    dispatch(filterProducts(formData));
  };

  const clearFilter = () => {
    dispatch(clearFilteredProducts());
    setFormData({ isSecondHand: false, price: 0, category: [] });
  };

  const selectCategory = (category) => {
    setFormData((prevs) => ({
      ...prevs,
      category: [category],
    }));
    dispatch(filterProducts({ category }));
  };

  // console.log(formData.category);
  useEffect(() => {
    if (
      formData.price > 0 ||
      formData.category.length > 0 ||
      formData.isSecondHand !== false
    ) {
      if (filteredProducts.length === 0) toast.error("Filtrelenecek ürün yok.");
    }
  }, [filteredProducts]);

  return (
    <>
      {states.isOpen && <Modal />}

      <div className="container mx-auto max-w-[1300px] md:px-2 md:py-5">
        <HeaderBanner />
      </div>

      <div className="container mx-auto max-w-[1300px] px-2 py-5 hidden md:block">
        <div className="md:flex flex-col hidden">
          <h1 className="text-lg">
            <b>Kategoriler</b>
          </h1>
          <div className="flex mt-5 gap-5">
            {categories.map((item, index) => (
              <div
                onClick={() => selectCategory(item.label)}
                key={index}
                className="flex flex-col justify-center items-center gap-3 bg-orange-400 rounded-md p-3 shadow-lg cursor-pointer text-white hover:bg-orange-500 transition duration-200 ease-in-out"
              >
                <h1>
                  <b>{item.label}</b>
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-[1300px] px-2 py-5 block md:hidden">
        <div className="flex bg-white p-5 shadow-lg rounded-lg gap-2">
          {/* <button
            onClick={() => dispatch(openModal("category"))}
            className="bg-orange-400 p-2 text-white rounded"
          >
            Kategoriler
          </button>
          <button
            onClick={() => dispatch(openModal("filter"))}
            className="bg-orange-400 p-2 text-white rounded"
          >
            Filtrele
          </button> */}

          <Button
            label={"Kategoriler"}
            onClick={() => dispatch(openModal("category"))}
          />
          <Button
            label={"Filtrele"}
            onClick={() => dispatch(openModal("filter"))}
          />

          {filteredProducts.length > 0 && (
            <Button label={"Filtrelemeyi sil"} onClick={clearFilter} />
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-[1300px] px-2 py-5 md:mt-10">
        <div className="flex gap-10">
          <div className="flex-1 md:flex flex-col max-w-[224px] gap-4 hidden">
            {filteredProducts.length > 0 && (
              <Button label={"Filtrelemeyi kaldır"} onClick={clearFilter} />
            )}
            <CheckboxFilter
              label={"Kategori"}
              arr={categories}
              formData={formData}
              setFormData={setFormData}
            />
            <MinMaxFilter
              label={"Fiyat"}
              formData={formData}
              setFormData={setFormData}
            />
            <RadioFilter
              label={"Parça Değişimi"}
              setFormData={setFormData}
              formData={formData}
            />
            <Button label={"Filtrele"} onClick={sendFormData} />
          </div>
          <div className=" flex gap-5 flex-wrap flex-2 max-w-[1020px] justify-center items-center md:justify-start md:items-start">
            {willRenderProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
