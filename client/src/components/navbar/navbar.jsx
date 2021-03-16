import React from "react";
import { Button } from "semantic-ui-react";
import myWays from "../../assets/myWays.png";
import "./navbar.css";

const Navbar = () => {
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
              <Button basic color="teal">
                LOG IN
              </Button>
            </li>
            <li>
              <Button color="teal darken-3">REGISTER</Button>
            </li>
            {/*Logged in items  */}
            <li className="item">
              <Button basic color="teal">
                SETTNGS
              </Button>
            </li>
            <li>
              <Button color="teal darken-3">LOG OUT</Button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
