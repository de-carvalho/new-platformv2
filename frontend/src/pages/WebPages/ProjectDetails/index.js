import React from "react";
// import { Link } from "react-router-dom";
// import ProgressBar from "react-bootstrap/ProgressBar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

import "./styles/projectDetails.css";

// import Teste from "../../../assets/images/teste.jpg";

export default function ProjectDetails() {
  return (
    <div id="projectDetails">
      <Header />

      <div id="mainContent">
        <div className="topContent">
          <div className="leftContent">
            <h4>Nome do projeto</h4>

            <iframe
              title="Entrepreneur video"
              width="500"
              height="315"
              src="https://www.youtube.com/embed/rBREh3h4jT4"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="rightContent"></div>
        </div>

        <div className="bottomContent">
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="O projeto">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
                est placerat in egestas erat imperdiet sed euismod. Imperdiet
                nulla malesuada pellentesque elit eget gravida cum sociis
                natoque. Placerat duis ultricies lacus sed. Enim ut tellus
                elementum sagittis vitae. Mattis nunc sed blandit libero
                volutpat sed cras. Amet risus nullam eget felis eget nunc
                lobortis. Gravida in fermentum et sollicitudin ac orci
                phasellus. Commodo viverra maecenas accumsan lacus. Aliquam
                malesuada bibendum arcu vitae elementum curabitur. Porttitor
                massa id neque aliquam. Pellentesque elit ullamcorper dignissim
                cras. Consequat nisl vel pretium lectus. Mattis vulputate enim
                nulla aliquet porttitor lacus luctus.
              </p>
            </Tab>
            <Tab eventKey="investment" title="O investimento">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
                est placerat in egestas erat imperdiet sed euismod. Imperdiet
                nulla malesuada pellentesque elit eget gravida cum sociis
                natoque. Placerat duis ultricies lacus sed. Enim ut tellus
                elementum sagittis vitae. Mattis nunc sed blandit libero
                volutpat sed cras. Amet risus nullam eget felis eget nunc
                lobortis. Gravida in fermentum et sollicitudin ac orci
                phasellus. Commodo viverra maecenas accumsan lacus. Aliquam
                malesuada bibendum arcu vitae elementum curabitur. Porttitor
                massa id neque aliquam. Pellentesque elit ullamcorper dignissim
                cras. Consequat nisl vel pretium lectus. Mattis vulputate enim
                nulla aliquet porttitor lacus luctus.
              </p>
            </Tab>
            <Tab eventKey="impact" title="O impacto social">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
                est placerat in egestas erat imperdiet sed euismod. Imperdiet
                nulla malesuada pellentesque elit eget gravida cum sociis
                natoque. Placerat duis ultricies lacus sed. Enim ut tellus
                elementum sagittis vitae. Mattis nunc sed blandit libero
                volutpat sed cras. Amet risus nullam eget felis eget nunc
                lobortis. Gravida in fermentum et sollicitudin ac orci
                phasellus. Commodo viverra maecenas accumsan lacus. Aliquam
                malesuada bibendum arcu vitae elementum curabitur. Porttitor
                massa id neque aliquam. Pellentesque elit ullamcorper dignissim
                cras. Consequat nisl vel pretium lectus. Mattis vulputate enim
                nulla aliquet porttitor lacus luctus.
              </p>
            </Tab>
            <Tab eventKey="entrepreneur" title="O empreendedor">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
                est placerat in egestas erat imperdiet sed euismod. Imperdiet
                nulla malesuada pellentesque elit eget gravida cum sociis
                natoque. Placerat duis ultricies lacus sed. Enim ut tellus
                elementum sagittis vitae. Mattis nunc sed blandit libero
                volutpat sed cras. Amet risus nullam eget felis eget nunc
                lobortis. Gravida in fermentum et sollicitudin ac orci
                phasellus. Commodo viverra maecenas accumsan lacus. Aliquam
                malesuada bibendum arcu vitae elementum curabitur. Porttitor
                massa id neque aliquam. Pellentesque elit ullamcorper dignissim
                cras. Consequat nisl vel pretium lectus. Mattis vulputate enim
                nulla aliquet porttitor lacus luctus.
              </p>
            </Tab>
            <Tab eventKey="partner" title="O(s) parceiro(s)">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
                est placerat in egestas erat imperdiet sed euismod. Imperdiet
                nulla malesuada pellentesque elit eget gravida cum sociis
                natoque. Placerat duis ultricies lacus sed. Enim ut tellus
                elementum sagittis vitae. Mattis nunc sed blandit libero
                volutpat sed cras. Amet risus nullam eget felis eget nunc
                lobortis. Gravida in fermentum et sollicitudin ac orci
                phasellus. Commodo viverra maecenas accumsan lacus. Aliquam
                malesuada bibendum arcu vitae elementum curabitur. Porttitor
                massa id neque aliquam. Pellentesque elit ullamcorper dignissim
                cras. Consequat nisl vel pretium lectus. Mattis vulputate enim
                nulla aliquet porttitor lacus luctus.
              </p>
            </Tab>
            <Tab eventKey="contact" title="Contato">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
                est placerat in egestas erat imperdiet sed euismod. Imperdiet
                nulla malesuada pellentesque elit eget gravida cum sociis
                natoque. Placerat duis ultricies lacus sed. Enim ut tellus
                elementum sagittis vitae. Mattis nunc sed blandit libero
                volutpat sed cras. Amet risus nullam eget felis eget nunc
                lobortis. Gravida in fermentum et sollicitudin ac orci
                phasellus. Commodo viverra maecenas accumsan lacus. Aliquam
                malesuada bibendum arcu vitae elementum curabitur. Porttitor
                massa id neque aliquam. Pellentesque elit ullamcorper dignissim
                cras. Consequat nisl vel pretium lectus. Mattis vulputate enim
                nulla aliquet porttitor lacus luctus.
              </p>
            </Tab>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
