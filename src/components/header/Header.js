import React, { useContext } from "react";
import "./Header.css";
import Register from "../register/Register";
import { context } from "../../context/Provider";
import { checkTime } from "../../utils/utils";
import SignIn from "../signin/SignIn";
import SignOut from "../signout/SignOut";
import Send from "../send/Send";
import useComponentVisible from "../../hooks/useComponentVisible";

const Header = () => {
  const {
    searchFilter,
    setSearchFilter,
    authUser,
    setIsModalShown
  } = useContext(context);
  const {
    ref: ref1,
    isComponentVisible: isSignInVisible,
    setIsComponentVisible: setIsSignInVisible
  } = useComponentVisible(false);
  const {
    ref: ref2,
    isComponentVisible: isRegisterVisible,
    setIsComponentVisible: setIsRegisterVisible
  } = useComponentVisible(false);

  return (
    <div ref={ref1}>
      <div className="head" ref={ref2}>
        <div className="head-head">
          <header className="header">CableGram Press</header>
        </div>

        <div className="subhead">
          <div className="form-wrapper left">
            {!authUser && (
              <span
                className="link"
                onClick={() => setIsSignInVisible(!isSignInVisible)}
              >
                Sign In
              </span>
            )}
            {authUser && <SignOut />}

            <SignIn
              signInVisible={isSignInVisible}
              setIsSignInVisible={setIsSignInVisible}
            />
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
              <span
                className="link"
                onClick={() => setIsRegisterVisible(!isRegisterVisible)}
              >
                Register
              </span>
              <Register registerVisible={isRegisterVisible} />
            </div>
          ) : (
            <React.Fragment>
              <span className="link" onClick={() => setIsModalShown(true)}>
                Send a Gram
              </span>
              <Send />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
