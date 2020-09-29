import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/payment.css";

export default function PaymentStatement() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [statement, setStatement] = useState([]);

  useEffect(() => {
    async function fetchStatement() {
      const response = await api.get("/entrepreneurs/bank-statement");
      setStatement(response.data);
    }

    fetchStatement();
  }, []);

  return (
    <>
      <MenuMobile />
      <div id="payState">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <h3>Extrato de pagamento</h3>

          {statement.length !== 0 ? (
            <div className="payTable">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Data de vencimento</th>
                    <th>Valor da prestação</th>
                    <th>Parcela</th>
                    <th>Situação</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {statement.map((statementItem) => (
                    <tr key={statementItem.installment}>
                      <td>{statementItem.projectName}</td>
                      <td>{statementItem.dueDate}</td>
                      <td>R$ {statementItem.amount}</td>
                      <td>{statementItem.installment}</td>
                      <td>{statementItem.status}</td>
                      <td>{statementItem.state}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>Nenhum registro encontrado</p>
          )}
        </div>
      </div>
    </>
  );
}
