import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/styles.css";
import "./styles/stylesResponsive.css";

export default function ChangeData() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [document, setDocument] = useState({});

  useEffect(() => {
    async function fetchProject() {
      const project = await api.get("entrepreneurs/project-not-refunded");
      const documentContract = await api.get(
        `entrepreneurs/firgun-document?project_id=${project.data.id}`
      );

      setDocument(documentContract.data);
    }

    fetchProject();
  }, []);

  return (
    <>
      <MenuMobile />
      <div id="documentsContainer">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <div className="perData">
            <h3>Documentos Firgun - Visualização de contrato</h3>

            <div className="document">
              <Link
                to={{ pathname: document.contractUrl }}
                target="_blank"
                // download={document.contractUrl}
              >
                <FaFilePdf size={60} color="#999999" />
                Contrato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
