import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Context as UserContext } from "../../context/userContext";

import myWays from "../../assets/myWays.png";
import "./Header.css";

const Header = () => {
  const history = useHistory();
  const { logout } = useContext(UserContext);

  // console.log("user state", state);

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
            {/* <li className="item">
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
            </li> */}
            {localStorage.getItem("token") ? (
              <div>
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
                  <Button
                    onClick={() => {
                      logout();
                      history.push("/");
                      console.log("logout call");
                    }}
                    color="teal darken-3"
                  >
                    LOG OUT
                  </Button>
                </li>
              </div>
            ) : (
              <div>
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
              </div>
            )}
            {/*Logged in items  */}
            {/* <li className="item">
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
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
