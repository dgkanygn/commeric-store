import React, { useState } from "react";

// component
import toast from "react-hot-toast";
import { Button } from "../../Button";

// firebase
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../redux/commentSlice";

export const NewCommentBox = ({ productId }) => {
  const { user } = useSelector((state) => state.authSlice);

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (comment.trim() !== "") {
      const formData = {
        productId,
        comment,
        userId: user.uid,
        username: user.displayName,
      };

      setComment("");

      const res = await addDoc(collection(db, "comments"), formData);

      formData.id = res.id;

      dispatch(addComment(formData));
      toast.success("Yorum eklendi!");
    } else {
      toast.error("Bir şeyler yazın.");
    }
  };

  console.log(comment);

  return (
    <>
      <div className="flex flex-1 flex-col bg-white p-4 shadow-lg items-baseline gap-5">
        <textarea
          className="bg-gray-100 p-2 w-full outline-orange-400"
          placeholder="Bu ürün için yorum yap..."
          cols="10"
          rows="5"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <Button onClick={handleSubmit} label={"Yorum Yap"} />
      </div>
    </>
  );
};
