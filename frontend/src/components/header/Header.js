import React, { Component } from "react";
import { Link } from "react-router-dom";

import Button from "../button/Button";

import "./styles/header.css";
import "./styles/headerResponsive.css";

import Logo from "../../assets/images/logo.png";

export class Header extends Component {
  render() {
    return (
      <div id="head">
        <header>
          <img src={Logo} alt="Logo da Firgun" />
          <ul>
            <Link to="/about" className="link">
              sobre
            </Link>
            <Link to="/projects" className="link">
              projetos
            </Link>
            <Link to="/partners" className="link">
              parceiros
            </Link>
            <Link to="/" className="link">
              blog
            </Link>
            <Link to="/contact" className="link">
              contato
            </Link>
          </ul>
          <Button as={Link} to="/login">
            login
          </Button>
        </header>
      </div>
    );
  }
}

export default Header;
