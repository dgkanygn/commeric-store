// component
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal/Modal";

// pages
import { Product } from "./pages/Product";
import { Home } from "./pages/Home";

// router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// toaster
import { Toaster } from "react-hot-toast";

// redux
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useEffect } from "react";
import { increaseBalance } from "./redux/authSlice";

import { toggleProduct as addShoppingCart } from "./redux/shoppingCartSlice";

function App() {
  const { isOpen } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const { user, otherUserData, isLogin } = useSelector(
    (state) => state.authSlice
  );

  // const { id } = otherUserData;

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", otherUserData.id);
      const docSnap = await getDoc(docRef);
      const balance = docSnap.data().balance;
      const shoppingCart = docSnap.data().shoppingCart;
      shoppingCart.forEach((i) => {
        dispatch(addShoppingCart(i));
      });
      dispatch(increaseBalance(balance));
    };

    if (isLogin) getData();
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  return (
    <>
      <Router>
        <Navbar />
        <Toaster />
        {isOpen && <Modal />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
