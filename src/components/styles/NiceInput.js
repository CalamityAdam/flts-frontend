import styled, { css } from 'styled-components';

const NiceInput = styled.input`
  /* font-family: 'Major Mono Display', monospace; */
  font-size: 2rem;
  width: 95%;
  padding: .5rem;
  margin: 0 .5rem .5rem .5rem;
  box-sizing: border-box;
  border-radius: 5px;
  white-space: nowrap;
  
  ${props => props.error && css`
    border: 3px solid red;
  `}
`;

export default NiceInput;
