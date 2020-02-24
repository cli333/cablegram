import React from "react";
import "./Card.css";

const Card = ({ headline, author, pictureURL, pictureCaption, text }) => {
  return (
    <div
      className="photo-card"
      style={{ backgroundImage: `url(${pictureURL})` }}
    >
      <div class="photo-card__header">
        <h2 className="card-heading">{headline}</h2>
        <h3 className="card-subheading">{author}</h3>
      </div>
      <div className="photo-card__footer__text">
        <p>as;ldkfjasljdfsajkf</p>
      </div>
    </div>
  );
};

export default Card;
