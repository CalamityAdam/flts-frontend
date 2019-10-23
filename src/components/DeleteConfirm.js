import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: auto;
  width: 650px;
`;

function DeleteConfirm({ confirm, cancel }) {
  return (
    <Wrapper>
      
    <div>
      r u sure?
    </div>
    <div>
      <button onClick={confirm}>yes</button>
      <button onClick={cancel}>no</button>
    </div>
    </Wrapper>
  )
}

export default DeleteConfirm;
