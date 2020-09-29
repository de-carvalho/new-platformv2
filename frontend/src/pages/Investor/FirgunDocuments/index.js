import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { NavLink, useHistory } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/firgunDoc.css";
import "./styles/firgunDocResponsive.css";

export default function FirgunDocuments() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [documents, setDocuments] = useState({});

  useEffect(() => {
    async function fetchDocuments() {
      const response = await api.get("supporters/firgun-documents");
      setDocuments(response.data);
    }

    fetchDocuments();
  }, []);

  return (
    <>
      <MenuMobile />
      <div id="firgunDoc">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="personalData" />

          <h3>Documentos FIRGUN</h3>

          <div className="firTable">
            <Table responsive>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Item</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {documents.impactNewsletter
                      ? documents.createdAt
                      : "--/--/----/"}
                  </td>
                  <td>Informativo de impacto</td>
                  <td>
                    <NavLink
                      to={{
                        pathname: documents.impactNewsletterUrl,
                      }}
                      target="blank"
                    >
                      <button
                        className={
                          documents.impactNewsletter ? "" : "btnDisabled"
                        }
                        disabled={!documents.impactNewsletter ? true : false}
                      >
                        Visualizar
                      </button>
                    </NavLink>
                  </td>
                </tr>
                <tr>
                  <td>
                    {documents.statementIRPF1
                      ? documents.createdAt
                      : "--/--/----/"}
                  </td>
                  <td>Extrato de IRPF 1</td>
                  <td>
                    <NavLink
                      to={{
                        pathname: documents.statementIRPF1Url,
                      }}
                      target="blank"
                    >
                      <button
                        className={
                          documents.statementIRPF1 ? "" : "btnDisabled"
                        }
                        disabled={!documents.statementIRPF1 ? true : false}
                      >
                        Visualizar
                      </button>
                    </NavLink>
                  </td>
                </tr>
                <tr>
                  <td>
                    {documents.statementIRPF2
                      ? documents.createdAt
                      : "--/--/----/"}
                  </td>
                  <td>Extrato de IRPF 2</td>
                  <td>
                    <NavLink
                      to={{
                        pathname: documents.statementIRPF2Url,
                      }}
                      target="blank"
                    >
                      <button
                        className={
                          documents.statementIRPF2 ? "" : "btnDisabled"
                        }
                        disabled={!documents.statementIRPF2 ? true : false}
                      >
                        Visualizar
                      </button>
                    </NavLink>
                  </td>
                </tr>
                <tr>
                  <td>
                    {documents.investmentReceipt
                      ? documents.createdAt
                      : "--/--/----/"}
                  </td>
                  <td>Recibo de investimento</td>
                  <td>
                    <NavLink
                      to={{
                        pathname: documents.investmentReceiptUrl,
                      }}
                      target="blank"
                    >
                      <button
                        className={
                          documents.investmentReceipt ? "" : "btnDisabled"
                        }
                        disabled={!documents.investmentReceipt ? true : false}
                      >
                        Visualizar
                      </button>
                    </NavLink>
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
