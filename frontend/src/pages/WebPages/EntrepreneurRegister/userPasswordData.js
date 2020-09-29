import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link, useHistory } from "react-router-dom";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import "./styles/stepFour.css";

export default function EntrepreneurRegisterFour() {
  const now = 80;
  const history = useHistory()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleToSuccess(event) {
    event.preventDefault()

    if (password === confirmPassword && password && confirmPassword) {
      localStorage.setItem('entrepreneurFour', password)
      history.push('/entrepreneurRegister/success')
    } else {
      alert('as senhas são diferentes')
    }
  }
  return (
    <div id="stepFour">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainFour">
        <h3>Cadastro de entrepreneur - 4/5</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentFour">
          <form action="">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </form>

          <div className="btnWay">
            <button>
              <Link to="/entrepreneurRegister/stepThree" className="btn">
                Voltar
              </Link>
            </button>

            <button type="submit" className="btn" onClick={handleToSuccess}>
                Continuar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
