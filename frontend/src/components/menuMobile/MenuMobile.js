import React, { Component } from "react";
import { FiMenu } from "react-icons/fi";

import "./styles/menuMobile.css";

import Logo from "../../assets/images/logo.png";

export class MenuMobile extends Component {
  render() {
    return (
      <div id="mobile">
        <div className="navigation">
          <div className="content">
            <img src={Logo} alt="Logo da Firgun" />
            <FiMenu className="navIcon" />
          </div>
        </div>
      </div>
    );
  }
}

export default MenuMobile;
