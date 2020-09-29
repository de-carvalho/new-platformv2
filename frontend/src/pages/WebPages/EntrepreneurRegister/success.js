import React, { useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import "./styles/stepFour.css";

export default function EntrepreneurRegisterFour() {
  const now = 100;
  useEffect(() => {
    const stepOne = localStorage.getItem('entrepreneurOne')
    const stepTwo = localStorage.getItem('entrepreneurTwo')
    const stepThree = localStorage.getItem('entrepreneurThree')
    const stepFour = localStorage.getItem('entrepreneurFour')
    localStorage.clear()
    const data = {
      ...JSON.parse(stepOne),
      ...JSON.parse(stepTwo),
      ...JSON.parse(stepThree),
      password: stepFour,
    }
    
  }, [])
  return (
    <div id="stepFour">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainFour">
        <h3>Cadastro de entrepreneur - 5/5</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentFour">
          <h2>Cadastro realizado com sucesso!</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}
