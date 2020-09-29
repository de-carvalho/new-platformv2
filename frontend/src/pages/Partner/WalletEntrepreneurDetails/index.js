import React from "react";
import Table from "react-bootstrap/Table";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuPartner/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import "./styles/walletDetails.css";
import "./styles/walletDetailsResponsive.css";

export default function WalletEntrepreneurDetails() {
  return (
    <>
      <MenuMobile />
      <div id="partnerWallDetails">
        <Menu />

        <div className="content">
          <HeaderDash />

          <h3>Situação financeira do empreendedor - detalhes</h3>

          <div className="wallInfo">
            <span>Total investido no projeto: R$ 900</span>
            <span>Total pago pelo projeto: R$ 100</span>
          </div>

          <div className="wallTableDetails">
            <Table responsive>
              <thead>
                <tr>
                  <th>Proejto</th>
                  <th>Data de recebimento</th>
                  <th>Valor investido</th>
                  <th>Valor recebido</th>
                  <th>Valor corrigido</th>
                  <th>% de Juros</th>
                  <th>Parcela</th>
                  <th>Situação</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Oficina do Marcos</td>
                  <td>12/06/2019</td>
                  <td>R$ 50</td>
                  <td>R$ 3.33</td>
                  <td>R$ 0.13</td>
                  <td>0.5% mês</td>
                  <td>1</td>
                  <td>Em dia</td>
                  <td>Quitada</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
