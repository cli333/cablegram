import React, { createContext, useState } from "react";

import seed from "../utils/seed";

export const context = createContext();

const Provider = ({ children }) => {
  // reset this to empty array later
  const [grams, setGrams] = useState(seed);
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <context.Provider
      value={{ grams, setGrams, searchFilter, setSearchFilter }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
