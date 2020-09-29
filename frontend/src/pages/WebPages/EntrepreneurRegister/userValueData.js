import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link, useHistory } from "react-router-dom";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import "./styles/stepThree.css";

export default function EntrepreneurRegisterThree() {
  const now = 60;
  const history = useHistory()
  const [value, setValue] = useState('')
  const [howKnow, setHowKnow] = useState('')
  const [whatReason, setWhatReason] = useState('')
  const [whichSegment, setWhichSegment] = useState('')

  function handleSelectHowKnow(event) {
    setHowKnow(event.target.value);
  }

  function handleSelectWhatReason(event) {
    setWhatReason(event.target.value);
  }

  function handleSelectWhichSegment(event) {
    setWhichSegment(event.target.value);
  }

  function handleToStepFour(event) {
    event.preventDefault()
    const data = {
      value,
      howKnow,
      whatReason,
      whichSegment
    }

    if (
      data.value &&
      data.howKnow &&
      data.whatReason &&
      data.whichSegment) {
      localStorage.setItem('entrepreneurThree', JSON.stringify(data))
      history.push('/entrepreneurRegister/stepFour')
    }
  }

  useEffect(() => {
    if(localStorage.getItem('entrepreneurThree')) {
      let json = JSON.parse(localStorage.getItem('entrepreneurThree'))
      setValue(json.value)
      setHowKnow(json.howKnow)
      setWhatReason(json.whatReason)
      setWhichSegment(json.whichSegment)
    }
  }, [])

  return (
    <div id="stepThree">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainThree">
        <h3>Cadastro de entrepreneur - 3/5</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentThree">
          <form>
            <label htmlFor="value">Valor desejado:</label>
            <input type="text" id="value" value={value} onChange={e => setValue(e.target.value)} />

            <label htmlFor="howKnow">Como soube da Firgun?:</label>
            <select id="howKnow" value={howKnow} onChange={handleSelectHowKnow}>
              <option selected>Selecione</option>
              <option value="Amigos">Amigos</option>
              <option value="A banca">A banca</option>
              <option value="AfroBusiness Brasil">AfroBusiness Brasil</option>
              <option value="Afropolitan">Afropolitan</option>
              <option value="Agência Solano Trindade">Agência Solano Trindade</option>
              <option value="Aliança entrepreneura">Aliança entrepreneura</option>
              <option value="Anpecom">Anpecom</option>
              <option value="ArqCoop+">ArqCoop+</option>
              <option value="ASPLANDE">ASPLANDE</option>
              <option value="Associação MIGRAFLIX">Associação MIGRAFLIX</option>
              <option value="AMIP - Associação Moda Íntima e Praia de Taiobeiras">
                AMIP - Associação Moda Íntima e Praia de Taiobeiras
              </option>
              <option value="Aventura de Construir">Aventura de Construir</option>
              <option value="Brado Edu">Brado Edu</option>
              <option value="CIEDS">CIEDS</option>
              <option value="COLETANDO SOLUÇÕES TECNOLOGIA LTDA">COLETANDO SOLUÇÕES TECNOLOGIA LTDA</option>
              <option value="Consulado da Mulher">Consulado da Mulher</option>
              <option value="Empreende Aí">Empreende Aí</option>
              <option value="Feira Preta">Feira Preta</option>
              <option value="GAMBIARRA Espaço Criativo e Coletivo">GAMBIARRA Espaço Criativo e Coletivo</option>
              <option value="Google">Google</option>
              <option value="INSTITUTO ALINHA">INSTITUTO ALINHA </option>
              <option value="Makeda Cosméticos">Makeda Cosméticos</option>
              <option value="Mensageiros da Esperança">Mensageiros da Esperança</option>
              <option value="Repagina.me">Repagina.me</option>
              <option value="SINCOTEC-MT">SINCOTEC-MT</option>
              <option value="TEAR - estratégia em inovação e expansão">TEAR - estratégia em inovação e expansão</option>
              <option value="Outros">Outros</option>
            </select>

            <label htmlFor="whatReason">Qual o motivo do crédito?:</label>
            <select id="whatReason" value={whatReason} onChange={handleSelectWhatReason}>
              <option selected>Selecione</option>
              <option value="Capital de giro">Capital de giro</option>
              <option value="Infraestrutura">Infraestrutura</option>
              <option value="Marketing">Marketing</option>
              <option value="Pagar divida">Pagar divida</option>
              <option value="Contratação">Contratação</option>
              <option value="Estoque">Estoque</option>
              <option value="Outros">Outros</option>
            </select>

            <label htmlFor="whichSegment">Qual seu segmento de mercado?:</label>
            <select name="" id="whichSegment" value={whichSegment} onChange={handleSelectWhichSegment}>
              <option selected>Selecione</option>
              <option value="Salão de beleza">Salão de beleza</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Artesanato">Artesanato</option>
              <option value="Educação">Educação</option>
              <option value="Moda">Moda</option>
              <option value="Loja (varejo)">Loja (varejo)</option>
              <option value="Prestação de serviço">Prestação de serviço</option>
              <option value="Turismo">Turismo</option>
              <option value="Agricultura">Agricultura</option>
              <option value="Outro">Outro</option>
            </select>
          </form>

          <div className="btnWay">
            <button>
              <Link to="/entrepreneurRegister/stepTwo" className="btn">
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
