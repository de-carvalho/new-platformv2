import React from "react";
import { Link } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import "./styles/personal.css";
import "./styles/personalResponsive.css";

export default function FirgunData() {
  return (
    <>
      <MenuMobile />
      <div id="personal">
        <Menu />

        <div className="content">
          <HeaderDash />

          <div className="perData">
            <h3>Editar informações - Dados Firgun</h3>

            <div className="edit">
              <label>
                Sexo:
                <select>
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Outro</option>
                </select>
              </label>

              <label>
                Estado Civil:
                <select>
                  <option>Solteiro(a)</option>
                  <option>Casado(a)</option>
                  <option>Divorciado(a)</option>
                  <option>Viúvo(a)</option>
                </select>
              </label>
            </div>

            <div className="edit">
              <label>
                Grau de instrução:
                <select>
                  <option>Ensino fundamental incompleto</option>
                  <option>Ensino fundamental completo</option>
                  <option>Ensino médio incompleto</option>
                  <option>Ensino médio completo</option>
                  <option>Ensino superior incompleto</option>
                  <option>Ensino superior completo</option>
                </select>
              </label>

              <label>
                Ocupação:
                <input type="text" />
              </label>
            </div>

            <div className="edit">
              <label>
                Cor/Raça:
                <select>
                  <option>Branco(a)</option>
                  <option>Negro(a)</option>
                  <option>Pardo(a)</option>
                  <option>Amarelo(a)</option>
                  <option>Indígena</option>
                </select>
              </label>

              <label>
                Renda mensal:
                <input type="text" />
              </label>
            </div>

            <h3>Editar informações - Dados bancários Firgun</h3>

            <div className="edit">
              <label>
                Banco:
                <input type="text" placeholder="Firgun" disabled />
              </label>

              <label>
                Tipo de conta:
                <select>
                  <option>Corrente</option>
                  <option>Poupança</option>
                </select>
              </label>
            </div>

            <div className="edit">
              <label>
                Número da conta:
                <input type="text" />
              </label>

              <label>
                Digito:
                <input type="text" />
              </label>
            </div>
            <div>
              <Link to="/personalData">
                <button>Voltar</button>
              </Link>
              <Link to="/personalBankData">
                <button>Próximo</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
