import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/statement.css";
import "./styles/statementResponsive.css";

export default function BalanceStatement() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [statments, setStatement] = useState([]);

  useEffect(() => {
    async function fetchStatement() {
      const response = await api.get("supporters/bank-statement");
      setStatement(response.data);
    }

    fetchStatement();
  }, []);
  return (
    <>
      <MenuMobile />
      <div id="statement">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="personalData" />

          <h3>Extrato de saldo FIRGUN</h3>

          <div className="stateTable">
            <Table responsive>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                {statments.map((statment) => (
                  <tr key={statment.id}>
                    <td>{statment.createdAt}</td>
                    <td>{statment.amount}</td>
                    <td>{statment.purpose}</td>
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
