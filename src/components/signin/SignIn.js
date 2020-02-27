import React, { useState } from "react";
import firebase from "../../firebase/firebase";

const SignIn = ({ signInVisible, setIsSignInVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setError(null);
      setIsSignInVisible(!signInVisible);
    } catch (error) {
      setError("Invalid email/password");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    switch (e.target.name) {
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
      className="form-signin"
      style={{ display: `${signInVisible ? "" : "none"}` }}
    >
      <form onSubmit={e => handleSubmit(e)}>
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

export default SignIn;
