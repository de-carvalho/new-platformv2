import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useHistory } from "react-router-dom";

import Header from "../../../components/header/Header";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Footer from "../../../components/footer/Footer";

import api from '../../../services/api'

import "./styles/stepOne.css";

export default function EntrepreneurRegister() {
  const now = 20;
  const history = useHistory()
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [birth, setBirth] = useState('')
  const [genre, setGenre] = useState('')
  const [breed, setBreed] = useState('')

  function handleSelectGenre(event) {
    setGenre(event.target.value);
  }

  function handleSelectBreed(event) {
    setBreed(event.target.value);
  }

  function handleToStepTwo(event) {
    event.preventDefault()
    const data = {
      name,
      lastName,
      cpf,
      email,
      genre,
      birth,
      breed
    }

    if (
      data.name &&
      data.lastName &&
      data.cpf &&
      data.email &&
      data.birth &&
      data.genre &&
      data.breed) {
      localStorage.setItem('entrepreneurOne', JSON.stringify(data))
      history.push('/entrepreneurRegister/stepTwo')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('entrepreneurOne')) {
      let json = JSON.parse(localStorage.getItem('entrepreneurOne'))
      setName(json.name)
      setLastName(json.lastName)
      setEmail(json.email)
      setCpf(json.cpf)
      setBirth(json.birth)
      setGenre(json.genre)
      setBreed(json.breed)
    }
  }, [])

  return (
    <div id="stepOne">
      <MenuMobile />
      <header>
        <Header />
      </header>
      <div className="mainOne">
        <h3>Cadastro de entrepreneur - 1/5</h3>
        <div className="levels">
          <ProgressBar id="bar">
            <ProgressBar now={now} label={`${now}%`} />
          </ProgressBar>
        </div>
        <div className="contentOne">
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

            <label htmlFor="genre">Gênero</label>
            <select name="genre" id="genre" value={genre} onChange={handleSelectGenre}>
              <option selected >Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>

            <label htmlFor="breed">Raça</label>
            <select name="breed" id="breed" value={breed} onChange={handleSelectBreed}>
              <option value="preto" selected>Preto</option>
              <option value="pardo">Pardo(a)</option>
              <option value="branco">Branco(a)</option>
              <option value="amarelo">Amarelo(a)</option>
              <option value="indígena">Indígena</option>
            </select>

            <button className="btn" type="submit" onClick={handleToStepTwo}>
              Continuar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
