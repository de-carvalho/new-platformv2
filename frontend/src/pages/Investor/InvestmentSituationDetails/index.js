import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useLocation, useHistory } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/situationDetails.css";
import "./styles/situationDetailsResponsive.css";

export default function InvestmentSituationDetails() {
  const location = useLocation();
  const history = useHistory();

  const { user } = useAuth();

  if (!user) history.push("/");

  const [loanData, setLoanData] = useState([]);

  useEffect(() => {
    const projectId = location.search.replace("?project=", "");

    async function fetchStatement() {
      const response = await api.get(
        `supporters/loan-situation?project_id=${projectId}`
      );
      setLoanData(response.data);
    }

    fetchStatement();
  }, [location.search]);

  return (
    <>
      <MenuMobile />
      <div id="situationDetails">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="personalData" />

          <h3>Situação dos investimentos - Detalhes</h3>

          <div className="detTable">
            <Table responsive>
              <thead>
                <tr>
                  <th>Projeto</th>
                  <th>Valor investido</th>
                  <th>Valor recebido</th>
                  <th>Valor corrigido</th>
                  <th>Juros</th>
                  <th>Parcela</th>
                  <th>Situação</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {loanData.map((statement) => (
                  <tr key={statement.id}>
                    <td>{statement.projectName}</td>
                    <td>R$ {statement.amountInvested}</td>
                    <td>R$ {statement.amountReceived}</td>
                    <td>R$ {statement.amountCorrected}</td>
                    <td>R$ {statement.amountInterest}</td>
                    <td>{statement.installmentPayed}</td>
                    <td>{statement.status}</td>
                    <td>{statement.refundStatus}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
