import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/value.css";
import "./styles/valueResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});
export default function WithdrawValue() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [project, setProject] = useState({});
  const [projectBalance, setProjectBalance] = useState({});
  const [purchasing, setPurchasing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    api.get("entrepreneurs/project-not-refunded").then((project) => {
      setProject(project.data);
      api
        .get("projects/balance", {
          params: { project_id: project.data.id },
        })
        .then((balance) => {
          setProjectBalance(balance.data);
        });
    });
  }, [loaded]);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const handleWithdrawValue = async () => {
    setPurchasing(!purchasing);
    const data = {
      amount,
    };

    try {
      await api.post(
        `entrepreneurs/withdraw-money?project_id=${project.id}`,
        data
      );

      setLoaded(!loaded);
      setAmount("");
    } catch (error) {
      toast.error("Não foi possível fazer o saque");
      console.log(error);
    }
  };

  let modalDataSpinnner = (
    <>
      <p>Aguarde...</p>
      <Spinner />
    </>
  );
  let modalData = (
    <div className="modalData">
      <MdCheckCircle size={100} color="#34cc20" />
      <p>Saque realizado com sucesso!</p>
    </div>
  );

  return (
    <>
      <MenuMobile />
      <div id="value">
        <Menu loaded={loaded} />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {loaded ? modalData : modalDataSpinnner}
          </Modal>

          <h3>Sacar crédito</h3>

          {Object.entries(project).length !== 0 ? (
            <div className="drawTable">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Valor</th>
                    <th>Saldo</th>
                    <th>Sacar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{project.name}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Digite o valor"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </td>
                    <td>R$ {projectBalance.current}</td>
                    <td className="action">
                      <button onClick={handleWithdrawValue}>Sacar saldo</button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ) : (
            <p>Nenhum projeto completo foi encontrado</p>
          )}
        </div>
      </div>
    </>
  );
}
