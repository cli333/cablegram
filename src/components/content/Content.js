import React, { useContext } from "react";
import "./Content.css";
import Column from "../column/Column";

import { context } from "../../context/Provider";

import { filterGrams } from "../../utils/utils";

const Content = () => {
  const { grams, searchFilter } = useContext(context);

  const displayGrams = () => {
    return grams
      .filter(filterGrams(searchFilter))
      .map((item, idx) => <Column {...item} key={`${item.author} ${idx}`} />);
  };

  return <div className="content">{displayGrams()}</div>;
};

export default Content;
