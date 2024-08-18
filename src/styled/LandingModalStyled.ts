import styled from "styled-components";

export const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000066;
  width: 100vw;
  height: 100vh;
  z-index: 5;
`;

export const LandingModal = styled.div`
  width: 600px;
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

export const OffButton = styled.button`
  border: none;
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
`;
