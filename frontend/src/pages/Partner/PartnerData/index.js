import React from "react";
import { Link } from "react-router-dom";
// import { FaRegEdit } from "react-icons/fa";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuPartner/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import "./styles/partnerData.css";
import "./styles/partnerDataResponsive.css";

export default function PartnerData() {
  return (
    <>
      <MenuMobile />
      <div id="partnerData">
        <Menu />

        <div className="content">
          <HeaderDash />

          <div className="dataContainer">
            <h3>Dados do responsável</h3>
            <form>
              <div className="field">
                <label>
                  Nome:
                  <input type="text" />
                </label>

                <label>
                  Sobrenome:
                  <input type="text" />
                </label>
              </div>

              <div className="field">
                <label>
                  CPF:
                  <input type="text" />
                </label>

                <label>
                  E-mail:
                  <input type="text" />
                </label>
              </div>
            </form>
            <Link to="/partnerData-aboutOrganization">
              <button>Próximo</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
