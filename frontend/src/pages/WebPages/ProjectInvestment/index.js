import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaCreditCard, FaBarcode, FaTicketAlt } from "react-icons/fa";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

import "./styles/projectInvest.css";
import "./styles/projectInvestResponsive.css";

import Teste from "../../../assets/images/teste.jpg";

export default function ProjectInvestment() {
  const now = 60;
  return (
    <div id="projectInvest">
      <Header />

      <div id="mainProject">
        <div className="contentProject">
          <h3>Nome do projeto</h3>
          <div className="info">
            <img src={Teste} alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <ProgressBar id="progress">
            <ProgressBar animated now={now} label={`${now}%`} />
          </ProgressBar>

          <div className="pay">
            <span>
              Total de investimento no projeto:<p>R$ 10.000,00</p>
            </span>

            <div className="inpt">
              <label htmlFor="">Informe o valor:</label>
              <input type="text" />
            </div>
          </div>
          <div className="opts">
            <FaCreditCard className="icons" />
            <FaBarcode className="icons" />
            <FaTicketAlt className="icons" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
