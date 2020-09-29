import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import { toast } from "react-toastify";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/profile.css";
import "./styles/profileResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});
export default function InvestorProfile() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [profileData, setProfileData] = useState({});
  const [howConsidere, setHowConsidere] = useState(0);
  const [typesOfCauses, setTypesOfCauses] = useState("");
  const [howMuchInvest, setHowMuchInvest] = useState("");
  const [alreadyInvest, setAlreadyInvest] = useState(false);
  const [wantToReinvest, setWantToReinvest] = useState(false);
  const [wantToReceiveEmail, setWantToReceiveEmail] = useState(false);
  const [wantToReceiveInfo, setWantToReceiveInfo] = useState(false);

  useEffect(() => {
    api.get("supporters/profile").then((response) => {
      setProfileData(response.data);
      setHowConsidere(response.data.howDoYouConsidereYourself);
      setTypesOfCauses(response.data.typesOfcauses);
      setHowMuchInvest(response.data.howMuchWantToInvest);
      setAlreadyInvest(response.data.alreadyInvests);
      setWantToReinvest(response.data.wantToReinvestBalance);
      setWantToReceiveEmail(response.data.wantToReceiveEmail);
      setWantToReceiveInfo(response.data.wantToReceiveInformation);
    });
  }, []);

  const handleCreateProfile = useCallback(async () => {
    const data = {
      alreadyInvests: alreadyInvest,
      howDoYouConsidereYourself: Number(howConsidere),
      howMuchWantToInvest: Number(howMuchInvest),
      typesOfcauses: typesOfCauses,
      wantToReceiveEmail: wantToReceiveEmail,
      wantToReceiveInformation: wantToReceiveInfo,
      wantToReinvestBalance: wantToReinvest,
    };

    try {
      const response = await api.post("supporters/profile", data);

      setProfileData(response.data);
      setHowConsidere(response.data.howDoYouConsidereYourself);
      setTypesOfCauses(response.data.typesOfcauses);
      setHowMuchInvest(response.data.howMuchWantToInvest);
      setAlreadyInvest(response.data.alreadyInvests);
      setWantToReinvest(response.data.wantToReinvestBalance);
      setWantToReceiveEmail(response.data.wantToReceiveEmail);
      setWantToReceiveInfo(response.data.wantToReceiveInformation);

      toast.success("Perfil de investidor criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar perfil de investidor");
      console.log(error);
    }
  }, [
    alreadyInvest,
    howConsidere,
    howMuchInvest,
    typesOfCauses,
    wantToReceiveEmail,
    wantToReceiveInfo,
    wantToReinvest,
  ]);

  const handleUpdateProfile = useCallback(async () => {
    const data = {
      alreadyInvests: alreadyInvest,
      howDoYouConsidereYourself: Number(howConsidere),
      howMuchWantToInvest: Number(howMuchInvest),
      typesOfcauses: typesOfCauses,
      wantToReceiveEmail: wantToReceiveEmail,
      wantToReceiveInformation: wantToReceiveInfo,
      wantToReinvestBalance: wantToReinvest,
    };

    try {
      const response = await api.put("supporters/profile", data);

      setProfileData(response.data);
      setHowConsidere(response.data.howDoYouConsidereYourself);
      setTypesOfCauses(response.data.typesOfcauses);
      setHowMuchInvest(response.data.howMuchWantToInvest);
      setAlreadyInvest(response.data.alreadyInvests);
      setWantToReinvest(response.data.wantToReinvestBalance);
      setWantToReceiveEmail(response.data.wantToReceiveEmail);
      setWantToReceiveInfo(response.data.wantToReceiveInformation);

      toast.success("Perfil de investidor atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil de investidor");
      console.log(error);
    }
  }, [
    alreadyInvest,
    howConsidere,
    howMuchInvest,
    typesOfCauses,
    wantToReceiveEmail,
    wantToReceiveInfo,
    wantToReinvest,
  ]);

  return (
    <>
      <MenuMobile />
      <div id="investorProfile">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/personalData" />

          {Object.entries(profileData).length === 0 ? (
            <div className="profileContainer">
              <h3>Criar perifl de investidor</h3>
              <div className="profile">
                <div className="leftSide">
                  <div className="quest">
                    <div className="radioButton">
                      <p className="questionTitle">Ja investe em impacto?:</p>
                      <div className="radioGroup">
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="yesImpact"
                            name="impact"
                            checked={alreadyInvest}
                            onChange={() => setAlreadyInvest(true)}
                          />
                          <label htmlFor="yesImpact">Sim</label>
                        </div>
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="notImpact"
                            name="impact"
                            checked={!alreadyInvest ? true : false}
                            onChange={() => setAlreadyInvest(false)}
                          />
                          <label htmlFor="notImpact">Não</label>
                        </div>
                      </div>
                    </div>
                    <div className="radioButton">
                      <p className="questionTitle">
                        Deseja que a Firgun reinvista o seu saldo?:
                      </p>
                      <div className="radioGroup">
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="yesReinvest"
                            name="reinvest"
                            checked={wantToReinvest}
                            onChange={() => setWantToReinvest(true)}
                          />
                          <label htmlFor="yesReinvest">Sim</label>
                        </div>
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="notReinvest"
                            name="reinvest"
                            checked={!wantToReinvest ? true : false}
                            onChange={() => setWantToReinvest(false)}
                          />
                          <label htmlFor="notReinvest">Não</label>
                        </div>
                      </div>
                    </div>
                    <div className="radioButton">
                      <p className="questionTitle">
                        Quer receber informações da Firgun no celular?:
                      </p>
                      <div className="radioGroup">
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="yesInfo"
                            name="info"
                            checked={wantToReceiveInfo}
                            onChange={() => setWantToReceiveInfo(true)}
                          />
                          <label htmlFor="yesInfo">Sim</label>
                        </div>
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="notInfo"
                            name="info"
                            checked={!wantToReceiveInfo ? true : false}
                            onChange={() => setWantToReceiveInfo(false)}
                          />
                          <label htmlFor="notInfo">Não</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="quest">
                    <div className="radioButton">
                      <p className="questionTitle">
                        Quer receber informações de novos projetos da Firgun no
                        e-mail?:
                      </p>
                      <div className="radioGroup">
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="yesEmail"
                            name="email"
                            checked={wantToReceiveEmail}
                            onChange={() => setWantToReceiveEmail(true)}
                          />
                          <label htmlFor="yesEmail">Sim</label>
                        </div>
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="notEmail"
                            name="email"
                            checked={!wantToReceiveEmail ? true : false}
                            onChange={() => setWantToReceiveEmail(false)}
                          />
                          <label htmlFor="notEmail">Não</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rightSide">
                  <div className="quest">
                    <label className="questionTitle">
                      Como se considera como investidor?:
                      <span>{howConsidere}%</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={howConsidere}
                        onChange={(e) => setHowConsidere(e.target.value)}
                      />
                    </label>
                    <label className="questionTitle">
                      Tipos de causas de interesses:
                      <select
                        value={typesOfCauses}
                        onChange={(e) => setTypesOfCauses(e.target.value)}
                      >
                        <option defaultValue hidden>
                          Selecione uma opção
                        </option>
                        <option value="Corona vírus">Corona vírus</option>
                        <option value="Padaria">Padaria</option>
                        <option value="Crianças">Crianças</option>
                        <option value="Confeitaria">Confeitaria</option>
                      </select>
                    </label>
                  </div>
                  <div className="quest">
                    <label className="questionTitle">
                      Quanto pretende investir mensalmente?:
                      <input
                        type="number"
                        value={howMuchInvest}
                        placeholder="Digite um valor"
                        onChange={(e) => setHowMuchInvest(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <button onClick={handleCreateProfile}>Criar perfil</button>
            </div>
          ) : (
            <div className="profileContainer">
              <h3>Perifl de investidor</h3>
              <div className="profile">
                <div className="leftSide">
                  <div className="quest">
                    <div className="radioButton">
                      <p className="questionTitle">Ja investe em impacto?:</p>
                      <div className="radioGroup">
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="yesImpact"
                            name="impact"
                            checked={alreadyInvest}
                            onChange={() => setAlreadyInvest(true)}
                          />
                          <label htmlFor="yesImpact">Sim</label>
                        </div>
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="notImpact"
                            name="impact"
                            checked={!alreadyInvest ? true : false}
                            onChange={() => setAlreadyInvest(false)}
                          />
                          <label htmlFor="notImpact">Não</label>
                        </div>
                      </div>
                    </div>
                    <div className="radioButton">
                      <p className="questionTitle">
                        Deseja que a Firgun reinvista o seu saldo?:
                      </p>
                      <div className="radioGroup">
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="yesReinvest"
                            name="reinvest"
                            checked={wantToReinvest}
                            onChange={() => setWantToReinvest(true)}
                          />
                          <label htmlFor="yesReinvest">Sim</label>
                        </div>
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="notReinvest"
                            name="reinvest"
                            checked={!wantToReinvest ? true : false}
                            onChange={() => setWantToReinvest(false)}
                          />
                          <label htmlFor="notReinvest">Não</label>
                        </div>
                      </div>
                    </div>
                    <div className="radioButton">
                      <p className="questionTitle">
                        Quer receber informações da Firgun no celular?:
                      </p>
                      <div className="radioGroup">
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="yesInfo"
                            name="info"
                            checked={wantToReceiveInfo}
                            onChange={() => setWantToReceiveInfo(true)}
                          />
                          <label htmlFor="yesInfo">Sim</label>
                        </div>
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="notInfo"
                            name="info"
                            checked={!wantToReceiveInfo ? true : false}
                            onChange={() => setWantToReceiveInfo(false)}
                          />
                          <label htmlFor="notInfo">Não</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="quest">
                    <div className="radioButton">
                      <p className="questionTitle">
                        Quer receber informações de novos projetos da Firgun no
                        e-mail?:
                      </p>
                      <div className="radioGroup">
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="yesEmail"
                            name="email"
                            checked={wantToReceiveEmail}
                            onChange={() => setWantToReceiveEmail(true)}
                          />
                          <label htmlFor="yesEmail">Sim</label>
                        </div>
                        <div className="inputRadioGroup">
                          <input
                            type="radio"
                            id="notEmail"
                            name="email"
                            checked={!wantToReceiveEmail ? true : false}
                            onChange={() => setWantToReceiveEmail(false)}
                          />
                          <label htmlFor="notEmail">Não</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rightSide">
                  <div className="quest">
                    <label className="questionTitle">
                      Como se considera como investidor?:
                      <span>{howConsidere}%</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={howConsidere}
                        onChange={(e) => setHowConsidere(e.target.value)}
                      />
                    </label>
                    <label className="questionTitle">
                      Tipos de causas de interesses:
                      <select
                        value={typesOfCauses}
                        onChange={(e) => setTypesOfCauses(e.target.value)}
                      >
                        <option defaultValue disabled hidden>
                          {typesOfCauses}
                        </option>
                        <option value="Corona vírus">Corona vírus</option>
                        <option value="Padaria">Padaria</option>
                        <option value="Crianças">Crianças</option>
                        <option value="Confeitaria">Confeitaria</option>
                      </select>
                    </label>
                  </div>
                  <div className="quest">
                    <label className="questionTitle">
                      Quanto pretende investir mensalmente?:
                      <input
                        type="number"
                        value={howMuchInvest}
                        onChange={(e) => setHowMuchInvest(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <button onClick={handleUpdateProfile}>Editar perfil</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
