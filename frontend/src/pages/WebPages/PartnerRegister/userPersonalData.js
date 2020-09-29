import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link, useHistory } from "react-router-dom";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import "./styles/partnerTwo.css";

export default function EntrepreneurRegisterTwo() {
  const now = 40;
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
      localStorage.setItem('partnerTwo', JSON.stringify(data))
      history.push('/partnerRegister/stepThree')
    }
  }

  useEffect(() => {
    if(localStorage.getItem('partnerTwo')) {
      let json = JSON.parse(localStorage.getItem('partnerTwo'))
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
    <div id="partnerTwo">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainPartTwo">
        <h3>Cadastro de parceiro - 2/5</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentPartTwo">
          <form>
            <label htmlFor="phone">Nº de telefone</label>
            <InputMask id="phone" mask="+55 (99) 99999-9999" type="text" value={phone} onChange={e => setPhone(e.target.value)} />

            <label htmlFor="cep">CEP</label>
            <InputMask mask="99999-999" type="text" id="cep" value={cep} onChange={e => setCep(e.target.value)} />

            <label htmlFor="address">Endereço</label>
            <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} />

            <label htmlFor="numberAddress">Número</label>
            <input type="text" id="numberAddress" value={numberAddress} onChange={e => setNumberAddress(e.target.value)} />

            <label htmlFor="complement">Complemento</label>
            <input type="text" id="complement" value={complement} onChange={e => setComplement(e.target.value)} />

            <label htmlFor="city">Cidade</label>
            <input type="text" id="city" value={city} onChange={e => setCity(e.target.value)} />

            <label htmlFor="state">Estado</label>
            <input type="text" id="state" value={state} onChange={e => setState(e.target.value)} />

            <label htmlFor="neighborhood">Bairro</label>
            <input type="text" id="neighborhood" value={neighborhood} onChange={e => setNeighborhood(e.target.value)} />
          </form>

          <div className="btnWay">
            <button>
              <Link to="/partnerRegister/stepOne" className="btn">
                Voltar
              </Link>
            </button>

            <button type="submit" className="btn text-white" onClick={handleToStepThree}>
              Continuar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
