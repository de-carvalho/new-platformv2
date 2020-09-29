import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../../auth/auth";

import Logo from "../../../assets/images/logo.png";

import "./styles/login.css";
import "./styles/loginResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwordHash, setpasswordHash] = useState("");

  const { signIn, user } = useAuth();

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await signIn({
        email,
        passwordHash,
      });

      if (user.role === "ENTREPRENEUR") {
        history.push("/entrepreneurHome");
      }
      if (user.role === "SUPPORTER") {
        history.push("/investorHome");
      }
      if (user.role === "PARTNER") {
        history.push("/partnerHome");
      }
    } catch (err) {
      toast.error("Falha ao fazer login, Email ou Senha incorretos.");
      setpasswordHash("");
    }
  }

  return (
    <div id="loginContainer">
      <img src={Logo} alt="Logo da Firgun" />
      <form onSubmit={handleLogin}>
        <div className="loginContent">
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={passwordHash}
            onChange={(e) => setpasswordHash(e.target.value)}
          />
          <button>Entrar</button>

          <p>
            Esqueceu sua senha?
            <font color="#3ba6ff">
              <Link to="/recoverPassword">Clique aqui.</Link>
            </font>
          </p>
          <p>
            Ainda não tem cadastro na Firgun?
            <font color="#3ba6ff">
              <Link to="/chooseRegister">Clique aqui.</Link>
            </font>
          </p>
        </div>
      </form>
    </div>
  );
}
