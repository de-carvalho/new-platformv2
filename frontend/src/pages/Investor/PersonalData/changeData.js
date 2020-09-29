import React from "react";
import { Link } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import "./styles/personal.css";
import "./styles/personalResponsive.css";

export default function ChangeData() {
  return (
    <>
      <MenuMobile />
      <div id="personal">
        <Menu />

        <div className="content">
          <HeaderDash />

          <div className="perData">
            <h3>Editar informações - Alteração de senha</h3>

            <div className="edit">
              <label>
                Alterar Imagem:
                <input type="image" alt="Imagem do usuário" />
              </label>
            </div>

            <div className="edit">
              <label>
                Senha:
                <input type="text" />
              </label>

              <label>
                Confirmar senha:
                <input type="text" />
              </label>
            </div>

            <div>
              <Link to="/personalBankData">
                <button>Voltar</button>
              </Link>
              <button>Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
