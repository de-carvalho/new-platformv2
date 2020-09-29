import { createGlobalStyle } from "styled-components";

import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

:root {
  --blue: #3ba6ff;
  --dark-white: #eff2fa;
  --light-white: #f9f9f9;
  --white: #fff;
  --input-color: #e7e7e8;
}

body {
  background-color: var(--dark-white);
  font-family: "Montserrat", sans-serif;
}

input + span, select + span, textarea + span{
  color: #e02041;
  font-size: 13px;
}
`;
