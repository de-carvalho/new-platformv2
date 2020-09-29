import React, { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import * as Yup from "yup";
import { Form, Input, Select, Textarea } from "@rocketseat/unform";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/project.css";
import "./styles/projectResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

//validação do formulário com yup
const schema = Yup.object().shape({
  name: Yup.string().required("O projeto precisa ter um nome"),
  timeBussiness: Yup.string().required("Tempo de negócio obrigatório"),
  amount: Yup.string().required("É obrigatório ter um valor"),
  timeToReceive: Yup.string().required("Tempo limite previsto é obrigatório"),
  category: Yup.string().required("O campo categoria é obrigatório"),
  urlLink: Yup.string().required("É obrigatório ter um link do vídeo"),
  shortDescrition: Yup.string().required("Obrigatório ter uma breve descrição"),
  city: Yup.string().required("Obrigatório informar a localidade"),
  pageContent: Yup.string()
    .min(50, "50 carácteres no mínimo")
    .max(400, "400 carácteres no máximo")
    .required("É obrigatório descrever o projeto"),
});

export default function EntrepreneurProject() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [purchasing, setPurchasing] = useState(false);
  const [criated, setCriated] = useState(false);
  const [name, setName] = useState("");
  const [timeBussiness, setTimeBussiness] = useState("");
  const [amount, setAmount] = useState("");
  const [timeToReceive, setTimetoReceive] = useState("");
  const [category, setCategory] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [shortDescrition, setShortDescription] = useState("");
  const [city, setCity] = useState("");
  const [pageContent, setPageContent] = useState("");

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  // Quando o projeto é criado
  let modalDataCriated = (
    <div className="modalCriated">
      <MdCheckCircle size={100} color="#34cc20" />
      <p>Projeto criado com sucesso!</p>
    </div>
  );

  let modalDataSpinner = (
    <div className="modalSpinner">
      <Spinner />
      <p>Aguarde...!</p>
    </div>
  );

  const handleSubmit = async () => {
    const data = {
      name,
      description: shortDescrition,
      goal: amount,
      pageContent,
      dateLimit: timeToReceive,
      location: city,
      videoUrl: urlLink,
      category,
      businessTime: timeBussiness,
    };

    setPurchasing(!purchasing);
    try {
      await api.post(`projects?user_account_type=${user.accountType}`, data);

      setCriated(true);

      history.push("/entrepreneurHome");
    } catch (error) {
      toast.error("Não foi possível criar o projeto");
      console.log(error);
    }
  };

  return (
    <>
      <MenuMobile />
      <div id="projectEntr">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {criated ? modalDataCriated : modalDataSpinner}
          </Modal>

          <div className="prjct">
            <h3>Escrever o projeto</h3>
            <Form onSubmit={handleSubmit} autoComplete="off" schema={schema}>
              <div className="field">
                <label>
                  Nome do projeto*:
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Digite o nome do seu projeto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label>
                  Tempo de negócio*:
                  <Input
                    id="timeBussiness"
                    name="timeBussiness"
                    type="text"
                    placeholder="A quanto tempo tem/faz esse negócio?"
                    value={timeBussiness}
                    onChange={(e) => setTimeBussiness(e.target.value)}
                  />
                </label>
              </div>

              <div className="field">
                <label>
                  Valor desejado para empréstimo*:
                  <Input
                    id="amount"
                    name="amount"
                    type="text"
                    placeholder="Digite o valor que pretende emprestar"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </label>

                <label>
                  Tempo limite previsto*:
                  <Input
                    id="timeToReceive"
                    name="timeToReceive"
                    type="date"
                    placeholder="Até quando pretende receber o empréstimo?"
                    value={timeToReceive}
                    onChange={(e) => setTimetoReceive(e.target.value)}
                  />
                </label>
              </div>

              <div className="field">
                <label>
                  Categoria*:
                  <Select
                    id="category"
                    name="category"
                    placeholder="Selecione"
                    options={[
                      { id: "Desporto", title: "Desporto" },
                      { id: "Beleza", title: "Beleza" },
                      { id: "Restaurante", title: "Restaurante" },
                    ]}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Select>
                </label>

                <label>
                  URL do vídeo do projeto*:
                  <Input
                    id="urlLink"
                    name="urlLink"
                    type="text"
                    placeholder="Digite ou cole o link do vídeo do projeto"
                    value={urlLink}
                    onChange={(e) => setUrlLink(e.target.value)}
                  />
                </label>
              </div>

              <div className="field">
                <label>
                  Descrição breve*:
                  <Input
                    id="shortDescrition"
                    name="shortDescrition"
                    type="text"
                    placeholder="Descreva brevemente sobre o projeto"
                    value={shortDescrition}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </label>

                <label>
                  Localidade*:
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Qual a localidade onde realiza o negócio?"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
              </div>

              <div className="field">
                <label>
                  Fale sobre o projeto*:
                  <Textarea
                    id="pageContent"
                    name="pageContent"
                    cols="30"
                    rows="10"
                    placeholder="Fale sobre o projeto"
                    value={pageContent}
                    onChange={(e) => setPageContent(e.target.value)}
                  />
                </label>
              </div>

              <div className="formButton">
                <button type="submit">Confirmar</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
