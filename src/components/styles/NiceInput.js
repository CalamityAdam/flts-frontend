import styled, { css } from 'styled-components';

const NiceInput = styled.input`
  font-family: 'Ubuntu', sans-serif;
  font-size: 2rem;
  width: 95%;
  padding: .5rem;
  margin: 1rem .5rem 1.5rem .5rem;
  box-shadow: 2px 2px 5px #273136;
  /* margin-top: 2rem;
  margin-bottom: 2rem; */
  box-sizing: border-box;
  border: 1px solid #273136;
  border-radius: 5px;
  white-space: nowrap;
  
  ${props => props.error && css`
    border: 3px solid red;
  `}
`;

export default NiceInput;
