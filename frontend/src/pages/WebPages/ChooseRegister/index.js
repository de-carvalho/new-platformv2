import React from "react";
import { Link } from "react-router-dom";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

import "./styles/choose.css";
import "./styles/chooseResponsive.css";

export default function ChooseRegister() {
  return (
    <>
      <header>
        <Header />
      </header>

      <div id="midChoice">
        <h2>Formas de cadastro</h2>
        <div className="choiceTop">
          <div className="field">
            <Link to="/entrepreneurRegister/stepOne">
              <h3>Cadastro de Empreendedor</h3>
            </Link>
          </div>
          <div className="field">
            <Link to="/partnerRegister/stepOne">
              <h3>Cadastro de Parceiro</h3>
            </Link>
          </div>
        </div>

        <div className="choiceBot">
          <div className="field">
            <Link to="/registerInvestor">
              <h3>Cadastro de Investidor CNPJ</h3>
            </Link>
          </div>
          <div className="field">
            <Link to="/investorRegister/stepOne">
              <h3>Cadastro de Investidor Pessoa física</h3>
            </Link>
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
