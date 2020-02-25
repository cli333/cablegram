import React from "react";
import firebase from "../../firebase/firebase";

const SignOut = () => {
  const handleClick = () => {
    firebase.auth().signOut();
  };
  return <a onClick={() => handleClick()}>Sign Out</a>;
};

export default SignOut;
