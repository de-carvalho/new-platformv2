import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function TableLine({
  handleDelete,
  handlePurchaseTrue,
  date,
  name,
  id,
  status,
  projectId,
  field,
  urlLink,
}) {
  return (
    <tr>
      <td>{field ? moment(date).format("DD/MM/YYYY") : "--/--/----/"}</td>
      <td>{name}</td>
      <td>{field ? status : "Não enviado"}</td>
      <td className="action">
        <button
          className={
            id === "IDENTITY_FRONT" && !field
              ? ""
              : id !== "IDENTITY_FRONT" && !field
              ? ""
              : "btnDisabled"
          }
          disabled={field ? true : false}
          id={id}
          onClick={(e) => handlePurchaseTrue(e.target.id, projectId)}
        >
          Enviar
        </button>
        <button
          className={field ? "" : "btnDisabled"}
          disabled={!field ? true : false}
          id={id}
          onClick={(e) => handleDelete(e.target.id, projectId)}
        >
          Apagar
        </button>
        <button
          className={field ? "" : "btnDisabled"}
          disabled={!field ? true : false}
          id={id}
          onClick={(e) => handlePurchaseTrue(e.target.id, projectId, true)}
        >
          Reenviar
        </button>
        <NavLink
          to={{
            pathname: urlLink,
          }}
          target="blank"
        >
          <button
            className={field ? "" : "btnDisabled"}
            disabled={!field ? true : false}
          >
            Visualizar
          </button>
        </NavLink>
      </td>
    </tr>
  );
}
