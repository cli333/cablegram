import React from "react";
import "./styles.css";
import Column from "../column/Column";

import seed from "../../utils/seed";

const Content = () => {
  return (
    <div className="content">
      Content
      {seed.map((item, idx) => (
        <Column {...item} key={`${item.author} ${idx}`} />
      ))}
    </div>
  );
};

export default Content;
