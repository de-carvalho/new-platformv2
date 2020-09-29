import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaChevronDown, FaEdit } from "react-icons/fa";

import { useAuth } from "../../auth/auth";

import avatarImg from "../../assets/images/user.png";

import "./styles/headerDash.css";
import "./styles/headerDashResponsive.css";

const HeaderDash = ({ alterLink }) => {
  const [clicked, setClicked] = useState(false);
  const { signOut, user } = useAuth();

  return (
    <div id="header">
      <header>
        <nav>
          <ul>
            <Link to="/about">sobre</Link>
            <Link to="/team">time</Link>
            <Link to="/projects">projetos</Link>
            <Link to="/partners">parceiros</Link>
            <Link to="/">blog</Link>
            <Link to="/contact">contato</Link>
          </ul>
        </nav>
        <ul className="perfil">
          <li className="perfilItem" onClick={() => setClicked(!clicked)}>
            <img
              src={!user ? "" : !user.avatarUrl ? avatarImg : user.avatarUrl}
              alt=""
            />
            <span>{!user ? "" : user.name}</span>
            <FaChevronDown />
          </li>
          <div className={clicked ? "dropdownPerfil" : "dropdownPerfilOff"}>
            <ul>
              <li>
                <Link to={alterLink}>
                  <FaEdit className="perfilIcon" />
                  Editar dados
                </Link>
              </li>
              <li onClick={signOut} className="logout">
                <FaSignOutAlt className="perfilIcon" />
                Sair
              </li>
            </ul>
          </div>
        </ul>
      </header>
    </div>
  );
};

export default HeaderDash;
