import React, { Component } from "react";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./styles/teamCard.css";
import "./styles/teamCardResponsive.css";

import Teste from "../../assets/images/teste.jpg";

export class TeamCard extends Component {
  render() {
    return (
      <div id="cards">
        <img src={Teste} alt="" />
        <h4>Felipe Chalfun</h4>
        <p>CTO</p>

        <div className="cardIcons">
          <FaLinkedin className="icons" />
          <MdEmail className="icons" />
        </div>
      </div>
    );
  }
}

export default TeamCard;
