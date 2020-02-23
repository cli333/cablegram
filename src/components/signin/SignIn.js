import React from "react";

const SignIn = ({ signInVisible }) => {
  return (
    <div className="form" style={{ display: `${signInVisible ? "" : "none"}` }}>
      <input type="email" placeholder="your email" />
      <input type="password" placeholder="your password" />
      <a>Submit</a>
    </div>
  );
};

export default SignIn;
