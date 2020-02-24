import React, { useContext } from "react";
import firebase from "../../firebase/firebase";
import { context } from "../../context/Provider";

const SignOut = () => {
  const { setUser } = useContext(context);

  const handleClick = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setUser(null));
  };
  return <a onClick={() => handleClick()}>Sign Out</a>;
};

export default SignOut;
