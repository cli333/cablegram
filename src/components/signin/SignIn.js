import React, { useState } from "react";
import firebase from "../../firebase/firebase";

const SignIn = ({ signInVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="form" style={{ display: `${signInVisible ? "" : "none"}` }}>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="email"
          placeholder="your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <a onClick={e => handleSubmit(e)}>Submit</a>
      </form>
    </div>
  );
};

export default SignIn;
