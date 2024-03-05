import styled from "styled-components";

export const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(18 18 18 / 40%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

export const ModalContainer = styled.div`
  width: 70%;
  height: 500px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
