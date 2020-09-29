import React from "react";
import { Link } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import "./styles/personal.css";
import "./styles/personalResponsive.css";

export default function PersonalBankData() {
  return (
    <>
      <MenuMobile />
      <div id="personal">
        <Menu />

        <div className="content">
          <HeaderDash />

          <div className="perData">
            <h3>Editar informações - Dados bancários</h3>

            <div className="edit">
              <label>
                Banco:
                <select>
                  <option>Banco Itaú</option>
                  <option>Banco do Brasil</option>
                  <option>Banco Santander</option>
                  <option>Caixa federal</option>
                  <option>Banco Bradesco</option>
                </select>
              </label>

              <label>
                Tipo de conta:
                <select>
                  <option>Poupança</option>
                  <option>Corrente</option>
                </select>
              </label>
            </div>

            <div className="edit">
              <label>
                Número da conta:
                <input type="text" />
              </label>

              <label>
                Digito da conta:
                <input type="text" />
              </label>
            </div>

            <div>
              <Link to="/firgunData">
                <button>Voltar</button>
              </Link>
              <Link to="/changeData">
                <button>Próximo</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
