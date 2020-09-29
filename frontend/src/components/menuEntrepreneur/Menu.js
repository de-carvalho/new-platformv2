import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaMoneyCheckAlt,
  FaTicketAlt,
  FaListAlt,
} from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { TiDocumentText, TiDocument } from "react-icons/ti";
import { AiOutlineIdcard } from "react-icons/ai";

import Logo from "../../assets/images/logo.png";
import api from "../../services/api";

import "./styles/menuEntr.css";
import "./styles/menuEntrResponsive.css";

export default function Menu(props) {
  const [projectBalance, setProjectBalance] = useState({});

  useEffect(() => {
    api.get("entrepreneurs/project-not-refunded").then((project) => {
      api
        .get("projects/balance", {
          params: { project_id: project.data.id },
        })
        .then((balance) => {
          setProjectBalance(balance.data);
        });
    });
  }, [props.loaded]);

  return (
    <div id="menu">
      <img src={Logo} alt="Logo da Firgun" />
      <h3>Menu Empreendedor</h3>

      <div className="options">
        <NavLink
          to="/entrepreneurHome"
          className="optionItem"
          activeClassName="active"
        >
          <FaHome className="icon" />
          Home
        </NavLink>

        <NavLink
          to="/entrepreneurProject"
          className="optionItem"
          activeClassName="active"
        >
          <AiOutlineIdcard className="icon" />
          Projeto
        </NavLink>
        <NavLink
          to="/psicometricTest"
          className="optionItem"
          activeClassName="active"
        >
          <FiClipboard className="icon" />
          Teste psicométrico
        </NavLink>
        <NavLink
          to="/sendDocuments"
          className="optionItem"
          activeClassName="active"
        >
          <TiDocument className="icon" />
          Documentos projeto
        </NavLink>
        <NavLink
          to="/entrepreneurContract"
          className="optionItem"
          activeClassName="active"
        >
          <TiDocumentText className="icon" />
          Contrato
        </NavLink>
        <NavLink
          to="/entrepreneurLoan"
          className="optionItem"
          activeClassName="active"
        >
          <FaMoneyCheckAlt className="icon" />
          Empréstimo
        </NavLink>
        <NavLink
          to="/generateTicket"
          className="optionItem"
          activeClassName="active"
        >
          <FaTicketAlt className="icon" />
          Gerar boleto
        </NavLink>
        <NavLink
          to="/paymentStatement"
          className="optionItem"
          activeClassName="active"
        >
          <FaListAlt className="icon" />
          Extrato de pagamento
        </NavLink>
        <NavLink
          to="/payOffBalance"
          className="optionItem"
          activeClassName="active"
        >
          <FaTicketAlt className="icon" />
          Quitar saldo devedor
        </NavLink>
        <NavLink
          to="/entrepreneurFirgunDocuments"
          className="optionItem"
          activeClassName="active"
        >
          <TiDocument className="icon" />
          Documentos Firgun
        </NavLink>
        <NavLink
          to="/withdrawValue"
          className="optionItem"
          activeClassName="active"
        >
          <GiReceiveMoney className="icon" />
          Sacar valor
        </NavLink>
      </div>

      <div className="balanceMenu">
        <div className="balContainer">
          <h5>Seu saldo:</h5>
          <p>R$ {!projectBalance.current ? "0" : projectBalance.current},00</p>
        </div>
      </div>
    </div>
  );
}
