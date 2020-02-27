import React, { useContext } from "react";
import "./Column.css";
import { context } from "../../context/Provider";

const Column = props => {
  const { headline, author, pictureURL, pictureCaption, text } = props;
  const { setIsGramModalShown, setSelectedGram } = useContext(context);

  const handleClick = () => {
    setIsGramModalShown(true);
    setSelectedGram({ ...props });
  };

  return (
    <div className="column">
      <div className="head">
        <span className="headline hl3">{headline}</span>
        <p>
          <span className="headline hl4">by {author.toUpperCase()}</span>
        </p>

        <figure className="figure">
          <img
            className="media"
            src={pictureURL}
            alt={pictureCaption}
            onClick={() => handleClick()}
          />
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
