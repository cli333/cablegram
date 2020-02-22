import React from "react";
import "./styles.css";

import { splitParagraph } from "../../utils/utils";

const Column = ({ headline, author, pictureURL, pictureCaption, text }) => {
  const { firstHalf, secondHalf } = splitParagraph(text);

  return (
    <div className="column">
      <div className="head">
        <span className="headline hl3">{headline}</span>
        <p>
          <span className="headline hl4">by {author.toUpperCase()}</span>
        </p>
        {/* first half of text */}
        <p>{firstHalf}</p>
        <figure class="figure">
          <img class="media" src={pictureURL} alt={pictureCaption} />
          <figcaption class="figcaption">{pictureCaption}</figcaption>
        </figure>
        {/* second half of text */}
        <p>{secondHalf}</p>
      </div>
    </div>
  );
};

export default Column;
