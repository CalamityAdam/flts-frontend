import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  0%, 100% {
    opacity: 0;
  }
  25%, 75% {
    opacity: 1;
  }
`;

const Error = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
  padding: 1rem;
  font-size: 3rem;
  font-weight: bold;
  color: red;
  z-index: 2;
  position: fixed;
  text-align: center;
  /* top: 0; */
  /* justify-self: center; */
  /* right: 0; */
  /* bottom: 0; */
  margin: auto;
  float: right;
  top: 165px;
  left: 50%;
  transform: translate(-50%, 0);
  /* text-shadow: 0px 0px 4px black; */
  /* text-shadow: red 2px 2px, red -2px -2px, red 2px -2px, red -2px 2px; */
  /* position: relative; */
  text-align: center;
  animation: 4s ${fade};
  animation-fill-mode: forwards;
`;

export default Error;
