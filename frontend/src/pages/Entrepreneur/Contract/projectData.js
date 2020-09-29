import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import "./styles/contract.css";
import "./styles/contractResponsive.css";

const ProjectData = ({ data }) => {
  return (
    <>
      <MenuMobile />
      <div id="contract">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <div className="conData">
            <h3>Confirmação de dados para contrato - Dados do projeto</h3>

            <form>
              <div className="field">
                <label>
                  CPF ou CNPJ do projeto:
                  <span
                    className={
                      data.project.documentResponsible ? "" : "spanItem"
                    }
                  >
                    {data.project.documentResponsible}
                  </span>
                </label>

                <label>
                  CPF do responsável:
                  <span
                    className={
                      data.project.documentResponsible ? "" : "spanItem"
                    }
                  >
                    {data.project.documentResponsible}
                  </span>
                </label>
              </div>

              <div className="field">
                <label>
                  Nome do projeto:
                  <span className={data.project.name ? "" : "spanItem"}>
                    {data.project.name}
                  </span>
                </label>

                <label>
                  Tempo de projeto:
                  <span className={data.project.businesstime ? "" : "spanItem"}>
                    {data.project.businesstime}
                  </span>
                </label>
              </div>

              <div className="field">
                <label>
                  Descrição breve:
                  <textarea defaultValue={data.project.description}></textarea>
                </label>
              </div>
            </form>
            <div className="btn">
              <Link to="/entrepreneurContract" className="btnText">
                <button>Voltar</button>
              </Link>
              <Link to="/entrepeneurBankData" className="btnText">
                <button>Próximo</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({
  data: state.contract.data,
}))(ProjectData);
