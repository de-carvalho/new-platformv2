import React from "react";
import Table from "react-bootstrap/Table";
import { FaSearch } from "react-icons/fa";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

import "./styles/allProjects.css";
import "./styles/allProjectsResponsive.css";

export default function AllProjects() {
  return (
    <div id="allProjects">
      <Header />

      <div className="mainContent">
        <h3>Projetos que tiveram captação na FIRGUN</h3>

        <div className="search">
          <span>
            <FaSearch />
          </span>
          <input type="text" placeholder="Procurar empreendedor ou projeto" />
        </div>

        <div className="allTable">
          <Table responsive>
            <thead>
              <tr>
                <th>Empreendedor</th>
                <th>Projeto</th>
                <th>Data disponibilização</th>
                <th>Status</th>
                <th>Valor pedido</th>
                <th>Valor captado</th>
                <th>% de Juros</th>
                <th>Parceiro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Marcos Gomes</td>
                <td>Oficina do Marcos</td>
                <td>12/07/2019</td>
                <td>Encerrado</td>
                <td>R$ 12.000,00</td>
                <td>R$ 10.000,00</td>
                <td>1% mês</td>
                <td>Firgun</td>
              </tr>
              <tr>
                <td>Marcos Gomes</td>
                <td>Oficina do Marcos</td>
                <td>12/07/2019</td>
                <td>Encerrado</td>
                <td>R$ 12.000,00</td>
                <td>R$ 10.000,00</td>
                <td>1% mês</td>
                <td>Firgun</td>
              </tr>
              <tr>
                <td>Marcos Gomes</td>
                <td>Oficina do Marcos</td>
                <td>12/07/2019</td>
                <td>Encerrado</td>
                <td>R$ 12.000,00</td>
                <td>R$ 10.000,00</td>
                <td>1% mês</td>
                <td>Firgun</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
