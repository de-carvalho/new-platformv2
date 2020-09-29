import React, { Component } from "react";
import { GrFacebook, GrLinkedin, GrYoutube, GrInstagram } from "react-icons/gr";

import "./styles/footer.css";
import "./styles/footerResponsive.css";

import FooterLogo from "../../assets/images/footer-logo.png";

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
          <div className="ft-tp">
            <img src={FooterLogo} alt="Logo da Firgun" />

            <div className="ft-tp-content">
              <div>
                <h3>sobre</h3>
                <ul>
                  <li>Propósito</li>
                  <li>Fundadores</li>
                  <li>Perguntas frequentes</li>
                  <li>Termos</li>
                </ul>
              </div>

              <div>
                <h3>projetos</h3>
                <ul>
                  <li>Em andamento</li>
                </ul>
              </div>

              <div>
                <h3>parceiros</h3>
                <ul>
                  <li>Nossos parceiros</li>
                </ul>
              </div>

              <div>
                <h3>blog</h3>
                <ul>
                  <li>Blog</li>
                  <li>Newsletter</li>
                </ul>
              </div>

              <div>
                <h3>contato</h3>
                <ul>
                  <li>contato#firgun.com.br</li>
                  <li>(+55) 11 94562-4698</li>
                  <div className="icons">
                    <GrFacebook />
                    <GrLinkedin />
                    <GrYoutube />
                    <GrInstagram />
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div className="ft-btm">
            <p>
              Todos os direitos reservados Firgun. Este site é gerido pelo
              Instituto Firgun.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
