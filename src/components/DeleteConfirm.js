import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: auto;
  width: 650px;
`;
const ConfirmButton = styled.button`
  text-transform: uppercase;
  font-size: 1.75rem;
  font-weight: 500;
  color: black;
  background: white;
  border: 2px solid black;
  border-radius: 10px;
  margin-right: 1rem;
  margin-left: 1rem;
  margin-top: 1rem;
  box-shadow: 2px 2px 5px #273136;
  &:active {
    box-shadow: 0px 0px 1px #273136;
    transform: translateY(2px) translateX(1px);
  }
  &:focus {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

function DeleteConfirm({ confirm, cancel }) {
  return (
    <Wrapper>
      
    <div>
      r u sure?
    </div>
    <div>
      <ConfirmButton onClick={confirm}>yes</ConfirmButton>
      <ConfirmButton onClick={cancel}>no</ConfirmButton>
    </div>
    </Wrapper>
  )
}

export default DeleteConfirm;
