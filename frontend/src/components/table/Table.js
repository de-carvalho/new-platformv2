import React, { Component } from "react";
import Table from "react-bootstrap/Table";

export class TablePart extends Component {
  render() {
    const tableInfo = [
      {
        field1: "Teste",
        field2: "Teste",
        field3: "Teste",
        field4: "Teste",
        field5: "Teste",
        field6: "Teste",
        field7: "Teste",
        field8: "Teste",
      },
      {
        field1: "Teste",
        field2: "Teste",
        field3: "Teste",
        field4: "Teste",
        field5: "Teste",
        field6: "Teste",
        field7: "Teste",
        field8: "Teste",
      },
    ];

    const renderTableInfo = (tabela, index) => {
      return (
        <tr key={index}>
          <td>{tabela.field1}</td>
          <td>{tabela.field2}</td>
          <td>{tabela.field3}</td>
          <td>{tabela.field4}</td>
          <td>{tabela.field5}</td>
          <td>{tabela.field6}</td>
          <td>{tabela.field7}</td>
          <td>{tabela.field8}</td>
        </tr>
      );
    };
    return (
      <div>
        <Table striped bordered hover variant="dark" responsive="sm">
          <thead>
            <tr>
              <th>{this.props.title1}</th>
              <th>{this.props.title2}</th>
              <th>{this.props.title3}</th>
              <th>{this.props.title4}</th>
              <th>{this.props.title5}</th>
              <th>{this.props.title6}</th>
              <th>{this.props.title7}</th>
              <th>{this.props.title8}</th>
            </tr>
          </thead>
          <tbody>{tableInfo.map(renderTableInfo)}</tbody>
        </Table>
      </div>
    );
  }
}

export default TablePart;
