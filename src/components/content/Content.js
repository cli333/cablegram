import React, { useContext } from "react";
import "./Content.css";
import Column from "../column/Column";
import Gram from "../gram/Gram";
import { context } from "../../context/Provider";
import { filterGrams } from "../../utils/utils";

const Content = () => {
  const { grams, searchFilter } = useContext(context);

  const displayGrams = () => {
    return grams
      .filter(filterGrams(searchFilter))
      .map((item, idx) => <Column {...item} key={`${item.author} ${idx}`} />);
  };

  return (
    <React.Fragment>
      <div className="content">{displayGrams()}</div>
      <Gram />
    </React.Fragment>
  );
};

export default Content;
