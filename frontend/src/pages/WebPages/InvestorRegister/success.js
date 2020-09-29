import React, { useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import "./styles/investorFour.css";

export default function InvestorRegisterFour() {
  const now = 100;
  useEffect(() => {
    const stepOne = localStorage.getItem('investorOne')
    const stepTwo = localStorage.getItem('investorTwo')
    const stepThree = localStorage.getItem('investorThree')
    localStorage.clear()
    const data = {
      ...JSON.parse(stepOne),
      ...JSON.parse(stepTwo),
      password: stepThree,
    }
    
  }, [])
  return (
    <div id="investorFour">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainInvestFour">
        <h3>Cadastro de investidor - 5/5</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentInvestFour">
          <h2>Cadastro realizado com sucesso!</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}
