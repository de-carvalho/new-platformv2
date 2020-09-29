import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useHistory, NavLink } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/payOff.css";
import "./styles/payOffResponsive.css";

export default function PayOffBalance() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [statement, setStatement] = useState({});
  const [projectId, setProjectId] = useState("");
  const [value, setValue] = useState("");
  const [installment, setInstallment] = useState("");
  const [purchasing, setPurchasing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    async function fetchStatement() {
      const project = await api.get("entrepreneurs/project-not-refunded");
      const response = await api.get(
        `payments/all-debt?project_id=${project.data.id}`
      );

      setStatement(response.data);
      setProjectId(project.data.id);
    }

    fetchStatement();
  }, [loaded]);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const handleGetData = (amount, installments) => {
    setValue(amount);
    setInstallment(installments);
    setButtonDisable(!buttonDisable);
  };

  // Quando o boleto está sendo gerado
  let modalData = (
    <>
      <p>Aguarde...</p>
      <Spinner />
    </>
  );

  const handleGenerateBoleto = async () => {
    setPurchasing(!purchasing);

    const data = {
      amount: value,
      installments: installment,
      purpose: "PROJECT_REFUND",
    };
    try {
      const response = await api.post(
        `payments/all-debt?project_id=${projectId}`,
        data
      );

      setPaymentData(response.data);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  // Depois do boleto ser gerado
  let modalDataLoaded = (
    <>
      <h5>Boleto gerado com sucesso</h5>

      <p>Abaixo segue o código do boleto:</p>
      <p>{paymentData.lineCode}</p>
      <p>
        <strong>Preço Total: R$ {paymentData.amount}</strong>
      </p>
      <p>Parcela: {paymentData.installments}</p>
      <button className="modalDataLoadedClose" onClick={purchaseCancelHandler}>
        FECHAR
      </button>
      <NavLink
        to={{
          pathname: paymentData.boletoLink,
        }}
        target="blank"
      >
        <button className="modalDataLoadedPrint">IMPRIMIR BOLETO</button>
      </NavLink>
    </>
  );

  return (
    <>
      <MenuMobile />
      <div id="payOffBalance">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {Object.entries(paymentData).length === 0
              ? modalData
              : modalDataLoaded}
          </Modal>

          <h3>Quitar saldo devedor</h3>

          {Object.entries(statement).length === 0 ? (
            <p>Nenhum registro encontrado</p>
          ) : (
            <div className="payOffTable">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Data de vencimento</th>
                    <th>Valor da prestação</th>
                    <th>Parcelas</th>
                    <th>Situação</th>
                    <th>Estado</th>
                    <th>Gerar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{statement.projectName}</td>
                    <td>12/08/2020</td>
                    <td>R$ {statement.amountTotal}</td>
                    <td>{statement.installment}x</td>
                    <td>{statement.status}</td>
                    <td>{statement.state}</td>
                    <td>
                      <input
                        type="checkbox"
                        onClick={() =>
                          handleGetData(
                            statement.amountTotal,
                            statement.installment
                          )
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>

              <button
                className={buttonDisable ? "btnDisabled" : ""}
                onClick={handleGenerateBoleto}
                disabled={buttonDisable}
              >
                Gerar Boleto
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
