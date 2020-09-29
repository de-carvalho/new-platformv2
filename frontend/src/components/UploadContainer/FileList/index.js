import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError } from "react-icons/md";

import { Container, FileInfo, Preview } from "./styles";

const FileList = ({ files, processUpload, onDelete }) => (
  <Container>
    {files.map((uploadedFile) => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={uploadedFile.preview} />
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>
              {uploadedFile.readableSize}
              {!uploadedFile.uploaded && (
                <button
                  className="btn-confirm"
                  onClick={() => processUpload(uploadedFile)}
                >
                  Confirmar
                </button>
              )}
              <button
                className="btn-delete"
                onClick={() => onDelete(uploadedFile.id)}
              >
                Excluir
              </button>
            </span>
          </div>
        </FileInfo>

        <div>
          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressbar
              styles={{
                root: { width: 24 },
                path: { stroke: "#7159c1" },
              }}
              strokeWidth={10}
              percentage={uploadedFile.progress}
            />
          )}

          {uploadedFile.uploaded && <MdCheckCircle size={24} color="#34cc20" />}

          {uploadedFile.error && <MdError size={24} color="#e02041" />}
        </div>
      </li>
    ))}
  </Container>
);

export default FileList;
