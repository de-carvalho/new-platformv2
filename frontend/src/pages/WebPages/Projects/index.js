import React from "react";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import Carousel from "../../../components/carousel/Carousel";

import "./styles/projects.css";
import "./styles/projectsResponsive.css";

export default function Projects() {
  return (
    <div>
      <Header />
      <div className="projectBanner"></div>
      <div className="projectMain">
        <div className="text">
          <h3>Projetos em andamento</h3>
        </div>

        <div className="loadingProjects cont">
          <Carousel />
        </div>

        <div className="text">
          <h3>Projetos concluídos</h3>
        </div>

        <div className="finishedProjects cont">
          <Carousel />
        </div>
      </div>
      <Footer />
    </div>
  );
}
