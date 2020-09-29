import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link, useHistory } from "react-router-dom";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import "./styles/investorTwo.css";

export default function InvestorRegisterTwo() {
  const now = 50;
  const history = useHistory()
  const [phone, setPhone] = useState('')
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState('')
  const [numberAddress, setNumberAddress] = useState('')
  const [complement, setComplement] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [neighborhood, setNeighborhood] = useState('')

  function handleToStepThree(event) {
    event.preventDefault()
    const data = {
      phone,
      cep,
      numberAddress,
      address,
      complement,
      city,
      state,
      neighborhood
    }

    if (
      data.phone &&
      data.cep &&
      data.numberAddress &&
      data.address &&
      data.city &&
      data.state &&
      data.neighborhood) {
        localStorage.setItem('investorTwo', JSON.stringify(data))
      history.push('/investorRegister/stepThree')
    }
  }

  useEffect(() => {
    if(localStorage.getItem('investorTwo')) {
      let json = JSON.parse(localStorage.getItem('investorTwo'))
      setPhone(json.phone)
      setCep(json.cep)
      setAddress(json.address)
      setNumberAddress(json.numberAddress)
      setComplement(json.complement)
      setCity(json.city)
      setState(json.state)
      setNeighborhood(json.neighborhood)
    }
  }, [])
  return (
    <div id="investorTwo">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainInvestTwo">
        <h3>Cadastro de investidor - 2/4</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentInvestTwo">
        <form>
            <label htmlFor="phone">Nº de telefone</label>
            <InputMask id="phone"  mask="+55 (99) 99999-9999" type="text" value={phone} onChange={e => setPhone(e.target.value)} />

            <label htmlFor="cep">CEP</label>
            <InputMask mask="99999-999" type="text" id="cep" value={cep} onChange={e => setCep(e.target.value)}/>

            <label htmlFor="address">Endereço</label>
            <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} />

            <label htmlFor="numberAddress">Número</label>
            <input type="text" id="numberAddress" value={numberAddress} onChange={e => setNumberAddress(e.target.value)}/>

            <label htmlFor="complement">Complemento</label>
            <input type="text" id="complement" value={complement} onChange={e => setComplement(e.target.value)}/>

            <label htmlFor="city">Cidade</label>
            <input type="text" id="city" value={city} onChange={e => setCity(e.target.value)}/>

            <label htmlFor="state">Estado</label>
            <input type="text" id="state" value={state} onChange={e => setState(e.target.value)}/>

            <label htmlFor="neighborhood">Bairro</label>
            <input type="text" id="neighborhood" value={neighborhood} onChange={e => setNeighborhood(e.target.value)}/>
          </form>

          <div className="btnWay">
            <button>
              <Link to="/investorRegister/stepOne" className="btn">
                Voltar
              </Link>
            </button>
            <button type="submit" className="btn" onClick={handleToStepThree}>
              Continuar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
