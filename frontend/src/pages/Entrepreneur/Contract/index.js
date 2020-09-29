import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MdWarning } from "react-icons/md";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import * as ContractActions from "../../../store/actions/contract";

import "./styles/contract.css";
import "./styles/contractResponsive.css";

const EntrepreneurContract = ({ data, toggleLesson }) => {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [emptyData, setEmptyData] = useState(false);

  useEffect(() => {
    api.get("entrepreneurs/contract").then((response) => {
      toggleLesson(response.data);
    });

    if (!data.user.gender) {
      setEmptyData(true);
    }
  }, [toggleLesson, data.user.gender]);

  const purchaseCancelHandler = () => {
    setEmptyData(false);
  };

  return (
    <>
      <MenuMobile />
      <div id="contract">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <Modal show={emptyData} modalClosed={purchaseCancelHandler}>
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
            <h3>Confirmação de dados para contrato - Dados pessoais</h3>

            <div className="field">
              <label>
                Nome:
                <span className={data.user.firstName ? "" : "spanItem"}>
                  {data.user.firstName + " " + data.user.lastName}
                </span>
              </label>

              <label>
                CPF:
                <span className={data.user.taxDocumentNumber ? "" : "spanItem"}>
                  {data.user.taxDocumentNumber}
                </span>
              </label>
            </div>

            <div className="field">
              <label>
                Sexo:
                <span className={data.user.gender ? "" : "spanItem"}>
                  {data.user.gender}
                </span>
              </label>

              <label>
                Data de nascimento:
                <span className={data.user.dob ? "" : "spanItem"}>
                  {data.user.dob}
                </span>
              </label>
            </div>

            <div className="field">
              <label>
                Telefone:
                <span className={data.user.cellphoneArea ? "" : "spanItem"}>
                  {data.user.cellphoneArea + " " + data.user.cellphoneNumber}
                </span>
              </label>

              <label>
                Email:
                <span className={data.user.email ? "" : "spanItem"}>
                  {data.user.email}
                </span>
              </label>
            </div>

            <div className="field">
              <label>
                CEP:
                <span className={data.user.addressZipcode ? "" : "spanItem"}>
                  {data.user.addressZipcode}
                </span>
              </label>

              <label>
                Número:
                <span className={data.user.addressNumber ? "" : "spanItem"}>
                  {data.user.addressNumber}
                </span>
              </label>
            </div>

            <div className="field">
              <label>
                Rua:
                <span className={data.user.addressStreet ? "" : "spanItem"}>
                  {data.user.addressStreet}
                </span>
              </label>

              <label>
                Complemento:
                <span>{data.user.addressComplement}</span>
              </label>
            </div>

            <div className="field">
              <label>
                Cidade:
                <span className={data.user.addressCity ? "" : "spanItem"}>
                  {data.user.addressCity}
                </span>
              </label>

              <label>
                Estado:
                <span className={data.user.addressCity ? "" : "spanItem"}>
                  {data.user.addressState}
                </span>
              </label>
            </div>

            <Link to="/enrepreneurProjectData" className="btnText">
              <button>Próximo</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.contract.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ContractActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntrepreneurContract);
