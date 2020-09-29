import styled from "styled-components";

const Button = styled.button`
  width: 90px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 15px;
  font-weight: 600;
  color: #fff;

  text-transform: uppercase;

  border: none;
  border-radius: 3px;

  background-color: #a7a9ac;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);

  cursor: pointer;

  transition: filter 400ms;

  &:hover {
    filter: brightness(90%);
  }
`;

export default Button;
