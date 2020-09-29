import React from "react";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

import "./styles/partners.css";
import "./styles/partnersResponsive.css";
import PartnerCard from "../../../components/partnerCard/PartnerCard";

export default function Partners() {
  return (
    <div>
      <Header />

      <div className="partnersBanner">
        <div className="space">
          <h1>Nos ajude a encontrar empreendedores incríveis.</h1>
          <button>seja um parceiro</button>
        </div>
      </div>

      <div id="partnersMain">
        <select name="" id="">
          <option value="selected">Todos os parceiros</option>
          <option value="">Parceiro 1</option>
          <option value="">Parceiro 2</option>
          <option value="">Parceiro 3</option>
          <option value="">Parceiro 4</option>
          <option value="">Parceiro 5</option>
        </select>

        <div className="cardsTop">
          <PartnerCard />
          <PartnerCard />
          <PartnerCard />
        </div>
      </div>

      <Footer />
    </div>
  );
}
