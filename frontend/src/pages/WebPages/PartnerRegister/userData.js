import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useHistory } from "react-router-dom";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import "./styles/partnerOne.css";

export default function PartnerRegister() {
  const now = 20;
  const history = useHistory()
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [birth, setBirth] = useState('')

  function handleToStepTwo(event) {
    event.preventDefault()
    const data = {
      name,
      lastName,
      cpf,
      email,
      birth,
    }

    if (
      data.name &&
      data.lastName &&
      data.cpf &&
      data.email &&
      data.birth) {
      localStorage.setItem('partnerOne', JSON.stringify(data))
      history.push('/partnerRegister/stepTwo')
    }
  }

  useEffect(() => {
    if(localStorage.getItem('partnerOne')) {
      let json = JSON.parse(localStorage.getItem('partnerOne'))
      setName(json.name)
      setLastName(json.lastName)
      setEmail(json.email)
      setCpf(json.cpf)
      setBirth(json.birth)
    }
  }, [])

  return (
    <div id="partOne">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainPartOne">
        <h3>Cadastro de parceiro - 1/5</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentPartOne">
          <form>
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

            <label htmlFor="lastName">Sobrenome</label>
            <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

            <label htmlFor="cpf">CPF</label>
            <InputMask id="cpf" mask="999.999.999-99" type="text" value={cpf} onChange={e => setCpf(e.target.value)} />

            <label htmlFor="birth">Data de nascimento</label>
            <InputMask id="birth" mask="99/99/9999" type="text" value={birth} onChange={e => setBirth(e.target.value)} />

            <button className="btn mx-auto mb-3" type="submit" onClick={handleToStepTwo}>
              Continuar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
