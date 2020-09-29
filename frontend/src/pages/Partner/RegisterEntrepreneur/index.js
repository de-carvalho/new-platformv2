import React from "react";

import "./styles/regEntrepreneur.css";
import "./styles/regEntrResponsive.css";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuPartner/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

export default function RegisterEntrepreuner() {
  return (
    <>
      <MenuMobile />
      <div id="regEntrepreneur">
        <Menu />

        <div className="content">
          <HeaderDash />

          <div className="regContent">
            <label htmlFor="">Digite o cpf do Empreendedor</label>
            <input type="text" placeholder="CPF" />

            <label htmlFor="">Digite o nome do Empreendedor</label>
            <input type="text" placeholder="Nome" />

            <label htmlFor="">Digite o e-mail do Empreendedor</label>
            <input type="text" placeholder="E-mail" />

            <button>Cadastrar</button>
          </div>
        </div>
      </div>
    </>
  );
}
