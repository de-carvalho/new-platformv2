import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";

import api from "../../../../services/api";

import "./styles/styles.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default function ResetPassword() {
  const location = useLocation();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSendEmail = async () => {
    const token = location.search.replace("?token=", "");

    try {
      if (!token) {
        throw new Error();
      }

      await api.post("password/reset", {
        password,
        passwordConfirmation,
        token,
      });
      toast.success("Senha resetada com sucesso");

      history.push("/login");
    } catch (error) {
      toast.error("Erro ao resetar a senha, tente novamente");
      console.log(error);
    }
  };

  return (
    <div>
      <header>
        <Header />
      </header>

      <div className="recoverPassContainer">
        <div className="recoverPassContent">
          <h3>Recuperação de senha</h3>

          <input
            type="password"
            className="inputOption"
            placeholder="Digite a nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="inputOption"
            placeholder="Confirme sua senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <button onClick={handleSendEmail}>Alterar senha</button>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
