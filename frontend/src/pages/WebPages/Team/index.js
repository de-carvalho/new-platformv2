import React from "react";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import TeamCard from "../../../components/teamCard/TeamCard";

import "./styles/team.css";
import "./styles/teamResponsive.css";

export default function Team() {
  return (
    <div id="team">
      <Header />
      <div id="teamMain">
        <h2>nosso time</h2>
        <div className="teamCards">
          <div className="teamTop flex mirror">
            <TeamCard />
            <TeamCard />
            <TeamCard />
          </div>

          <div className="teamBot flex mirror">
            <TeamCard />
            <TeamCard />
            <TeamCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
