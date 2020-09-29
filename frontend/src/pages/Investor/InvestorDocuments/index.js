import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import { uniqueId } from "lodash";
import { toast } from "react-toastify";
import filesize from "filesize";
import { MdCheckCircle } from "react-icons/md";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuInvestor/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";
import Modal from "../../../components/UI/Modal/Modal";
import UploadContainer from "../../../components/UploadContainer/Upload";
import TableLine from "../../../components/table/tableLine/TableLine";
import Spinner from "../../../components/UI/Spinner/Spinner";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/investorDoc.css";
import "./styles/investorDocResponsive.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default function SendDocuments() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [documents, setDocuments] = useState({});
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseDelete, setPurchaseDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [loadData, setLoadData] = useState({});

  useEffect(() => {
    async function fetchDocuments() {
      const response = await api.get("/supporters/documents");
      setDocuments(response.data);
    }

    fetchDocuments();
  }, [loaded]);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
    setPurchaseDelete(false);
  };

  const handlePurchaseTrue = (fieldName, empty, resend = false) => {
    const data = {
      field: fieldName,
      resend,
    };

    setLoadData(data);
    setPurchasing(!purchasing);
  };

  const handlePurchaseDelete = () => {
    setPurchaseDelete(!purchaseDelete);
  };

  const handleUpload = (files) => {
    const uploadedFile = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
    }));

    setUploadedFiles(uploadedFile);
  };

  const updateFile = (id, data) => {
    setUploadedFiles(
      uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    );
  };

  const processUpload = async (uploadedFile) => {
    const data = new FormData();

    data.append("document", uploadedFile.file, uploadedFile.name);

    try {
      // Reenvio de documentos
      if (loadData.resend) {
        await api.patch(
          `supporters/resend-document?field=${loadData.field}`,
          data,
          {
            onUploadProgress: (e) => {
              const progress = parseInt(Math.round((e.loaded * 100) / e.total));

              updateFile(uploadedFile.id, { progress });
            },
          }
        );

        updateFile(uploadedFile.id, {
          uploaded: true,
        });

        setLoaded(!loaded);
      }
      // Envio de documentos
      const response = await api.post(
        `supporters/documents?field=${loadData.field}`,
        data,
        {
          onUploadProgress: (e) => {
            const progress = parseInt(Math.round((e.loaded * 100) / e.total));

            updateFile(uploadedFile.id, { progress });
          },
        }
      );

      updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data.id,
      });

      setLoaded(!loaded);
    } catch (error) {
      toast.error("Não foi possível enviar o documento");
      updateFile(uploadedFile.id, {
        error: true,
      });
    }
  };

  let modalDataDeleted = (
    <div className="modalDelete">
      <MdCheckCircle size={100} color="#34cc20" />
      <p>Documento removido</p>
    </div>
  );

  const handleDelete = async (fieldName) => {
    handlePurchaseDelete();

    try {
      await api.delete(`/supporters/delete-document?field=${fieldName}`);

      setDeleted(true);
      setLoaded(!loaded);
    } catch (error) {
      toast.error("Não foi possível eliminar o documento");
      console.log(error);
    }
  };

  const handleCleanState = (id) => {
    setUploadedFiles(
      uploadedFiles.filter((uploadedFile) => uploadedFile.id !== id)
    );
  };

  return (
    <>
      <MenuMobile />
      <div id="sendDoc">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/personalData" />

          <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            <UploadContainer
              onUpload={handleUpload}
              uploadedFiles={uploadedFiles}
              processUpload={processUpload}
              onDelete={handleCleanState}
            />
          </Modal>

          <Modal show={purchaseDelete} modalClosed={purchaseCancelHandler}>
            {deleted ? modalDataDeleted : <Spinner />}
          </Modal>

          <h3>Documentos do investidor</h3>

          <div className="tableDoc">
            <Table responsive>
              <thead>
                <tr>
                  <th>Data de envio</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <TableLine
                  handlePurchaseTrue={handlePurchaseTrue}
                  date={documents.createdAt}
                  name="Identidade ou CNH - Frente"
                  id="IDENTITY_FRONT"
                  status={documents.status}
                  projectId={documents.projectId}
                  field={documents.identityFront}
                  urlLink={documents.identityFrontUrl}
                  handleDelete={handleDelete}
                />
                <TableLine
                  handlePurchaseTrue={handlePurchaseTrue}
                  date={documents.createdAt}
                  name="Identidade ou CNH - Trás"
                  id="IDENTITY_BACK"
                  status={documents.status}
                  projectId={documents.projectId}
                  field={documents.identityBack}
                  urlLink={documents.identityBackUrl}
                  handleDelete={handleDelete}
                />
                <TableLine
                  handlePurchaseTrue={handlePurchaseTrue}
                  date={documents.createdAt}
                  name="Comprovante residencial"
                  id="RESIDENTIAL_COMPROVANT"
                  status={documents.status}
                  projectId={documents.projectId}
                  field={documents.residentialComprovant}
                  urlLink={documents.residentialComprovantUrl}
                  handleDelete={handleDelete}
                />
                <TableLine
                  handlePurchaseTrue={handlePurchaseTrue}
                  date={documents.createdAt}
                  name="Comprovante de pagamento"
                  id="PAYMENT_COMPROVANT"
                  status={documents.status}
                  projectId={documents.projectId}
                  field={documents.paymentComprovant1}
                  urlLink={documents.paymentComprovant1Url}
                  handleDelete={handleDelete}
                />
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
