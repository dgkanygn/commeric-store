import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// redux
import { login, logout } from "./redux/authSlice";
import { store } from "./redux/store";

const firebaseConfig = {
  apiKey: "AIzaSyC_IkYYinczI6d27l1vH-pTrWtqySEe-A8",
  authDomain: "ecommerce-b52f9.firebaseapp.com",
  projectId: "ecommerce-b52f9",
  storageBucket: "ecommerce-b52f9.appspot.com",
  messagingSenderId: "971398377595",
  appId: "1:971398377595:web:191d279a84fd9b444ef2de",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     store.dispatch(login(user));

//     console.log(user);
//   } else {
//     // store.dispatch(logout());
//   }
// });
