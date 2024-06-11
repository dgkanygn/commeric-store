import { createContext, useState } from "react";

const Data = createContext();

export const DataProvider = ({ children }) => {
  const [product, setProduct] = useState({});

  const data = {
    product,
    setProduct,
  };

  return <Data.Provider value={data}>{children}</Data.Provider>;
};

export default Data;
