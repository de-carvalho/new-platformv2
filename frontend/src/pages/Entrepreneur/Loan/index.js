import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/loan.css";
import "./styles/loanResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default function EntrepreneurLoan() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [loanDatas, setLoanDatas] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [projectType, setProjectType] = useState(0);
  const [loanOptionData, setLoanOptionData] = useState({});

  useEffect(() => {
    async function fetchLoanOptions() {
      const project = await api.get("projects/user-in-progress");
      setProjectType(project.data.projectType);
      const response = await api.get(
        `entrepreneurs/project-analised?project_id=${project.data.id}`
      );
      setLoanDatas(response.data);
    }

    fetchLoanOptions();
  }, [confirmed]);

  const handleGetData = (data) => {
    setLoanOptionData(data);
    setButtonDisable(!buttonDisable);
  };

  const handleConfirmOption = async () => {
    const data = {
      amountWanted: loanOptionData.amountWanted,
      receiveDate: loanOptionData.receiveDate,
      gracePeriod: loanOptionData.gracePeriod,
      projectType: loanOptionData.projectType,
      totalInstallments: loanOptionData.totalInstallments,
      amountToPayback: loanOptionData.amountToPayback,
      // percentageFee: loanOptionData.percentageFee,
      amountPerInstallment: loanOptionData.amountPerInstallment,
      confirmedByEntrepreneur: true,
    };

    try {
      await api.post(
        `entrepreneurs/loan-confirmation?project_id=${loanOptionData.projectId}`,
        data
      );
      toast.success("Opção de empréstimo confirmada");
      setConfirmed(true);
    } catch (error) {
      toast.error("Não foi possível confirmar o empréstimo");
      console.log(error);
    }
  };

  return (
    <>
      <MenuMobile />
      <div id="loan">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <h3>Definição de empréstimo</h3>

          {projectType <= 0 || projectType === null ? (
            <div className="loanTable">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Tipo de projeto</th>
                    <th>Margem de empréstimo</th>
                    <th>Valor desejado</th>
                    <th>Quantidade de parcelas</th>
                    <th> Valor das parcelas</th>
                    <th>Taxa Adm.</th>
                    <th>Valor a devolver</th>
                    <th>Prazo de recebimento</th>
                    <th>Opção</th>
                  </tr>
                </thead>
                <tbody>
                  {loanDatas.map((loanData) => (
                    <tr key={loanData.id}>
                      <td>
                        {loanData.projectType === 2 ? "Debênture" : "Coletivo"}
                      </td>
                      <td>R$ {loanData.loanMargin},00</td>
                      <td>R$ {loanData.amountWanted},00</td>
                      <td>{loanData.totalInstallments}</td>
                      <td>R$ {loanData.amountPerInstallment}</td>
                      <td>{loanData.percentageFee}%</td>
                      <td>R$ {loanData.amountToPayback}</td>
                      <td>{loanData.receiveDate}</td>
                      <td>
                        <input
                          type="checkbox"
                          onClick={() => handleGetData(loanData)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <button
                className={buttonDisable ? "btnDisabled" : ""}
                onClick={handleConfirmOption}
                disabled={buttonDisable}
              >
                Confirmar opção
              </button>
            </div>
          ) : (
            <p>Você já confirmou uma opção de empréstimo</p>
          )}
        </div>
      </div>
    </>
  );
}
