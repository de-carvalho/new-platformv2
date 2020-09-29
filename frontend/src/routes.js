import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Importações das páginas da WEB
import Login from "./pages/WebPages/Login";
import RecoverPassword from "./pages/WebPages/RecoverPassword";
import ResetPassword from "./pages/WebPages/RecoverPassword/ResetPassword";
import ChooseRegister from "./pages/WebPages/ChooseRegister";
import AllProjects from "./pages/WebPages/AllProjects";
import About from "./pages/WebPages/About";
import Team from "./pages/WebPages/Team";
import ProjectDetails from "./pages/WebPages/ProjectDetails";
import ProjectInvestment from "./pages/WebPages/ProjectInvestment";
import Partners from "./pages/WebPages/Partners";
import Projects from "./pages/WebPages/Projects";
// Cadastro de empreendedor
import EntrepreneurRegisterOne from "./pages/WebPages/EntrepreneurRegister/userData";
import EntrepreneurRegisterTwo from "./pages/WebPages/EntrepreneurRegister/userPersonalData";
import EntrepreneurRegisterThree from "./pages/WebPages/EntrepreneurRegister/userValueData";
import EntrepreneurRegisterFour from "./pages/WebPages/EntrepreneurRegister/userPasswordData";
import EntrepreneurRegisterSuccess from "./pages/WebPages/EntrepreneurRegister/success";
// Cadastro de parceiro
import PartnerRegisterOne from "./pages/WebPages/PartnerRegister/userData";
import PartnerRegisterTwo from "./pages/WebPages/PartnerRegister/userPersonalData";
import PartnerRegisterThree from "./pages/WebPages/PartnerRegister/userDescriptionData";
import PartnerRegisterFour from "./pages/WebPages/PartnerRegister/userPasswordData";
import PartnerRegisterSuccess from "./pages/WebPages/PartnerRegister/success";
// Cadastro de investidor
import InvestorRegisterOne from "./pages/WebPages/InvestorRegister/userData";
import InvestorRegisterTwo from "./pages/WebPages/InvestorRegister/userPersonalData";
import InvestorRegisterThree from "./pages/WebPages/InvestorRegister/userPasswordData";
import InvestorRegisterSuccess from "./pages/WebPages/InvestorRegister/success";
// Importações das páginas do Investidor
import InvestorHome from "./pages/Investor/Home";
import InvestorTransfer from "./pages/Investor/BalanceTransfer";
import InvestmentSitutation from "./pages/Investor/InvestmentSituation";
import InvestmentSitutationDetails from "./pages/Investor/InvestmentSituationDetails";
import InvestorDocuments from "./pages/Investor/InvestorDocuments";
import FirgunDocuments from "./pages/Investor/FirgunDocuments";
import BalanceStatement from "./pages/Investor/BalanceStatement";
import WithdrawBalance from "./pages/Investor/WithdrawBalance";
import PersonalData from "./pages/Investor/PersonalData";
import FirgunData from "./pages/Investor/PersonalData/firgunData";
import PersonalBankData from "./pages/Investor/PersonalData/personalBank";
import ChangeData from "./pages/Investor/PersonalData/changeData";
import InvestorProfile from "./pages/Investor/InvestorProfile";

// Importações das páginas do empreendedor
import EntrepreneurHome from "./pages/Entrepreneur/Home";
import EntrepreneurProject from "./pages/Entrepreneur/Project";
import SendDocuments from "./pages/Entrepreneur/SendDocuments";
import EntrepreneurLoan from "./pages/Entrepreneur/Loan";
import EntrepreneurContract from "./pages/Entrepreneur/Contract";
import ProjectData from "./pages/Entrepreneur/Contract/projectData";
import EntrepreneurData from "./pages/Entrepreneur/PersonalData";
import PsicometricTest from "./pages/Entrepreneur/PsicometricTest";
import EntrepreneurFirgunDocs from "./pages/Entrepreneur/FirgunDocuments";
import BankData from "./pages/Entrepreneur/Contract/bankData";
import WithdrawValue from "./pages/Entrepreneur/WithdrawValue";
import PaymentStatement from "./pages/Entrepreneur/PaymentStatement";
import GenerateTicket from "./pages/Entrepreneur/GenerateTicket";
import PayOffBalance from "./pages/Entrepreneur/PayOffBalance";

