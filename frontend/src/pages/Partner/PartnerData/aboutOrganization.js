import React from "react";
import { Link } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuPartner/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import "./styles/partnerData.css";
import "./styles/partnerDataResponsive.css";

export default function AboutOrganization() {
  return (
    <>
      <MenuMobile />
      <div id="partnerData">
        <Menu />

        <div className="content">
          <HeaderDash />

          <div className="dataContainer">
            <h3>Sobre a organização</h3>
            <form>
              <div className="field">
                <label>
                  Nome fantasia:
                  <input type="text" />
                </label>

                <label>
                  CNPJ:
                  <input type="text" />
                </label>
              </div>

              <div className="field">
                <label>
                  Telefone 1:
                  <input type="text" />
                </label>

                <label>
                  Telefone 2:
                  <input type="text" />
                </label>
              </div>

              <div className="field">
                <label>
                  CEP:
                  <input type="text" />
                </label>

                <label>
                  Número:
                  <input type="text" />
                </label>
              </div>

              <div className="field">
                <label>
                  Rua:
                  <input type="text" />
                </label>

                <label>
                  Complemento:
                  <input type="text" />
                </label>
              </div>

              <div className="field">
                <label>
                  Cidade:
                  <input type="text" />
                </label>

                <label>
                  Estado:
                  <input type="text" />
                </label>
              </div>

              <div className="field">
                <label>
                  País:
                  <input type="text" />
                </label>
              </div>
            </form>

            <div className="btn">
              <Link to="/partnerData">
                <button>Voltar</button>
              </Link>
              <Link to="/partnerData-aboutOrganization2">
                <button>Próximo</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
