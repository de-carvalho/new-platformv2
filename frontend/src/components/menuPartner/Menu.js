import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaRegAddressCard,
  FaUserCheck,
  FaWallet,
} from "react-icons/fa";

import Logo from "../../assets/images/logo.png";

import "./styles/menu.css";
import "./styles/menuResponsive.css";

export class Menu extends Component {
  render() {
    return (
      <div id="menu">
        <img src={Logo} alt="Logo da Firgun" />
        <h3>Menu Parceiro</h3>

        <div className="options">
          <Link to="/partnerHome" className="h4">
            <FaHome className="icon" />
            Home
          </Link>

          <Link to="/partnerData" className="h4">
            <FaUser className="icon" />
            Dados pessoais
          </Link>
          <Link to="/registerEntrepreneur" className="h4">
            <FaRegAddressCard className="icon" />
            Cadastrar empreendedor
          </Link>
          <Link to="/approveEntrepreneur" className="h4">
            <FaUserCheck className="icon" />
            Aprovar empreendedor
          </Link>
          <Link to="/walletEntrepreneur" className="h4">
            <FaWallet className="icon" />
            Carteira empreendedores
          </Link>
        </div>
      </div>
    );
  }
}

export default Menu;
