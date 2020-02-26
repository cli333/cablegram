import React, { useState, useContext } from "react";
import "./Register.css";
import firebase from "../../firebase/firebase";
import { context } from "../../context/Provider";

const Register = ({ registerVisible }) => {
  const { setIsRegisterVisible } = useContext(context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);
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
          authorEmail: userRef.user.email
        });

      setName("");
      setEmail("");
      setPassword("");
      setIsRegisterVisible(false);
    } catch (error) {
      if (error.message.includes("email")) {
        setError("Invalid email address");
      } else if (error.message.includes("password")) {
        setError("Invalid password");
      } else {
        setError("Invalid email and/or address");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    switch (e.target.name) {
      case "name":
        if (error) setError(null);
        setName(e.target.value);
        break;
      case "email":
        if (error) setError(null);
        setEmail(e.target.value);
        break;
      case "password":
        if (error) setError(null);
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="form-register"
      style={{ display: `${registerVisible ? "" : "none"}` }}
    >
      <form onSubmit={e => handleSubmit(e)}>
        <input
          name="name"
          type="text"
          placeholder="your name"
          value={name}
          onChange={e => handleChange(e)}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="your email"
          value={email}
          onChange={e => handleChange(e)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="your password"
          value={password}
          onChange={e => handleChange(e)}
          required
        />
        {error ? (
          <span>{error}</span>
        ) : (
          <span className="link" onClick={e => handleSubmit(e)}>
            Submit
          </span>
        )}
      </form>
    </div>
  );
};

export default Register;
