import React from "react";
import { Link } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuPartner/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import "./styles/partnerData.css";
import "./styles/partnerDataResponsive.css";

export default function AboutOrganization2() {
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
                  Data de fundação:
                  <input type="text" />
                </label>

                <label>
                  Área de atuação:
                  <input type="text" />
                </label>
              </div>

              <div className="field">
                <label>
                  Tamanho da rede:
                  <input type="text" />
                </label>
              </div>

              <div className="field">
                <label>
                  Descrição curta sobre a organização:
                  <textarea cols="30" rows="10" />
                </label>
              </div>
            </form>

            <div className="btn">
              <Link to="/partnerData-aboutOrganization">
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
