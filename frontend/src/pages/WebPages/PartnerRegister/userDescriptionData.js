import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link, useHistory } from "react-router-dom";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import "./styles/partnerThree.css";

export default function EntrepreneurRegisterThree() {
  const now = 60;
  const history = useHistory()
  const [description, setDescription] = useState('')
  const [site, setSite] = useState('')

  function handleToStepFour(event) {
    event.preventDefault()
    const data = {
      description,
      site
    }

    if (
      data.description &&
      data.site) {
      localStorage.setItem('partnerThree', JSON.stringify(data))
      history.push('/partnerRegister/stepFour')
    }
  }

  useEffect(() => {
    if(localStorage.getItem('partnerThree')) {
      let json = JSON.parse(localStorage.getItem('partnerThree'))
      setDescription(json.description)
      setSite(json.site)
    }
  }, [])

  return (
    <div id="partnerThree">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainPartThree">
        <h3>Cadastro de parceiro - 3/5</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentPartThree">
          <form action="">
            <label htmlFor="description">Descrição</label>
            <textarea
              name=""
              id="descrption"
              value={description}
              onChange={e => setDescription(e.target.value)}
              cols="5"
              rows="5"
              placeholder="Escreva uma descrição de até 120 caracteres"
            />

            <label htmlFor="site">Site</label>
            <input type="text" id="site" value={site} onChange={e => setSite(e.target.value)} />
          </form>

          <div className="btnWay">
            <button>
              <Link to="/partnerRegister/stepTwo" className="btn">
                Voltar
              </Link>
            </button>

            <button className="btn" type="submit" onClick={handleToStepFour}>
              Continuar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
