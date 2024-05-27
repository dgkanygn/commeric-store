import React, { useEffect, useState } from "react";

// component
import { NewCommentBox } from "../components/Pages/Product/NewCommentBox";
import { CommentBox } from "../components/Pages/Product/CommentBox";
import { ProductDetails } from "../components/Pages/Product/ProductDetails";
import { ProductGallery } from "../components/Pages/Product/ProductGallery";

// react router
import { useParams } from "react-router-dom";

// firebase
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsData } from "../redux/commentSlice";

export const Product = () => {
  const { comments } = useSelector((state) => state.commentSlice);

  const { id } = useParams();

  const [product, setProduct] = useState({});

  const dispatch = useDispatch();

  const getProduct = async () => {
    const result = await getDoc(doc(db, "products", id));
    setProduct(result.data());
  };

  useEffect(() => {
    getProduct();
    dispatch(getCommentsData(id));
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-orange-300 to-orange-500 py-24 relative flex justify-center">
        <div className="container mx-auto max-w-[1300px] px-2 absolute">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <div className="flex flex-1 flex-col gap-5">
                <ProductGallery id={id} />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <ProductDetails
                  brand={product.brand}
                  model={product.model}
                  category={product.category}
                  price={product.price}
                  isSecondHand={product.isSecondHand}
                  description={product.description}
                  seller={product.seller}
                  id={id}
                  isSold={product.isSold}
                />
                <div className="flex-1 flex flex-col gap-4 mb-5">
                  <NewCommentBox productId={id} />
                  <div className="shadow-lg bg-white p-4 flex flex-col gap-6">
                    <b>Yorumlar</b>
                    <div className="flex flex-col-reverse gap-6">
                      {comments.map((comment, index) => (
                        <CommentBox
                          key={index}
                          id={comment?.id}
                          author={comment.username}
                          comment={comment.comment}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
