import React from "react";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import Timeline from "../../../components/timeline/Timeline";

import "./styles/about.css";
import "./styles/aboutResponsive.css";

import Award from "../../../assets/images/award.jpg";

export default function About() {
  return (
    <div>
      <Header />

      <div id="main">
        <div id="banner"></div>

        <h3>Nossa história</h3>

        <div className="text">
          <p>
            Firgun é uma palavra de origem hebraica. Pode ser traduzida como "um
            sentimento de prazer genuíno ou orgulho pelas conquistas de outra
            pessoa. Com um coração puramente generoso e sem ciúmes." Queremos
            multiplicar firgun no mundo. Como sociedade podemos nos unir para
            melhorar a qualidade de vida de quem mais precisa.
          </p>
        </div>

        <div className="storyLine">
          <Timeline />
        </div>

        <div className="purpose">
          <div className="field">
            <h4>Por que criamos a Firgun?</h4>
            <p>
              No Brasil, 60% das pessoas fazem parte das classes C, D e E. São
              mais de 100 milhões de pessoas que vivem com um salário mínimo por
              mês. Por que tantas pessoas fazem parte da baixa renda? Nossa
              missão é amenizar a desigualdade social brasileira, facilitando
              acesso a microcrédito justo para empreendedores de baixa renda.
              Fazemos isso através dessa plataforma de empréstimos coletivos.
            </p>
          </div>

          <div className="field">
            <h4>Oque fazemos?</h4>
            <p>
              Conectamos as duas pontas de uma rede solidária. De uma lado
              empreendedores que precisam de capital para investir em seus
              negócios e de outro, pessoas que estão dispostas a investir para
              promover impacto positivo no mundo. Não somos um banco, somos
              facilitadores. Aqui não acontecem doações, mas sim investimentos.
            </p>
          </div>
        </div>

        <h3>Premiações</h3>

        <div className="awards">
          <div className="textAwards">
            <div className="text1">
              <h4>Iniciativa Incluir</h4>
              <p>
                Em agosto de 2017 fomos agraciados com o prêmio da Iniciativa
                Incluir, organizado pelo PNUD, o Programa das Nações Unidas para
                o Desenvolvimento e SEBRAE. Entre mais de 850 organizações
                inscritas a Firgun foi premiada na categoria "Ideia Inovadora",
                junto com outros 9 negócios sociais. Estamos unidos pela
                iniciativa de desenvolver projetos de impacto social alinhados
                com os Objetivos do Desenvolvimento Sustentável (ODS) da ONU.
              </p>
            </div>

            <div className="text2">
              <h4>Aceleradoras</h4>
              <p>
                Em 2017 fomos selecionados para participar da aceleração do
                Social Good Brasil, organização voltada para contribuir com o
                desenvolvimento de novos negócios sociais.
              </p>
            </div>
          </div>

          <img src={Award} alt="" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
