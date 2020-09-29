import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { AiOutlinePlusSquare } from "react-icons/ai";
import moment from "moment";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Card from "../../../components/card/Card";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/homeEntr.css";
import "./styles/homeEntrResponsive.css";

export default function EntrepreneurHome() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [projectProgress, setProjectProgress] = useState({});
  const [projectsCompleted, setProjectsCompleted] = useState([]);
  const [altered, setAltered] = useState(false);

  useEffect(() => {
    api
      .get("projects/user-in-progress")
      .then((project) => {
        setProjectProgress(project.data);
      })
      .catch((error) => {
        setProjectProgress({});
        console.log(error);
      });

    api
      .get("projects/user-completed")
      .then((projects) => {
        setProjectsCompleted(projects.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [altered]);

  return (
    <>
      <MenuMobile />
      <div id="entreHome">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <fieldset className="homeBox">
            <div className="txt">
              <div className="text">
                <p>Projeto em andamento</p>
              </div>

              <div className="tex">
                <Link to="/entrepreneurProject">
                  <button>Novo projeto</button>
                  <AiOutlinePlusSquare className="icon" />
                </Link>
              </div>
            </div>

            <div className="cards">
              {Object.entries(projectProgress).length > 0 ? (
                <Card
                  project={projectProgress}
                  name={projectProgress.name}
                  description={projectProgress.description}
                  category={projectProgress.category}
                  value={projectProgress.goal}
                  raised={projectProgress.raised}
                  projectId={projectProgress.id}
                  projectState={projectProgress.state}
                  setAltered={setAltered}
                  percentage={(
                    (Number(projectProgress.raised) /
                      Number(projectProgress.goal)) *
                    100
                  ).toFixed(2)}
                />
              ) : (
                <p>Nenhum projeto</p>
              )}
            </div>

            <div className="text">
              <p>Projetos concluídos</p>
            </div>

            <div className="table">
              {projectsCompleted.length > 0 ? (
                <Table responsive="sm" hover>
                  <thead>
                    <tr>
                      <th>Projeto</th>
                      <th>Data de criação</th>
                      <th>Total recebido</th>
                      <th>Total devolvido</th>
                      <th>% de Juros</th>
                      <th>Total de parcelas</th>
                      <th>Parcelas pagas</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectsCompleted.map((project) => (
                      <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>
                          {moment(project.creationDate).format("DD/MM/YYYY")}
                        </td>
                        <td>R$ {project.raised},00</td>
                        <td>R$ {project.paidback},00</td>
                        <td>R$ {project.percentageFee}</td>
                        <td>{project.installmentsPrediction}</td>
                        <td>{project.installmentsPayed}</td>
                        <td>
                          {project.paymentState === "REFUNDING"
                            ? "REEMBOLSANDO"
                            : project.paymentState === "NOT_REFUNDED"
                            ? "NÃO REEMBOLSADO"
                            : "REEMBOLSADO"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Nenhum projeto</p>
              )}
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}
