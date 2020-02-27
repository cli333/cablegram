import React, { useContext, useState } from "react";
import "./Send.css";
import firebase from "../../firebase/firebase";
import { context } from "../../context/Provider";
import { validateGram } from "../../utils/utils";

const Send = () => {
  const { authUser, isModalShown, setIsModalShown } = useContext(context);
  const [headline, setHeadline] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [pictureCaption, setPictureCaption] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const displayClassName = isModalShown
    ? "modal display-block"
    : "modal display-none";

  const handleSubmit = e => {
    if (loading) return;
    e.preventDefault();
    if (validateGram(headline, pictureURL, pictureCaption, text)) {
      try {
        setLoading(true);
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
        setError("One or more fields are invalid");
      } finally {
        setHeadline("");
        setPictureURL("");
        setPictureCaption("");
        setText("");
        setIsModalShown(false);
        setError(null);
        setLoading(false);
      }
    } else {
      setError("One or more fields are invalid");
    }
  };

  const handleChange = e => {
    switch (e.target.name) {
      case "headline":
        if (error) setError(null);
        setHeadline(e.target.value);
        break;
      case "pictureURL":
        if (error) setError(null);
        setPictureURL(e.target.value);
        break;
      case "pictureCaption":
        if (error) setError(null);
        setPictureCaption(e.target.value);
        break;
      case "text":
        if (error) setError(null);
        setText(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setHeadline("");
    setPictureURL("");
    setPictureCaption("");
    setText("");
    setIsModalShown(false);
    setError(null);
  };

  return (
    <div className={displayClassName}>
      <section className="modal-main">
        <form onSubmit={e => handleSubmit(e)}>
          <input
            name="headline"
            type="text"
            placeholder="your headline"
            value={headline}
            onChange={e => handleChange(e)}
          />
          <input
            name="pictureURL"
            type="text"
            placeholder="your picture url"
            value={pictureURL}
            onChange={e => handleChange(e)}
          />
          <input
            name="pictureCaption"
            type="text"
            placeholder="your picture caption"
            value={pictureCaption}
            onChange={e => handleChange(e)}
          />
          <textarea
            name="text"
            type="text"
            placeholder="minimum of 500 characters"
            value={text}
            onChange={e => handleChange(e)}
          ></textarea>
          <div>
            {error ? (
              <span>{error}</span>
            ) : (
              <React.Fragment>
                <span className="link" onClick={e => handleSubmit(e)}>
                  Submit
                </span>{" "}
                |
                <span className="link" onClick={() => handleClose()}>
                  Close
                </span>
              </React.Fragment>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default Send;
