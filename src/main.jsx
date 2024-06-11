import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// redux
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

// context
import { DataProvider } from "./context/Data.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <DataProvider>
      <App />
    </DataProvider>
  </Provider>
);
