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
          author: authUser.displayName,
          authorId: authUser.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          headline,
          comments: [],
          pictureCaption,
          pictureURL,
          text
        });
    } catch (error) {
      console.log(error);
      // handle errror
    } finally {
      setHeadline("");
      setPictureURL("");
      setPictureCaption("");
      setText("");
      setIsModalShown(false);
    }
  };

  return (
    <div
      type="outer"
      className={displayClassName}
      onClick={e => console.log(typeof e.target)}
    >
      <section className="modal-main" onClick={e => console.log(e)}>
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
            <span className="link" onClick={e => handleSubmit(e)}>
              Submit
            </span>{" "}
            |
            <span className="link" onClick={() => setIsModalShown(false)}>
              Close
            </span>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Send;
