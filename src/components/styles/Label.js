import styled from 'styled-components';

const Label = styled.label`
  flex: 1;
  font-family: 'Ubuntu', sans-serif;
  font-size: 3rem;
  @media (max-width: 700px) {
    display: none;
  }
`;

export default Label;
