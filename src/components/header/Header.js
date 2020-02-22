import React from "react";
import "./styles.css";

import { checkTime } from "../../utils/utils";

const Header = () => {
  return (
    <div className="head">
      <div class="head-head">
        <div class="left-box">
          <span style={{ fontStyle: "italic" }}>USER NAME HERE</span>
          <br />
          <span>POSTS</span>
          <br />
          <span>FOLLOWERS</span>
          <br />
          <span>FOLLOWERS</span>
        </div>

        <header className="head-header">CableGram Press</header>
      </div>

      <div class="subhead">
        <div>
          <a href="#">Login | Logout</a>
        </div>
        <div>
          <input placeholder="search grams" /> | {checkTime()}
        </div>
        <div>
          <a href="#">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
