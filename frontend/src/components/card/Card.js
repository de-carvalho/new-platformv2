import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { toast } from "react-toastify";
import { MdCheckCircle } from "react-icons/md";
import {
  FaSearch,
  FaEllipsisV,
  FaPause,
  FaPlay,
  FaMinusCircle,
  FaThumbsUp,
} from "react-icons/fa";

import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner";

import api from "../../services/api";

import "./styles/card.css";
import "./styles/cardResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default function Card(props) {
  const [clicked, setClicked] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [pause, setPause] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [details, setDetails] = useState(false);
  const [satisfied, setSatisfied] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  const purchaseCancelHandler = () => {
    setPurchasing(false);
    setPause(false);
    setCancel(false);
    setSatisfied(false);
    setDetails(false);
  };

  const purchaseTrue = () => {
    setPurchasing(!purchasing);
  };

  const purchaseClose = () => {
    setPurchasing(false);
    setPause(false);
    setCancel(false);
    setDetails(false);
  };

  const purchasePauseProject = () => {
    setPause(!pause);
  };

  const purchaseSatisfiedProject = () => {
    setSatisfied(!satisfied);
  };

  // Quando o boleto está sendo gerado
  let modalData = (
    <>
      <p>Aguarde...</p>
      <Spinner />
    </>
  );

  const handleCancelProject = async () => {
    setCancel(!cancel);

    try {
      const response = await api.post(
        `projects/cancel?project_id=${props.projectId}`
      );

      setPaymentData(response.data);
      props.setAltered(purchasing);
    } catch (error) {
      toast.error("Erro ao cancelar o projeto");
      console.log(error);
    }
  };

  let modalDataLoaded = (
    <>
      <h5>Projeto cancelado</h5>
      {Number(props.raised) > 0 ? (
        <>
          <strong>Boleto para devolução dos valores</strong>
          <p>Abaixo segue o código do boleto:</p>
          <p>{paymentData.lineCode}</p>
          <p>
            <strong>Preço Total: R$ {paymentData.amount}</strong>
          </p>
        </>
      ) : (
        <div className="modalDataLoaded">
          <MdCheckCircle size={100} color="#34cc20" />
          <p>O seu projeto foi cancelado</p>
        </div>
      )}
      <button className="modalDataLoadedClose" onClick={purchaseClose}>
        FECHAR
      </button>
      {Number(props.raised) > 0 ? (
        <NavLink
          to={{
            pathname: paymentData.boletoLink,
          }}
          target="blank"
        >
          <button className="modalDataLoadedPrint">IMPRIMIR BOLETO</button>
        </NavLink>
      ) : (
        ""
      )}
    </>
  );

  const handleContinueProject = async () => {
    try {
      const response = await api.post(
        `projects/continue?project_id=${props.projectId}`
      );
      toast.success(response.data.message);
      props.setAltered(!true);
    } catch (error) {
      toast.error("Erro ao pausar o projeto");
      console.log(error);
    }
  };

  const handlePauseProject = async () => {
    try {
      const response = await api.post(
        `projects/pause?project_id=${props.projectId}`
      );
      toast.success(response.data.message);
      props.setAltered(!!pause);
      setPause(!pause);
    } catch (error) {
      toast.error("Erro ao pausar o projeto");
      console.log(error);
    }
  };

  const handleSatisfiedProject = async () => {
    try {
      await api.post(
        `entrepreneurs/project/satisfied-amount?project_id=${props.projectId}`
      );
      toast.success("Projeto finalizado com sucesso!");
      props.setAltered(!!satisfied);
      setSatisfied(!satisfied);
    } catch (error) {
      toast.error("Erro ao pausar o projeto");
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={details} modalClosed={purchaseCancelHandler}>
        <h5>{props.project.name}</h5>
        <div className="projectBox">
          <div>
            <div>
              <strong>Estado do projeto</strong>
              <p>{props.project.state}</p>
            </div>
            <div>
              <strong>Estado de pagamento</strong>
              <p>{props.project.paymentState}</p>
            </div>
          </div>
          <div>
            <div>
              <strong>Meta do projeto</strong>
              <p>R$ {props.project.goal}</p>
            </div>
            <div>
              <strong>Valor captado</strong>
              <p>R$ {props.project.raised}</p>
            </div>
          </div>
        </div>
        <div className="projectBox">
          <div>
            <div>
              <strong>Valor Total a devolver</strong>
              <p>R$ {props.project.totalToPayback}</p>
            </div>
            <div>
              <strong>Total de parcelas</strong>
              <p>{props.project.installmentsPrediction}</p>
            </div>
          </div>
          <div>
            <div>
              <strong>Em captação até</strong>
              <p>{props.project.dateLimit}</p>
            </div>
            <div>
              <strong>Juros</strong>
              <p>R$ {props.project.percentageFee}</p>
            </div>
          </div>
        </div>
        <div className="projectDescription">
          <strong>Descrição</strong>
          <textarea
            cols="40"
            rows="5"
            value={props.project.pageContent}
          ></textarea>
        </div>
      </Modal>

      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        <h5>Confirmação de cancelamento</h5>
        <p>Tem certeza que pretende cancelar o projeto?</p>
        <div className="modalButtons">
          <button onClick={handleCancelProject}>Confirmar</button>
          <button onClick={purchaseCancelHandler}>Cancelar</button>
        </div>
      </Modal>

      <Modal show={pause} modalClosed={purchaseCancelHandler}>
        <h5>Confirmação de suspenção</h5>
        <p>Tem certeza que pretende pausar o projeto?</p>
        <div className="modalButtons">
          <button onClick={handlePauseProject}>Confirmar</button>
          <button onClick={purchaseCancelHandler}>Cancelar</button>
        </div>
      </Modal>

      <Modal show={satisfied} modalClosed={purchaseCancelHandler}>
        <h5>Confirmação de satisfação</h5>
        <p>Tem certeza de que está satisfeito com o valor captado até agora?</p>
        <div className="modalButtons">
          <button onClick={handleSatisfiedProject}>Confirmar</button>
          <button onClick={purchaseCancelHandler}>Cancelar</button>
        </div>
      </Modal>

      <Modal show={cancel} modalClosed={purchaseCancelHandler}>
        {Object.entries(paymentData).length === 0 ? modalData : modalDataLoaded}
      </Modal>

      <div
        id="card"
        style={{
          border:
            props.projectState === "PAUSED" ? "1px solid #f7e11a" : "none",
        }}
      >
        <div className="cardHeader">
          <h3>{props.name}</h3>
          <div className="dropdownContainer">
            <FaEllipsisV
              className="cardIcon"
              onClick={() => setClicked(!clicked)}
            />
            <ul className={clicked ? "dropdownMenu" : "dropdownMenuOff"}>
              <li className="dropItem" onClick={() => setDetails(!details)}>
                <FaSearch className="dropIcon" />
                Mais detalhes
              </li>
              <li
                className={
                  props.projectState === "CANCELED"
                    ? "dropItemBlocked"
                    : "dropItem"
                }
                onClick={purchaseTrue}
              >
                <FaMinusCircle className="dropIcon" />
                Cancelar projeto
              </li>
              <li
                className={
                  props.projectState === "PAUSED"
                    ? "dropItemBlocked"
                    : "dropItem"
                }
                onClick={purchasePauseProject}
              >
                <FaPause className="dropIcon" />
                Pausar projeto
              </li>
              <li
                className={
                  props.projectState === "CATCHING"
                    ? "dropItemBlocked"
                    : "dropItem"
                }
                onClick={handleContinueProject}
              >
                <FaPlay className="dropIcon" />
                Continuar projeto
              </li>
              <li className="dropItem" onClick={purchaseSatisfiedProject}>
                <FaThumbsUp className="dropIcon" />
                Satisfeito
              </li>
            </ul>
          </div>
        </div>

        <div>
          <p>Categoria: {props.category}</p>
          <p>Meta: R$ {props.value}</p>
          <p>Captado: R$ {props.raised}</p>
          <ProgressBar id="bar">
            <ProgressBar
              animated
              now={props.percentage}
              label={`${props.percentage}%`}
            />
          </ProgressBar>
        </div>
      </div>
    </>
  );
}
