import styled, { css } from 'styled-components';

const NiceInput = styled.input`
  font-family: 'Ubuntu', sans-serif;
  font-size: 2rem;
  width: 95%;
  padding: .5rem;
  margin: 1rem .5rem 1.5rem .5rem;
  /* margin-top: 2rem;
  margin-bottom: 2rem; */
  box-sizing: border-box;
  border-radius: 5px;
  white-space: nowrap;
  
  ${props => props.error && css`
    border: 3px solid red;
  `}
`;

export default NiceInput;
