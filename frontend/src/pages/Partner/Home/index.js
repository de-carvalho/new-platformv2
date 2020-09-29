import React from "react";
import Table from "react-bootstrap/Table";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuPartner/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Card from "../../../components/card/Card";

import "./styles/partner.css";
import "./styles/partnerResponsive.css";

export default function PartnerHome() {
  return (
    <>
      <MenuMobile />
      <div id="partnerHome">
        <Menu />

        <div id="content">
          <HeaderDash />
          <fieldset className="support">
            <div className="text">
              <p>Projetos apoiados em andamento</p>
            </div>

            <div className="cards">
              <Card />
              <Card />
              <Card />
            </div>

            <div className="text">
              <p>Gráfico de investimentos</p>
            </div>

            <div className="text">
              <p>Projetos apoiados</p>
            </div>

            <div className="table">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Total investido</th>
                    <th>Total recebido</th>
                    <th>Valor do rendimento</th>
                    <th>ùltimo recebimento</th>
                    <th>Próximo recebimento</th>
                    <th>Próximo valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Oficina do Marcos</td>
                    <td>R$ 7.000,00</td>
                    <td>R$ 4.938,00</td>
                    <td>R$ 3.046, 00</td>
                    <td>R$ 8.000,00</td>
                    <td>12/08/2019</td>
                    <td>R$ 77</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}
