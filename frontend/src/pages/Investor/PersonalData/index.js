import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { MdCheckCircle, MdError, MdCamera } from "react-icons/md";
import { toast } from "react-toastify";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import avatarImg from "../../../assets/images/user.png";

import "./styles/personal.css";
import "./styles/personalResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default function PersonalData() {
  const { user, updateUser } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [showData, setShowData] = useState(1);
  const [purchasing, setPurchasing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [race, setRace] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [cellphoneArea, setCellphoneArea] = useState("");
  const [cellphoneNumber, setCellphoneNumber] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressDistrict, setAddressDistrict] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountType, setBankAccountType] = useState("");
  const [bankAgencyNumber, setBankAgencyNumber] = useState("");
  const [bankAccountCheckNumber, setBankAccountCheckNumber] = useState("");
  const [bankAgencyCheckNumber, setBankAgencyCheckNumber] = useState("");
  const [phoneArea, setPhoneArea] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [identityIssuer, setIdentityIssuer] = useState("");
  const [identityIssueDate, setIdentityIssueDate] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    api.get("users/profile").then((user) => {
      setFirstName(user.data.firstName);
      setLastName(user.data.lastName);
      setGender(user.data.gender);
      setProfession(user.data.profession);
      setRace(user.data.race);
      setDob(user.data.dob);
      setEmail(user.data.email);
      setCellphoneArea(user.data.cellphoneArea);
      setIdentityIssuer(user.data.identityIssuer);
      setIdentityIssueDate(user.data.identityIssueDate);
      setCellphoneNumber(user.data.cellphoneNumber);
      setAddressCity(user.data.addressCity);
      setAddressStreet(user.data.addressStreet);
      setAddressNumber(user.data.addressNumber);
      setAddressComplement(user.data.addressComplement);
      setAddressState(user.data.addressState);
      setAddressDistrict(user.data.addressDistrict);
      setAddressZipcode(user.data.addressZipcode);
      setBankNumber(user.data.bankNumber);
      setPhoneArea(user.data.phoneArea);
      setPhoneNumber(user.data.phoneNumber);
      setBankAccountNumber(user.data.bankAccountNumber);
      setBankAccountType(user.data.bankAccountType);
      setBankAgencyNumber(user.data.bankAgencyNumber);
      setBankAccountCheckNumber(user.data.bankAccountCheckNumber);
      setBankAgencyCheckNumber(user.data.bankAgencyCheckNumber);
      setAvatar(user.data.avatarUrl);
    });
  }, [edited]);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };
  const handleIncrement = () => {
    if (showData <= 4) {
      let increment = showData + 1;
      setShowData(increment);
    }
  };

  const handleDecrement = () => {
    if (showData > 1) {
      let decrement = showData - 1;
      setShowData(decrement);
    }
  };

  const handleEditData = async () => {
    setPurchasing(!purchasing);
    const password = {
      passwordHash,
      oldPassword,
      passwordConfirmation,
    };
    const data = {
      firstName,
      lastName,
      gender,
      profession,
      race,
      dob,
      email,
      cellphoneArea,
      cellphoneNumber,
      addressCity,
      addressStreet,
      addressNumber,
      addressComplement,
      addressState,
      addressDistrict,
      addressZipcode,
      bankNumber,
      bankAccountNumber,
      bankAccountType,
      bankAgencyNumber,
      bankAccountCheckNumber,
      bankAgencyCheckNumber,
      phoneArea,
      phoneNumber,
      identityIssuer,
      identityIssueDate,
    };

    if (passwordHash && oldPassword && passwordConfirmation) {
      Object.assign(data, password);
    }

    try {
      const response = await api.put(
        `users/${user.accountType.toLowerCase()}`,
        data
      );
      const userData = {
        id: response.data.id,
        accountType: response.data.accountType,
        role: response.data.role,
        name: `${response.data.firstName} ${response.data.lastName}`,
        avatarUrl: response.data.avatarUrl,
      };
      setEdited(true);
      updateUser(userData);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleAvatarChange = useCallback(
    async (file) => {
      if (file) {
        const data = new FormData();

        data.append("avatar", file);

        const response = await api.patch("users/avatar", data);

        const userData = {
          id: response.data.id,
          accountType: response.data.accountType,
          role: response.data.role,
          name: `${response.data.firstName} ${response.data.lastName}`,
          avatarUrl: response.data.avatarUrl,
        };

        updateUser(userData);
        toast.success("Foto de perfil atualizada");
      }
    },
    [updateUser]
  );

  let modalDataEdited = (
    <div className="modalEdit">
      <MdCheckCircle size={100} color="#34cc20" />
      <p>Dados atualizados com sucesso</p>
    </div>
  );
  let modalError = (
    <div className="modalEdit">
      <MdError size={100} color="#e02041" />
      <p>Erro ao atualizar os dados</p>
    </div>
  );

  return (
    <>
      <MenuMobile />
      <div id="personal">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/personalData" />

          <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {!edited ? (
              <Spinner />
            ) : edited ? (
              modalDataEdited
            ) : error ? (
              modalError
            ) : (
              ""
            )}
          </Modal>
          {showData === 1 ? (
            <div className="perData">
              <h3>Editar informações - Dados pessoais</h3>
              <div className="edit">
                <label>
                  Nome:
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label>
                  Sobrenome:
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>

              <div className="edit">
                <label>
                  Data de nascimento:
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </label>

                <label>
                  Email:
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div className="edit">
                <label>
                  Código DDD:
                  <input
                    type="number"
                    value={cellphoneArea}
                    onChange={(e) => setCellphoneArea(e.target.value)}
                  />
                </label>

                <label>
                  Número de celular:
                  <input
                    type="text"
                    value={cellphoneNumber}
                    onChange={(e) => setCellphoneNumber(e.target.value)}
                  />
                </label>
              </div>

              <div className="edit">
                <label>
                  CEP:
                  <input
                    type="text"
                    value={addressZipcode}
                    onChange={(e) => setAddressZipcode(e.target.value)}
                  />
                </label>

                <label>
                  Número:
                  <input
                    type="text"
                    value={addressNumber}
                    onChange={(e) => setAddressNumber(e.target.value)}
                  />
                </label>
              </div>

              <div className="edit">
                <label>
                  Rua:
                  <input
                    type="text"
                    value={addressStreet}
                    onChange={(e) => setAddressStreet(e.target.value)}
                  />
                </label>

                <label>
                  Complemento:
                  <input
                    type="text"
                    value={addressComplement}
                    onChange={(e) => setAddressComplement(e.target.value)}
                  />
                </label>
              </div>

              <div className="edit">
                <label>
                  Bairro:
                  <input
                    type="text"
                    value={addressDistrict}
                    onChange={(e) => setAddressDistrict(e.target.value)}
                  />
                </label>
                <label>
                  Cidade:
                  <input
                    type="text"
                    value={addressCity}
                    onChange={(e) => setAddressCity(e.target.value)}
                  />
                </label>
              </div>
              <div className="edit">
                <label>
                  Estado:
                  <input
                    type="text"
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                  />
                </label>
              </div>

              <button onClick={handleIncrement}>Próximo</button>
            </div>
          ) : showData === 2 ? (
            <div className="perData">
              <h3>Editar informações - Dados pessoais</h3>
              <div className="edit">
                <label>
                  DDD:
                  <input
                    type="text"
                    value={!phoneArea ? "" : phoneArea}
                    onChange={(e) => setPhoneArea(e.target.value)}
                  />
                </label>
                <label>
                  Número de telefone:
                  <input
                    type="text"
                    value={!phoneNumber ? "" : phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </label>
              </div>
              <div className="edit">
                <label>
                  RG:
                  <input
                    type="text"
                    value={!identityIssuer ? "" : identityIssuer}
                    onChange={(e) => setIdentityIssuer(e.target.value)}
                  />
                </label>
                <label>
                  Data de vencimento do RG:
                  <input
                    type="text"
                    value={!identityIssueDate ? "" : identityIssueDate}
                    onChange={(e) => setIdentityIssueDate(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <button onClick={handleDecrement}>Voltar</button>
                <button onClick={handleIncrement}>Próximo</button>
              </div>
            </div>
          ) : showData === 3 ? (
            <div className="perData">
              <h3>Editar informações - Dados Firgun</h3>

              <div className="edit">
                <label>
                  Sexo:
                  <select
                    value={!gender ? "" : gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option defaultValue disabled hidden>
                      {gender}
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </label>

                <label>
                  Estado Civil:
                  <select>
                    <option>Solteiro(a)</option>
                    <option>Casado(a)</option>
                    <option>Divorciado(a)</option>
                    <option>Viúvo(a)</option>
                  </select>
                </label>
              </div>

              <div className="edit">
                <label>
                  Grau de instrução:
                  <select>
                    <option>Ensino fundamental incompleto</option>
                    <option>Ensino fundamental completo</option>
                    <option>Ensino médio incompleto</option>
                    <option>Ensino médio completo</option>
                    <option>Ensino superior incompleto</option>
                    <option>Ensino superior completo</option>
                  </select>
                </label>

                <label>
                  Ocupação:
                  <input
                    type="text"
                    value={!profession ? "" : profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </label>
              </div>

              <div className="edit">
                <label>
                  Cor/Raça:
                  <select
                    value={!race ? "" : race}
                    onChange={(e) => setRace(e.target.value)}
                  >
                    <option defaultValue disabled hidden>
                      {race}
                    </option>
                    <option value="Branco(a)">Branco(a)</option>
                    <option value="Negro(a)">Negro(a)</option>
                    <option value="Pardo(a)">Pardo(a)</option>
                    <option value="Amarelo(a)">Amarelo(a)</option>
                    <option value="Indígena">Indígena</option>
                  </select>
                </label>
              </div>

              <h3>Editar informações - Dados bancários</h3>

              <div className="edit">
                <label>
                  Banco:
                  <input
                    type="text"
                    value={!bankNumber ? "" : bankNumber}
                    onChange={(e) => setBankNumber(e.target.value)}
                  />
                </label>

                <label>
                  Tipo de conta:
                  <select
                    value={!bankAccountType ? "" : bankAccountType}
                    onChange={(e) => setBankAccountType(e.target.value)}
                  >
                    <option defaultValue disabled hidden>
                      {bankAccountType === "CHECKING" ? "Corrente" : "Poupança"}
                    </option>
                    <option value="CHECKING">Corrente</option>
                    <option value="SAVING">Poupança</option>
                  </select>
                </label>
              </div>

              <div className="edit">
                <label>
                  Número da conta:
                  <input
                    type="text"
                    value={!bankAccountNumber ? "" : bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                  />
                </label>

                <label>
                  Digito da conta:
                  <input
                    type="text"
                    value={
                      !bankAccountCheckNumber ? "" : bankAccountCheckNumber
                    }
                    onChange={(e) => setBankAccountCheckNumber(e.target.value)}
                  />
                </label>
              </div>
              <div className="edit">
                <label>
                  Número da agência:
                  <input
                    type="text"
                    value={!bankAgencyNumber ? "" : bankAgencyNumber}
                    onChange={(e) => setBankAgencyNumber(e.target.value)}
                  />
                </label>

                <label>
                  Digito da agência:
                  <input
                    type="text"
                    value={!bankAgencyCheckNumber ? "" : bankAgencyCheckNumber}
                    onChange={(e) => setBankAgencyCheckNumber(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <button onClick={handleDecrement}>Voltar</button>
                <button onClick={handleIncrement}>Próximo</button>
              </div>
            </div>
          ) : showData === 4 ? (
            <div className="perData">
              <h3>Foto de perfil - Alteração</h3>
              <div className="perfilPhoto">
                <img
                  src={!avatar ? avatarImg : user.avatarUrl}
                  alt={firstName}
                />
                <label htmlFor="avatar">
                  <MdCamera size={30} color="#ffde00" />
                  <input
                    type="file"
                    id="avatar"
                    onChange={(e) => handleAvatarChange(e.target.files[0])}
                  />
                </label>
              </div>

              <h3>Editar informações - Alteração de senha</h3>

              <div className="edit">
                <label>
                  Nova senha:
                  <input
                    type="password"
                    value={passwordHash}
                    onChange={(e) => setPasswordHash(e.target.value)}
                  />
                </label>
                <label>
                  Senha antiga:
                  <input
                    className={passwordHash && !oldPassword ? "inputError" : ""}
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="edit">
                <label>
                  Confirmar senha:
                  <input
                    className={
                      passwordHash && !passwordConfirmation
                        ? "inputError"
                        : passwordHash !== passwordConfirmation
                        ? "inputError"
                        : ""
                    }
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <button onClick={handleDecrement}>Voltar</button>
                <button onClick={handleEditData}>Confirmar</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
