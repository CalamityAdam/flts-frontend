import styled, { css } from 'styled-components';

const NiceInput = styled.input`
  font-family: 'Ubuntu', sans-serif;
  font-size: 2rem;
  flex: 1;
  padding: .5rem;
  margin-top: .5rem;
  box-shadow: 2px 2px 5px #273136;
  border: 1px solid #273136;
  border-radius: 5px;
  white-space: nowrap;
  
  ${props => props.error && css`
    border: 3px solid red;
  `}
  
  @media (max-width: 700px) {
    width: 100%
  }
`;

export default NiceInput;
