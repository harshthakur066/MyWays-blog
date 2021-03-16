import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import myWays from "../../assets/myWays.png";
import "./Navbar.css";

const Navbar = () => {
  const history = useHistory();

  const [user, setUser] = useState({});

  const getUser = () => {};
  useEffect(() => {
    getUser();
  });

  return (
    <div>
      <nav className="white">
        <div className="nav-wrapper white view">
          <a href="/" className="brand-logo ">
            <div className="logo">
              <img src={myWays} alt="logo" />
              <div className="logo-name">MyWays</div>
            </div>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="item">
              <Button
                onClick={() => history.push("/signin")}
                basic
                color="teal"
              >
                LOG IN
              </Button>
            </li>
            <li>
              <Button
                onClick={() => history.push("/signup")}
                color="teal darken-3"
              >
                REGISTER
              </Button>
            </li>
            {/*Logged in items  */}
            <li className="item">
              <Button
                onClick={() => history.push("/blog/post")}
                basic
                color="teal"
              >
                ADD
              </Button>
            </li>
            <li>
              <Button onClick={() => history.push("/")} color="teal darken-3">
                LOG OUT
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
