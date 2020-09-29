import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaRegAddressCard,
  FaMoneyCheckAlt,
  FaListAlt,
} from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { TiDocument } from "react-icons/ti";
import Logo from "../../assets/images/logo.png";
import api from "../../services/api";

import "./styles/menuInvest.css";
import "./styles/menuInvestResponsive.css";

export default function Menu(props) {
  const [userBalance, setUserBalance] = useState({});

  useEffect(() => {
    api.get("balances").then((response) => {
      setUserBalance(response.data);
    });
  }, [props.loaded]);

  return (
    <div id="menu">
      <img src={Logo} alt="Logo da Firgun" />
      <h3>Menu Investidor</h3>

      <div className="options">
        <NavLink
          to="/investorHome"
          className="optionItem"
          activeClassName="active"
        >
          <FaHome className="icon" />
          Home
        </NavLink>

        <NavLink
          to="/personalData"
          className="optionItem"
          activeClassName="active"
        >
          <FaUser className="icon" />
          Dados pessoais
        </NavLink>
        <NavLink
          to="/investorProfile"
          className="optionItem"
          activeClassName="active"
        >
          <FaRegAddressCard className="icon" />
          Perfil de investidor
        </NavLink>
        <NavLink
          to="/investorDocuments"
          className="optionItem"
          activeClassName="active"
        >
          <TiDocumentText className="icon" />
          Documentos investidor
        </NavLink>
        <NavLink
          to="/investorTransfer"
          className="optionItem"
          activeClassName="active"
        >
          <AiOutlineTransaction className="icon" />
          Transferência entre contas
        </NavLink>
        <NavLink
          to="/investmentSituation"
          className="optionItem"
          activeClassName="active"
        >
          <FaMoneyCheckAlt className="icon" />
          Situação investimentos
        </NavLink>
        <NavLink
          to="/balanceStatement"
          className="optionItem"
          activeClassName="active"
        >
          <FaListAlt className="icon" />
          Extrato bancário
        </NavLink>
        <NavLink
          to="/withdrawBalance"
          className="optionItem"
          activeClassName="active"
        >
          <GiReceiveMoney className="icon" />
          Sacar dinheiro
        </NavLink>
        <NavLink
          to="/firgunDocuments"
          className="optionItem"
          activeClassName="active"
        >
          <TiDocument className="icon" />
          Documentos FIRGUN
        </NavLink>
      </div>

      <div className="balanceMenu">
        <div className="balContainer">
          <h5>Seu saldo:</h5>
          <p>R$ {!userBalance.current ? "0" : userBalance.current},00</p>
        </div>
      </div>
    </div>
  );
}
