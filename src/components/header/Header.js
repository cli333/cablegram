import React, { useState, useContext } from "react";
import "./Header.css";
import Register from "../register/Register";

import { context } from "../../context/Provider";

import { checkTime } from "../../utils/utils";
import SignIn from "../signin/SignIn";
import SignOut from "../signout/SignOut";

const Header = () => {
  const { searchFilter, setSearchFilter, user } = useContext(context);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);
  return (
    <div className="head">
      <div className="head-head">
        <div className="left-box">
          <span style={{ fontStyle: "italic" }}>USER NAME HERE</span>
          <br />
          <span>POSTS</span>
          <br />
          <span>FOLLOWERS</span>
          <br />
          <span>FOLLOWERS</span>
        </div>

        <header className="header">CableGram Press</header>
      </div>

      <div className="subhead">
        <div className="form-wrapper">
          {/* set conditional signin singOut here*/}
          {/* build sign out component*/}
          {!user && (
            <a onClick={() => setSignInVisible(!signInVisible)}>Sign In</a>
          )}
          {user && <SignOut />}

          <SignIn signInVisible={signInVisible} />
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
        <div className="form-wrapper">
          <a onClick={() => setRegisterVisible(!registerVisible)}>Register</a>
          <Register registerVisible={registerVisible} />
        </div>
      </div>
    </div>
  );
};

export default Header;
