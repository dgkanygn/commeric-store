// redux
import { defineConfirmModal } from "../../../redux/confirmModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/modal";

export const CommentBox = ({ id, author, comment }) => {
  const dispatch = useDispatch();

  const { user, isLogin } = useSelector((state) => state.authSlice);

  const isOwner = user?.displayName === author;

  const isShowButton = isOwner && isLogin;

  const deleteComment = async () => {
    dispatch(openModal("confirm"));
    dispatch(
      defineConfirmModal({
        transaction: "Bu yorum silinecek",
        label: "Yorumu silmek istediğine emin misin?",
        process: "DELETE_COMMENT",
        id: id,
      })
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1>
            <b>{author}</b>
          </h1>
          <p className="text-sm md:text-base">{comment}</p>
        </div>
        {isShowButton && (
          <div
            onClick={deleteComment}
            className="bg-orange-400  flex justify-center item-center cursor-pointer rounded p-1 px-2"
          >
            <i class="fa-solid fa-xmark text-sm text-white"></i>
          </div>
        )}
      </div>
    </>
  );
};
