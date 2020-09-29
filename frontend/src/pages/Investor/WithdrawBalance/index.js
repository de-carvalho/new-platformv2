import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";
import { MdCheckCircle } from "react-icons/md";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/withdraw.css";
import "./styles/withdrawResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});
//validação do formulário com yup
const schema = Yup.object().shape({
  amount: Yup.string().required("É obrigatório ter um valor"),
});

export default function WithdrawBalance() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [purchasing, setPurchasing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [amount, setAmount] = useState("");

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const handleWithdrawValue = useCallback(async () => {
    setPurchasing(!purchasing);

    try {
      await api.post("/supporters/withdrawn-money", { amount });

      setLoaded(!loaded);
      setAmount("");
    } catch (error) {
      toast.error("Não foi possível fazer o saque");
      console.log(error);
    }
  }, [amount, loaded, purchasing]);

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
      <div id="withdraw">
        <Menu loaded={loaded} />

        <div className="content">
          <HeaderDash alterLink="personalData" />

          <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {loaded ? modalData : modalDataSpinnner}
          </Modal>

          <h3>Sacar saldo</h3>

          <div className="drawBalance">
            <Form
              onSubmit={handleWithdrawValue}
              autoComplete="off"
              schema={schema}
            >
              <div className="formGroup">
                <label>Valor:</label>
                <Input
                  id="amount"
                  name="amount"
                  type="text"
                  placeholder="Digite um valor"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button type="submit">Confirmar</button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
