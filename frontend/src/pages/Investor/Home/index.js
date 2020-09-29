import React from "react";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Chart from "../../../components/chart/LineChart/Chart";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/investor.css";

export default function InvestorHome() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  return (
    <>
      <MenuMobile />
      <div id="investorHome">
        <Menu />
        <div className="content">
          <HeaderDash />

          <div className="homeContent">
            <Chart />
            <div className="homeTable">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Total investido</th>
                    <th>Total recebido</th>
                    <th>Total a receber</th>
                    <th>rendimento</th>
                    <th>Último recebimento</th>
                    <th>Próximo recebimento</th>
                    <th>Próximo valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Oficina do Marcos</td>
                    <td>R$ 7.000,00</td>
                    <td>R$ 4.493,00</td>
                    <td>R$ 3.062</td>
                    <td>R$ 8.000,00</td>
                    <td>12/08/2019</td>
                    <td>22/08/2019</td>
                    <td>R$ 77</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
