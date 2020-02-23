import React from "react";

const Register = ({ registerVisible }) => {
  return (
    <div
      className="form"
      style={{ display: `${registerVisible ? "" : "none"}` }}
    >
      <input type="email" placeholder="your email" />
      <input type="password" placeholder="your password" />
      <a>Submit</a>
    </div>
  );
};

export default Register;
