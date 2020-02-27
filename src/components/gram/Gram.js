import React, { useState, useContext } from "react";
import "./Gram.css";
import { context } from "../../context/Provider";
import { timeElapsed } from "../../utils/utils";
import firebase from "../../firebase/firebase";

const Gram = () => {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const {
    authUser,
    isGramModalShown,
    setIsGramModalShown,
    selectedGram,
    setSelectedGram
  } = useContext(context);
  const displayClassName = isGramModalShown
    ? "gram-modal display-block"
    : "gram-modal display-none";

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (input.length < 1) {
      setError("your comment is too short");
      return;
    }
    if (authUser) {
      const newComment = {
        author: authUser.displayName,
        authorId: authUser.uid,
        comment: input,
        createdAt: Date.now()
      };
      try {
        setIsSubmitting(true);
        await firebase
          .firestore()
          .collection("grams")
          .doc(selectedGram.id)
          .update({
            comments: firebase.firestore.FieldValue.arrayUnion(newComment)
          });
        setSelectedGram({
          ...selectedGram,
          comments: [...selectedGram.comments, newComment]
        });
        setInput("");
      } catch (error) {
        console.log(error);
        setError("something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = e => {
    if (error) setError(null);
    setInput(e.target.value);
  };

  const handleClose = () => {
    setIsGramModalShown(false);
    setSelectedGram(null);
  };

  const displayGram = gram => {
    const { headline, pictureURL, comments, text } = gram;
    return (
      <div>
        <img className="gram-media" src={`${pictureURL}`} alt={headline} />
        <p className="gram-text">{text}</p>
        <div className="gram-headline">{headline}</div>
        <div className="gram-comments">
          {comments.map(({ author, authorId, comment, createdAt }, index) => (
            <div
              className="gram-comment-wrapper"
              key={`${authorId} ${createdAt} ${index}`}
            >
              <li className="gram-comment-left">
                <strong>{author}</strong> {comment}
              </li>
              <span className="gram-comment-right">
                <em>{timeElapsed(createdAt)}</em>
              </span>
            </div>
          ))}
        </div>
        <input
          className="gram-input"
          placeholder={`${
            !authUser ? "login to comment" : error ? error : "add your comment"
          }`}
          type="text"
          disabled={authUser ? false : true}
          value={input}
          onChange={e => handleChange(e)}
        />
        <span className="gram-wrapper">
          <span
            style={{ textDecoration: `${authUser ? "" : "line-through"}` }}
            onClick={() => handleSubmit()}
          >
            Submit
          </span>{" "}
          | <span onClick={() => handleClose()}>Close</span>
        </span>
      </div>
    );
  };

  return (
    <div className={displayClassName}>
      <div className="gram-modal-main">
        {selectedGram && displayGram(selectedGram)}
      </div>
    </div>
  );
};

export default Gram;
