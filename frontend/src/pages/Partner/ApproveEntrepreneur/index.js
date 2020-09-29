import React from "react";
import Table from "react-bootstrap/Table";
import { BsCheck, BsX } from "react-icons/bs";

import "./styles/approve.css";
import "./styles/approveResponsive.css";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuPartner/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

export default function ApproveEntrepreneur() {
  return (
    <>
      <MenuMobile />
      <div id="appEntrepreneur">
        <Menu />

        <div className="content">
          <HeaderDash />

          <div className="appTable">
            <Table responsive>
              <thead>
                <tr>
                  <th>CPF</th>
                  <th>Nome do empreendedor</th>
                  <th>E-mail do empreendedor</th>
                  <th>Situação</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CPF</td>
                  <td>Nome empreendedor</td>
                  <td>empreendedor@email.com</td>
                  <td>Pendente</td>
                  <td>
                    <BsX className="iconsX" /> | <BsCheck className="iconsV" />
                  </td>
                </tr>
                <tr>
                  <td>CPF</td>
                  <td>Nome empreendedor</td>
                  <td>empreendedor@email.com</td>
                  <td>Pendente</td>
                  <td>
                    <BsX className="iconsX" /> | <BsCheck className="iconsV" />
                  </td>
                </tr>
                <tr>
                  <td>CPF</td>
                  <td>Nome empreendedor</td>
                  <td>empreendedor@email.com</td>
                  <td>Pendente</td>
                  <td>
                    <BsX className="iconsX" /> | <BsCheck className="iconsV" />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
