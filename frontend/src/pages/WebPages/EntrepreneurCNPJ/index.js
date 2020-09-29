import React from "react";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import Form from "../../../components/forms/entrepreneur/cnpj/UserForm";

import "./styles/partnerCNPJ.css";

export default function FormPartnerCNPJ() {
  return (
    <div id="partnerCNPJ">
      <Header />
      <Form />
      <Footer />
    </div>
  );
}
