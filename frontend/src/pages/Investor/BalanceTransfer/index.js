import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";
import { MdCheckCircle, MdError } from "react-icons/md";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/transfer.css";
import "./styles/transferResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

// validação do formulário com yup
const schema = Yup.object().shape({
  name: Yup.string().required("Nome obrigatório"),
  email: Yup.string().email().required("Email obrigatório"),
  amount: Yup.string().required("É obrigatório ter um valor"),
  documentType: Yup.string().required("Tipo do documento é obrigatório"),
  document: Yup.string().required("Número do documento é obrigatório"),
});

export default function BalanceTransfer() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [amount, setAmount] = useState("");
  const [purchasing, setPurchasing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const handleGetTarget = useCallback(async () => {
    try {
      console.log(document);
      const target = await api.get(
        `/payments/transfer-target?document_number=${document}`
      );
      setName(`${target.data.firstName} ${target.data.lastName}`);
      setEmail(target.data.email);
      setDocumentType(target.data.taxDocumentType);
    } catch (error) {
      toast.error("Destinatário não foi encontrado");
      console.log(error);
    }
  }, [document]);

  let modalDataTransfered = (
    <div className="modalTransfered">
      <MdCheckCircle size={100} color="#34cc20" />
      <p>Transferência realizada com sucesso!</p>
    </div>
  );
  let modalDataError = (
    <div className="modalTransfered">
      <MdError size={100} color="#e02041" />
      <p>Erro ao fazer a transferência</p>
    </div>
  );

  let modalDataSpinner = (
    <div className="modalSpinner">
      <Spinner />
      <p>Aguarde...!</p>
    </div>
  );

  const handleSubmit = useCallback(async () => {
    const data = {
      fullname: name,
      email,
      taxDocumentType: documentType,
      taxDocumentNumber: document,
      amount,
      method: "MOIP_ACCOUNT",
    };

    setPurchasing(!purchasing);
    try {
      await api.post("/payments/transfers", data);

      setLoaded(!loaded);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }, [name, email, document, documentType, amount, purchasing, loaded]);

  return (
    <>
      <MenuMobile />
      <div id="investorTransfer">
        <Menu loaded={loaded} />
        <div className="content">
          <HeaderDash alterLink="personalData" />

          <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {loaded
              ? modalDataTransfered
              : error
              ? modalDataError
              : modalDataSpinner}
          </Modal>

          <h3>Transferência entre contas - Firgun</h3>

          <div className="transfer">
            <h5>Dados para transferência</h5>
            <Form
              className="formTransfer"
              onSubmit={handleSubmit}
              autoComplete="off"
              schema={schema}
            >
              <div className="field">
                <label>CPF ou CNPJ do destinatário:</label>
                <Input
                  id="document"
                  name="document"
                  type="text"
                  placeholder="Digite o CPF ou CNPJ"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                  onBlur={handleGetTarget}
                />
              </div>
              <div className="field">
                <label>Nome do destinatário:</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome do destinatário"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Email do destinatário:</label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email do destinatário"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Tipo do documento:</label>
                <Input
                  id="documentType"
                  name="documentType"
                  type="text"
                  placeholder="Tipo do documento"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                />
              </div>

              <div className="transferValue">
                <label>Valor para transferência:</label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Digite o valor"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="formButton">
                <button type="submit">Transferir</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
