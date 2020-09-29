import React, { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import { useHistory, NavLink } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { toast } from "react-toastify";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/generate.css";
import "./styles/generateResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default function GenerateTicket() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [statement, setStatement] = useState([]);
  const [value, setValue] = useState("");
  const [projectId, setProjectId] = useState("");
  const [installment, setInstallment] = useState("");
  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [purchasing, setPurchasing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [negotiate, setNegotiate] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [negotiateData, setPNegotiateData] = useState({});
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    async function fetchStatement() {
      const response = await api.get("entrepreneurs/bank-statement-to-pay");
      setStatement(response.data);
    }

    fetchStatement();
  }, [loaded]);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
    setNegotiate(false);
  };

  const handleGetData = (projectId, amount, installments) => {
    setValue(amount);
    setProjectId(projectId);
    setInstallment(installments);
    setButtonDisable(!buttonDisable);
  };

  let modalDataNegotiate;
  let modalDataNegotiated;

  const handleGetDataToNegotiate = (
    projectId,
    installments,
    projectName,
    dueDate,
    amount
  ) => {
    setProjectId(projectId);
    setInstallment(installments);
    setProjectName(projectName);
    setDueDate(dueDate);
    setValue(amount);
    setNegotiate(!negotiate);
  };

  modalDataNegotiated = (
    <>
      <div className="modalNegotiate">
        <h5>Renegociação confirmada</h5>
        <MdCheckCircle size={30} color="#34cc20" />
      </div>
      <p>
        Projeto: <strong>{projectName}</strong>
      </p>
      <p>
        Vencimento da parcela: <strong>{negotiateData.newDate}</strong>
      </p>
      <p>
        Número da parcela: <strong>{installment}</strong>
      </p>
      <p>
        Valor total:
        <strong> R$ {negotiateData.amountToPayBack}</strong>
      </p>
    </>
  );

  const handleNegotiateInstallment = useCallback(async () => {
    try {
      const response = await api.post(
        `interest/renegotiation?project_id=${projectId}`,
        { installment }
      );

      setPNegotiateData(response.data);
      setLoaded(!loaded);
    } catch (error) {
      toast.error("Erro ao confirmar a renegociação");
      console.log(error);
    }
  }, [projectId, installment, loaded]);

  modalDataNegotiate = (
    <>
      <h5>Confirmação de negociação</h5>
      <p>
        Projeto: <strong>{projectName}</strong>
      </p>
      <p>
        Vencimento da parcela: <strong>{dueDate}</strong>
      </p>
      <p>
        Número da parcela: <strong>{installment}</strong>
      </p>
      <p>
        Valor total:
        <strong> R$ {value}</strong>
      </p>
      <button className="modalDataLoadedClose" onClick={purchaseCancelHandler}>
        FECHAR
      </button>
      <button
        className="modalDataLoadedPrint"
        onClick={handleNegotiateInstallment}
      >
        CONFIRMAR
      </button>
    </>
  );

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
        `payments/refund?project_id=${projectId}`,
        data
      );

      setPaymentData(response.data);
      setLoaded(!loaded);
    } catch (error) {
      toast.error("Erro ao gerar o boleto");
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
      <div id="generate">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {Object.entries(paymentData).length === 0
              ? modalData
              : modalDataLoaded}
          </Modal>

          <Modal show={negotiate} modalClosed={purchaseCancelHandler}>
            {Object.entries(negotiateData).length === 0
              ? modalDataNegotiate
              : modalDataNegotiated}
          </Modal>

          <h3>Gerar boletos 2ª via de boletos</h3>

          {statement.length === 0 ? (
            <p>Nenhum registro encontrado</p>
          ) : (
            <div className="genTable">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Data de vencimento</th>
                    <th>Valor da prestação</th>
                    <th>Parcela</th>
                    <th>Situação</th>
                    <th>Estado</th>
                    <th>Gerar</th>
                    <th>Renegociação</th>
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
                      <td>
                        <input
                          type="checkbox"
                          disabled={
                            statementItem.status === "Vencido" ? true : false
                          }
                          className={
                            statementItem.status === "Vencido"
                              ? "btnDisabled"
                              : ""
                          }
                          onClick={() =>
                            handleGetData(
                              statementItem.projectId,
                              statementItem.amount,
                              statementItem.installment
                            )
                          }
                        />
                      </td>
                      <td
                        className={
                          statementItem.status === "Vencido"
                            ? "btnEnabled"
                            : "btnDisabled"
                        }
                        onClick={() =>
                          handleGetDataToNegotiate(
                            statementItem.projectId,
                            statementItem.installment,
                            statementItem.projectName,
                            statementItem.dueDate,
                            statementItem.amount
                          )
                        }
                      >
                        Renegociar
                      </td>
                    </tr>
                  ))}
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
