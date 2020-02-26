import React, { useContext } from "react";
import "./Gram.css";
import { context } from "../../context/Provider";
import useComponentVisible from "../../hooks/useComponentVisible";

const Gram = () => {
  const {
    isGramModalShown,
    setIsGramModalShown,
    selectedGram,
    setSelectedGram
  } = useContext(context);
  const displayClassName = isGramModalShown
    ? "gram-modal display-block"
    : "gram-modal display-none";

  const handleOutsideClick = () => {
    setIsGramModalShown(false);
    setSelectedGram(null);
  };

  const displayGram = gram => {
    const {
      author,
      createdAt,
      pictureURL,
      pictureCaption,
      comments,
      text
    } = gram;
    return (
      <div
        className="media"
        style={{ background: `url(${pictureURL}) no-repeat` }}
      ></div>
    );
  };

  return (
    <div className={displayClassName} onClick={() => handleOutsideClick()}>
      <div className="gram-modal-main">
        {selectedGram && displayGram(selectedGram)}
      </div>
    </div>
  );
};

export default Gram;
