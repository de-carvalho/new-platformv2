import React, { Component } from "react";

import { Container, Content } from "./styles";

import Upload from "./Upload/UploadFile";
import FileList from "./FileList";

export default class UploadContainer extends Component {
  render() {
    const { onUpload } = this.props;
    const { uploadedFiles } = this.props;
    const { processUpload } = this.props;
    const { onDelete } = this.props;

    return (
      <Container>
        <Content>
          <Upload onUpload={onUpload} />
          {!!uploadedFiles.length && (
            <FileList
              files={uploadedFiles}
              processUpload={processUpload}
              onDelete={onDelete}
            />
          )}
        </Content>
      </Container>
    );
  }
}
