import React from 'react'
import styled from 'styled-components';
import { Link } from '@reach/router';
import { useStateValue } from '../state';

const StyledHeader = styled.header`
  background-color: #59C8FF;
  margin-bottom: 10px;
  padding-bottom: 5px;
  a {
    text-decoration: none;
    color: white;
  }
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid lightgray;
  }
`;

const Logo = styled.h1`
  font-family: 'Poiret One';
  font-size: 6rem;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  /* text-shadow: 1px 5px 5px #252E33; */
  text-shadow: 0 0 10px black;
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
    font-size: 6rem;
  }
  /* &:after {
    content: '';
    width: 0;
    height: 2px;
    background: black;
    position: absolute;
    transform: translateX(-50%);
    transition: width .4s;
    left: 50%;
    margin-top: 4.5rem;
    @media (max-width: 1300px) {
    }
  }
  &:hover {
    &:after {
      width: calc(100% - 4rem);
      @media (max-width: 1300px) {
        display: none;
      }
    } */
  }
`;

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 3rem;
  a,
  button {
    text-decoration: none;
    background-size: 1rem 1rem;
    padding: 1rem 3rem;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 800;
    font-size: 1em;
    background: none;
    border: 0;
    margin: 0;
    cursor: pointer;
    color: black;
    @media (max-width: 700px) {
      font-size: 1.5rem;
      padding: 0 10px;
    }
    &:after {
      content: '';
      width: 0;
      height: 2px;
      background: black;
      position: absolute;
      transform: translateX(-50%);
      transition: width .4s;
      left: 50%;
      margin-top: 2rem;
      @media (max-width: 1300px){
        margin-top: 1rem;
      }
    }
    &:hover,
    &:focus {
      &:after {
        width: calc(100% - 8rem);
      }
      color: white;
      border-radius: 5px;
      @media (max-width: 1300px) {
        margin: 0;
      }
      /* background-color: #273136; */
      /* color: white; */
      transition: .25s ease-in-out;
    }
  }
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: center;
    font-size: 2rem;
  }
`;

function Navbar(props) {
  const [{ user }] = useStateValue();
  const loggedIn = !!user.id;
  return (
    <StyledHeader>
      <div className="bar">
        <Link to="/">
          <Logo>Make Short Links</Logo>
        </Link>
        <NavStyles>
          {loggedIn && (
            <>
            <Link to="/profile">
              my links
            </Link>
            {/* <Link to="/logout">
              logout
            </Link> */}
            </>
          )}
          {!loggedIn && (
              <Link to='auth'>sign in</Link>
          )}
        </NavStyles>
      </div>
    </StyledHeader>
  )
}

export default Navbar;