// Importações das páginas do Parceiro
import PartnerHome from "./pages/Partner/Home";
import PartnerData from "./pages/Partner/PartnerData";
import AboutOrganization from "./pages/Partner/PartnerData/aboutOrganization";
import AboutOrganization2 from "./pages/Partner/PartnerData/aboutOrganization2";
import RegisterEntrepreneur from "./pages/Partner/RegisterEntrepreneur";
import ApproveEntrepreneur from "./pages/Partner/ApproveEntrepreneur";
import WalletEntrepreneur from "./pages/Partner/WalletEntrepreneur";
import WalletEntrepreneurDetails from "./pages/Partner/WalletEntrepreneurDetails";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Rotas das páginas da Web */}
        <Route path="/login" component={Login} />
        <Route path="/recoverPassword" component={RecoverPassword} />
        <Route path="/resetPassword" component={ResetPassword} />
        <Route path="/chooseRegister" component={ChooseRegister} />
        <Route path="/allProjects" component={AllProjects} />
        <Route path="/about" component={About} />
        <Route path="/team" component={Team} />
        <Route path="/projectDetails" component={ProjectDetails} />
        <Route path="/projectInvestment" component={ProjectInvestment} />
        <Route path="/partners" component={Partners} />
        <Route path="/projects" component={Projects} />
        {/* Rotas de cadastro de empreendedor */}
        <Route
          path="/entrepreneurRegister/stepOne"
          component={EntrepreneurRegisterOne}
        />
        <Route
          path="/entrepreneurRegister/stepTwo"
          component={EntrepreneurRegisterTwo}
        />
        <Route
          path="/entrepreneurRegister/stepThree"
          component={EntrepreneurRegisterThree}
        />
        <Route
          path="/entrepreneurRegister/stepFour"
          component={EntrepreneurRegisterFour}
        />
        <Route
          path="/entrepreneurRegister/success"
          component={EntrepreneurRegisterSuccess}
        />
        {/* Fim das rotas de cadastro de empreendedor */}

        {/* Rotas de cadastro de parceiro */}
        <Route path="/partnerRegister/stepOne" component={PartnerRegisterOne} />
        <Route path="/partnerRegister/stepTwo" component={PartnerRegisterTwo} />
        <Route
          path="/partnerRegister/stepThree"
          component={PartnerRegisterThree}
        />
        <Route
          path="/partnerRegister/stepFour"
          component={PartnerRegisterFour}
        />
        <Route
          path="/partnerRegister/success"
          component={PartnerRegisterSuccess}
        />
        {/* Fim das rotas de cadastro de parceiro */}

        {/* Rotas de cadastro de investidor */}
        <Route
          path="/investorRegister/stepOne"
          component={InvestorRegisterOne}
        />
        <Route
          path="/investorRegister/stepTwo"
          component={InvestorRegisterTwo}
        />
        <Route
          path="/investorRegister/stepThree"
          component={InvestorRegisterThree}
        />
        <Route
          path="/investorRegister/success"
          component={InvestorRegisterSuccess}
        />
        {/* Fim das rotas de cadastro de investidor */}

        {/* Fim das rotas das páginas da Web */}

        {/* Rotas das páginas do Investidor */}
        <Route path="/investorHome" component={InvestorHome} />
        <Route path="/investorTransfer" component={InvestorTransfer} />
        <Route path="/investmentSituation" component={InvestmentSitutation} />
        <Route
          path="/investmentSituationDetails"
          component={InvestmentSitutationDetails}
        />
        <Route path="/investorDocuments" component={InvestorDocuments} />
        <Route path="/firgunDocuments" component={FirgunDocuments} />
        <Route path="/balanceStatement" component={BalanceStatement} />
        <Route path="/withdrawBalance" component={WithdrawBalance} />
        <Route path="/personalData" component={PersonalData} />
        <Route path="/firgunData" component={FirgunData} />
        <Route path="/personalBankData" component={PersonalBankData} />
        <Route path="/changeData" component={ChangeData} />
        <Route path="/investorProfile" component={InvestorProfile} />
        {/* Fim das rotas das páginas do Investidor */}

        {/* Rotas das páginas do empreendedor */}
        <Route path="/entrepreneurHome" component={EntrepreneurHome} />
        <Route path="/entrepreneurProject" component={EntrepreneurProject} />
        <Route path="/sendDocuments" component={SendDocuments} />
        <Route path="/entrepreneurLoan" component={EntrepreneurLoan} />
        <Route path="/entrepreneurContract" component={EntrepreneurContract} />
        <Route path="/enrepreneurProjectData" component={ProjectData} />
        <Route path="/entrepeneurBankData" component={BankData} />
        <Route path="/withdrawValue" component={WithdrawValue} />
        <Route path="/paymentStatement" component={PaymentStatement} />
        <Route path="/generateTicket" component={GenerateTicket} />
        <Route path="/payOffBalance" component={PayOffBalance} />
        <Route path="/entrepreneurData" component={EntrepreneurData} />
        <Route path="/psicometricTest" component={PsicometricTest} />
        <Route
          path="/entrepreneurFirgunDocuments"
          component={EntrepreneurFirgunDocs}
        />
        {/* Fim das rotas das páginas do empreendedor */}

        {/* Rotas das páginas do Parceiro */}
        <Route path="/partnerHome" component={PartnerHome} />
        <Route path="/partnerData" component={PartnerData} />
        <Route
          path="/partnerData-aboutOrganization"
          component={AboutOrganization}
        />
        <Route
          path="/partnerData-aboutOrganization2"
          component={AboutOrganization2}
        />
        <Route path="/registerEntrepreneur" component={RegisterEntrepreneur} />
        <Route path="/approveEntrepreneur" component={ApproveEntrepreneur} />
        <Route path="/walletEntrepreneur" component={WalletEntrepreneur} />
        <Route
          path="/walletEntrepreneurDetails"
          component={WalletEntrepreneurDetails}
        />
        {/* Fim das rotas das páginas do Parceiro */}
      </Switch>
    </BrowserRouter>
  );
}
