import React, { Component } from "react";

import "./styles/partnerCard.css";
import "./styles/partnerCardResponsive.css";

import Teste from "../../assets/images/teste.jpg";

export class PartnerCard extends Component {
  render() {
    return (
      <div id="partCard">
        <div className="tp">
          <img src={Teste} alt="Imagem" />
          <div className="box">
            <h3>Empreende Aí</h3>
            <p>São Paulo, São Paulo</p>
          </div>
        </div>
        <div className="bt">
          <div className="bx">
            <p>
              Um negócio social que promove cursos de empreendedorismo no Jardim
              São Luis, também na zona sul de São Paulo.
            </p>
          </div>
          <button>saiba mais</button>
        </div>
      </div>
    );
  }
}

export default PartnerCard;
