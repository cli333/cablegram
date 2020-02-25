import React, { useState } from "react";
import "./Register.css";
import firebase from "../../firebase/firebase";

const Register = ({ registerVisible }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userRef = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await userRef.user.updateProfile({
        displayName: name
      });
      await firebase
        .firestore()
        .collection("authors")
        .add({
          author: userRef.user.displayName,
          authorId: userRef.user.uid,
          authorEmail: userRef.user.email,
          followers: [],
          following: []
        });
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div
      className="form-register"
      style={{ display: `${registerVisible ? "" : "none"}` }}
    >
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          placeholder="your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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

export default Register;
