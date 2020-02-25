import React, { useContext, useState } from "react";
import "./Send.css";
import firebase from "../../firebase/firebase";
import { context } from "../../context/Provider";

const Send = () => {
  const { authUser, isModalShown, setIsModalShown } = useContext(context);
  const [headline, setHeadline] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [pictureCaption, setPictureCaption] = useState("");
  const [text, setText] = useState("");

  const displayClassName = isModalShown
    ? "modal display-block"
    : "modal display-none";

  const handleSubmit = e => {
    e.preventDefault();
    try {
      firebase
        .firestore()
        .collection("grams")
        .add({
          author: authUser.author,
          authorId: authUser.authorId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          headline,
          comments: [],
          pictureCaption,
          pictureURL,
          text
        });
    } catch (error) {
      console.log(error);
    } finally {
      setHeadline("");
      setPictureURL("");
      setPictureCaption("");
      setText("");
      setIsModalShown(false);
    }
  };

  return (
    <div className={displayClassName} onClick={() => setIsModalShown(false)}>
      <section className="modal-main">
        <form onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            placeholder="your headline"
            value={headline}
            onChange={e => setHeadline(e.target.value)}
          />
          <input
            type="text"
            placeholder="your picture url"
            value={pictureURL}
            onChange={e => setPictureURL(e.target.value)}
          />
          <input
            type="text"
            placeholder="your picture caption"
            value={pictureCaption}
            onChange={e => setPictureCaption(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="minimum of 500 characters"
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <div>
            <a onClick={e => handleSubmit(e)}>Submit</a> |
            <a onClick={() => setIsModalShown(false)}>Close</a>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Send;
