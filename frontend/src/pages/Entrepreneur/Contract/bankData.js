import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { MdWarning } from "react-icons/md";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/contract.css";
import "./styles/contractResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

const BankData = ({ data }) => {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [emptyData, setEmptyData] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if (
      (!data.user.bankNumber,
      !data.user.bankAccountType,
      !data.user.bankAccountNumber,
      !data.user.bankAgencyNumber,
      !data.user.profession,
      !data.user.race)
    ) {
      setEmptyData(true);
      setPurchasing(true);
    }
  }, [
    data.user.bankNumber,
    data.user.bankAccountType,
    data.user.bankAccountNumber,
    data.user.bankAgencyNumber,
    data.user.profession,
    data.user.race,
  ]);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const handleConfirmContract = async (projectId) => {
    try {
      const response = await api.post(
        `/entrepreneurs/confirm-contract?project_id=${projectId}`
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Não foi possível confirmar o contrato");
      console.log(error);
    }
  };

  return (
    <>
      <MenuMobile />
      <div id="contract">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            <div className="modalEmptyData">
              <MdWarning size={60} color="#e02041" />
              <h6>Atenção!</h6>
              <p>Você precisa informar os seguintes dados:</p>
              <p>
                O seu <strong>gênero sexual</strong>, os seus{" "}
                <strong>dados bancários</strong>, sua <strong>profissão</strong>{" "}
                e sua <strong>cor/raça</strong>.Ou qualquer campo que estiver
                vermelho, antes de confirmar ou solicitar o contrato
              </p>
              <p>Por favor edite seus dados.</p>
              <div className="modalButtons">
                <button
                  className="modalButtonClose"
                  onClick={purchaseCancelHandler}
                >
                  FECHAR
                </button>
                <Link to="/entrepreneurData">
                  <button className="modalButtonConfirm">OK</button>
                </Link>
              </div>
            </div>
          </Modal>

          <div className="conData">
            <h3>Confirmação de dados para contrato - Dados bancários</h3>
            <div className="field">
              <label>
                Banco:
                <span className={data.user.bankNumber ? "" : "spanItem"}>
                  {data.user.bankNumber}
                </span>
              </label>

              <label>
                Tipo de conta:
                <span className={data.user.bankAccountType ? "" : "spanItem"}>
                  {data.user.bankAccountType}
                </span>
              </label>
            </div>

            <div className="field">
              <label>
                Número da conta:
                <span className={data.user.bankAccountNumber ? "" : "spanItem"}>
                  {data.user.bankAccountNumber}
                </span>
              </label>

              <label>
                Número da agência:
                <span className={data.user.bankAgencyNumber ? "" : "spanItem"}>
                  {data.user.bankAgencyNumber}
                </span>
              </label>
            </div>

            <h3>Confirmação de dados para contrato - Dados Firgun</h3>

            <div className="field">
              <label>
                Grau de instrução:
                <span className={data.user.bankAgencyNumber ? "" : "spanItem"}>
                  Superior incompleto
                </span>
              </label>

              <label>
                Profissão:
                <span className={data.user.profession ? "" : "spanItem"}>
                  {data.user.profession}
                </span>
              </label>
            </div>

            <div className="field">
              <label>
                Cor/Raça:
                <span className={data.user.race ? "" : "spanItem"}>
                  {data.user.race}
                </span>
              </label>
            </div>

            <div className="btn">
              <Link to="/enrepreneurProjectData" className="btnText">
                <button>Voltar</button>
              </Link>
              <button
                className={emptyData ? "btnDisabled" : ""}
                disabled={emptyData ? true : false}
                onClick={() => handleConfirmContract(data.project.id)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({
  data: state.contract.data,
}))(BankData);
