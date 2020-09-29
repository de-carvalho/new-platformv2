import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaClock, FaUserFriends } from "react-icons/fa";

import Teste from "../../../assets/images/teste.jpg";

import "./cardCarousel.css";
import "./cardCarouselResponsive.css";

function CardCarousel() {
  const now = 60;
  return (
    <>
      <div className="cardCarouselContainer">
        <img src={Teste} alt="" />
        <h5>Nome do projeto</h5>
        <p className="tP">Breve descrição sobre o projeto e seus objetivos</p>

        <ProgressBar
          id="barCard"
          animated
          variant="success"
          now={60}
          label={`${now}%`}
        />

        <div className="cardBorder">
          <div className="cardTime">
            <p>
              <FaClock className="icon" />
              00 dias
            </p>
          </div>

          <div className="cardMoney">
            <p>R$ 1.000,00</p>
          </div>

          <div className="cardInvestors">
            <p>
              <FaUserFriends className="icon" />
              00
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardCarousel;
