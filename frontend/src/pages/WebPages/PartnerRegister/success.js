import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import "./styles/partnerFour.css";
import { useEffect } from "react";

export default function EntrepreneurRegisterFour() {
  const now = 100;
  useEffect(() => {
    const stepOne = localStorage.getItem('partnerOne')
    const stepTwo = localStorage.getItem('partnerTwo')
    const stepThree = localStorage.getItem('partnerThree')
    const stepFour = localStorage.getItem('partnerFour')
    localStorage.clear()
    const data = {
      ...JSON.parse(stepOne),
      ...JSON.parse(stepTwo),
      ...JSON.parse(stepThree),
      password: stepFour,
    }
    
  }, [])
  return (
    <div id="partnerFour">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainPartFour">
        <h3>Cadastro de parceiro - 5/5</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentPartFour">
          <h2>Cadastro realizado com sucesso!</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}
