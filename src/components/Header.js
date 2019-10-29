import React from 'react'
import styled from 'styled-components';
import { Link } from '@reach/router';
import { useStateValue } from '../state';

const StyledHeader = styled.header`
  flex: 1;
  background-color: #5796b5;
  padding-bottom: 5px;
  height: 120px;
  min-height: 120px;
  /* width: 100vw; */
  a {
    text-decoration: none;
    color: white;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const Logo = styled.h1`
  color: whitesmoke;
  text-transform: uppercase;
  font-family: 'Oswald', sans-serif;
  font-weight: 200;
  font-size: 6rem;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  letter-spacing: 2px
  text-shadow: -2px 1px 5px black;
  text-align: center;
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
    font-size: 6rem;
    letter-spacing: 2px
  }
  @media (max-width: 700px) {
    font-size: 2rem;
    letter-spacing: 2px
  }
`;



function Navbar(props) {
  const [{ user }, dispatch] = useStateValue();
  return (
    <StyledHeader>
      <div className="bar">
        <Link to="/" onClick={() => dispatch({type: 'setNewUrl', newUrl: ''})}>
          <Logo>Sisk Short Links</Logo>
        </Link>
      </div>
    </StyledHeader>
  )
}

export default Navbar;
