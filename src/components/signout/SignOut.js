import React from "react";
import firebase from "../../firebase/firebase";

const SignOut = () => {
  const handleClick = () => {
    firebase.auth().signOut();
  };
  return (
    <span className="link" onClick={() => handleClick()}>
      Sign Out
    </span>
  );
};

export default SignOut;
