import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { FaSearch } from "react-icons/fa";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuPartner/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import "./styles/wallet.css";
import "./styles/walletResponsive.css";

export default function WalletEntrepreneur() {
  return (
    <>
      <MenuMobile />
      <div id="partnerWallet">
        <Menu />

        <div className="content">
          <HeaderDash />

          <h3 className="txt">
            Confirmar empreendedores registrados pela plataforma
          </h3>

          <div className="search">
            <span>
              <FaSearch />
            </span>
            <input type="text" placeholder="Procurar empreendedor ou projeto" />
          </div>

          <div className="wallTable">
            <Table responsive>
              <thead>
                <tr>
                  <th>Empreendedor</th>
                  <th>Projeto</th>
                  <th>Data do cadastro</th>
                  <th>Status</th>
                  <th>Valor pedido</th>
                  <th>Valor captado</th>
                  <th>Valor recebido</th>
                  <th>% de Juros</th>
                  <th>Vezes</th>
                  <th>Situação</th>
                  <th>Detalhe</th>
                  <th>Extrato</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Marcos Gomes</td>
                  <td>Oficina do Marcos</td>
                  <td>12/07/2019</td>
                  <td>Em captação</td>
                  <td>R$ 12.000,00</td>
                  <td>R$ 10.000,00</td>
                  <td>R$ 9.000,00</td>
                  <td>1% mês</td>
                  <td>15</td>
                  <td>Em dia</td>
                  <td>
                    <Link to="/walletEntrepreneurDetails">Detalhes</Link>
                  </td>
                  <td>
                    <input type="checkbox" name="" id="" />
                  </td>
                </tr>
              </tbody>
            </Table>
            <button>Gerar extrato</button>
          </div>
        </div>
      </div>
    </>
  );
}
