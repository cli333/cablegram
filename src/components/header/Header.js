import React, { useContext } from "react";
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

  return (
    <div className="head">
      <div className="head-head">
        <header className="header">CableGram Press</header>
      </div>

      <div className="subhead">
        <div className="form-wrapper left">
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
          <span className="header-time">| {checkTime()}</span>
        </div>
        {!authUser ? (
          <div className="form-wrapper right">
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
