import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/situtation.css";
import "./styles/situtationResponsive.css";

export default function InvestimentSituation() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [statement, setStatement] = useState([]);

  useEffect(() => {
    async function fetchStatement() {
      const response = await api.get("supporters/projects-supported");
      setStatement(response.data);
    }

    fetchStatement();
  }, []);

  return (
    <>
      <MenuMobile />
      <div id="investorSituation">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="personalData" />

          <h3>Situação dos investimentos</h3>

          <div className="sitTable">
            <Table responsive>
              <thead>
                <tr>
                  <th>Projeto</th>
                  <th>Data do investimento</th>
                  <th>Valor investido</th>
                  <th>Valor a recebido</th>
                  <th>Total a receber</th>
                  <th>Valor corrigido</th>
                  <th>Vezes</th>
                  <th>Situação</th>
                  <th>Detalhes</th>
                  <th>Extrato</th>
                </tr>
              </thead>
              <tbody>
                {statement.map((statementItem) => (
                  <tr key={statementItem.id}>
                    <td>{statementItem.projectName}</td>
                    <td>{statementItem.createdAt}</td>
                    <td>R$ {statementItem.amount}</td>
                    <td>R$ {statementItem.amountToReceive}</td>
                    <td>R$ {statementItem.totalAmountReceivable}</td>
                    <td>R$ {statementItem.amountCorrected}</td>
                    <td>{statementItem.totalInstallments}</td>
                    <td>{statementItem.projectState}</td>
                    <td>
                      <Link
                        to={`/investmentSituationDetails?project=${statementItem.projectId}`}
                      >
                        Detalhes
                      </Link>
                    </td>
                    <td>
                      <input type="checkbox" name="" id="" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <button>Gerar extrato</button>
          </div>
        </div>
      </div>
    </>
  );
}
