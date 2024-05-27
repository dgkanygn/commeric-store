import React from "react";
import { useSelector, useDispatch } from "react-redux";

// component
import { CloseModalButton } from "./CloseModalButton";
import toast from "react-hot-toast";

// redux
import { transferProducts } from "../../redux/shoppingCartSlice";
import { clearProducts } from "../../redux/wishListSlice";

export const WishListModal = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.wishListSlice);

  const transferProductsToShoppingCart = (products) => {
    if (products.length > 0) {
      products.map((product) => dispatch(transferProducts(product)));
      dispatch(clearProducts());
      toast.success("Ürünler sepete taşındı!");
    } else {
      toast.error("Sepete gönderilecek ürün yok.");
    }
  };

  const clearWishList = (products) => {
    if (products.length > 0) {
      // products.map((product) => dispatch(transferProducts(product)));
      dispatch(clearProducts());
      toast.success("Ürün listesi boşaltıldı!");
    } else {
      toast.error("Ürün listesi zaten boş.");
    }
  };

  return (
    <>
      <div className="bg-white shadow-xl rounded-lg w-[900px]">
        <div className="flex justify-between items-center  bg-orange-400 p-4">
          <h1 className="text-white">
            <b>İstek Listesi</b>
          </h1>
          <CloseModalButton />
        </div>

        <div className="p-2">
          <div className="bg-orange-100 rounded p-5 flex flex-col gap-6 md:justify-between md:items-center  md:flex-row">
            <div className="flex flex-col gap-4 ">
              <p>İstek listesinde 4 ürün var.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <button
                onClick={() => transferProductsToShoppingCart(products)}
                className="bg-orange-400 text-white p-2 rounded"
              >
                Hepsini Sepete Taşı
              </button>
              <button
                onClick={() => clearWishList(products)}
                className="bg-orange-400 p-2 rounded text-white"
              >
                Listeyi Boşalt
              </button>
            </div>
          </div>
          <br />
          <div className="flex flex-col gap-4 p-2 overflow-y-scroll h-96 custom-scrollbar">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 px-5 gap-4 bg-orange-100 rounded"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="w-24 h-w-24 object-cover"
                    src={product.img}
                    alt=""
                  />
                  <h1 className="text-base text-[15px]">
                    {product.brand + " " + product.model}
                  </h1>
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-orange-400 p-2 text-white rounded cursor-pointer"
                    // // onClick={() => RemoveProduct(product.id)}
                    // onClick={() => console.log(product)}
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
