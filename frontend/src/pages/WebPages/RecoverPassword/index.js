import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdCheckCircle, MdError } from "react-icons/md";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";

import api from "../../../services/api";

import "./styles/recover.css";
import "./styles/recoverResponsive.css";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [sended, setSended] = useState(false);
  const [error, setError] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const handleSendEmail = async () => {
    setPurchasing(!purchasing);

    try {
      await api.post("password/forgot", { email });

      setSended(true);
      setEmail("");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  let modalDataSended = (
    <div className="modalSendEmail">
      <MdCheckCircle size={100} color="#34cc20" />
      <p>Email de recuperação enviado para:</p>
      <p>{email}</p>
    </div>
  );

  let modalDataError = (
    <div className="modalSendEmail">
      <MdError size={100} color="#e02041" />
      <p>Erro ao enviar o email de recuperação</p>
    </div>
  );

  return (
    <div>
      <header>
        <Header />
      </header>

      <div className="recoverPassContainer">
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          {!sended ? (
            <Spinner />
          ) : sended ? (
            modalDataSended
          ) : error ? (
            modalDataError
          ) : (
            ""
          )}
        </Modal>
        <div className="recoverPassContent">
          <h3>Digite seu e-mail para recuperação</h3>

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleSendEmail}>Enviar</button>

          <p>
            Ainda não tem cadastro na Firgun?{" "}
            <font color="#3ba6ff">
              <Link to="/chooseRegister">Clique aqui.</Link>
            </font>
          </p>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
