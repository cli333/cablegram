import React from "react";
import "./Column.css";

const Column = ({ headline, author, pictureURL, pictureCaption, text }) => {
  return (
    <div className="column">
      <div className="head">
        <span className="headline hl3">{headline}</span>
        <p>
          <span className="headline hl4">by {author.toUpperCase()}</span>
        </p>

        <figure className="figure">
          <img className="media" src={pictureURL} alt={pictureCaption} />
          {pictureCaption && pictureCaption.length && (
            <figcaption className="figcaption">{pictureCaption}</figcaption>
          )}
        </figure>

        <p>{text}</p>
      </div>
    </div>
  );
};

export default Column;
