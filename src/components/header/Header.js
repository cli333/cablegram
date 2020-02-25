import React, { useState, useContext } from "react";
import "./Header.css";
import Register from "../register/Register";

import { context } from "../../context/Provider";

import { checkTime } from "../../utils/utils";
import SignIn from "../signin/SignIn";
import SignOut from "../signout/SignOut";
import Send from "../send/Send";

const Header = () => {
  const {
    searchFilter,
    setSearchFilter,
    authUser,
    isSignInVisible,
    setIsSignInVisible,
    isRegisterVisible,
    setIsRegisterVisible,
    setIsModalShown
  } = useContext(context);

  const displayFollowers = () => {
    const { followers } = authUser;
    return `${followers.length} follower${
      followers.length > 1 || followers.length === 0 ? "s" : ""
    }`;
  };

  const displayFollowing = () => {
    const { following } = authUser;
    return `${following.length} following`;
  };

  return (
    <div className="head">
      <div className="head-head">
        <div className="left-box">
          <span style={{ fontStyle: "italic" }}>
            {authUser && authUser.author}
          </span>
          <br />
          <span>{authUser && displayFollowers()}</span>
          <br />
          <span>{authUser && displayFollowing()}</span>
        </div>

        <header className="header">CableGram Press</header>
      </div>

      <div className="subhead">
        <div className="form-wrapper">
          {!authUser && (
            <a onClick={() => setIsSignInVisible(!isSignInVisible)}>Sign In</a>
          )}
          {authUser && <SignOut />}

          <SignIn signInVisible={isSignInVisible} />
        </div>
        <div>
          <input
            type="text"
            placeholder="search grams"
            className="search"
            onChange={e => setSearchFilter(e.target.value)}
            value={searchFilter}
          />{" "}
          | {checkTime()}
        </div>
        {!authUser ? (
          <div className="form-wrapper">
            <a onClick={() => setIsRegisterVisible(!isRegisterVisible)}>
              Register
            </a>
            <Register registerVisible={isRegisterVisible} />
          </div>
        ) : (
          <React.Fragment>
            <a onClick={() => setIsModalShown(true)}>Send a Gram</a>
            <Send />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
