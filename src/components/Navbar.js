import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';
import { useStateValue } from '../state';
import GetLocation from './GetLocation';

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  background-color: white;
  color: black;
  max-width: 100%;
  z-index: 1;
  margin: 0;
  /* margin: auto; */
  box-shadow: 0px 2px 10px #273136;
  height: 30px;
  border-radius: 0 0 10px 10px;
  ${props => props.sticky && css`
    position: fixed;
    top: 0;
    width: calc(100% - 32px);
  `}
  .links {
    margin-left: auto;
    a {
      display: flex;
      align-items: center;
      position: relative;
      text-transform: uppercase;
      color: black;
      text-decoration: none;
      cursor: pointer;
      &:after {
        content: '';
        width: 0;
        height: 2px;
        background: black;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 1rem;
      }
      &:hover {
        outline: none;
        &:after {
          width: 80%
        }
      }
    }
  }
`;

function Navbar({ currentPath, ...rest }) {
  const wrapperRef = useRef()
  const [{ user }, dispatch] = useStateValue();
  const [fastSticky, setFastSticky] = useState(false);
  const [offset, setOffset] = useState(0);
  const [resized, setResized] = useState(false);
  const [filter, setFilter] = useState('');
  const [viewFilter, setViewFilter] = useState('mine')
  const loggedIn = !!user.id;
  // const currentPath = props.location.pathname.split('/')[1]
  useEffect(() => {
    setOffset(wrapperRef.current.offsetTop)
    setResized(true)
  }, [offset, setResized])
  
  function dispatchStickyNavbar(bool) {
    dispatch({
      type: 'setStickyNavbar',
      stickyNavbar: bool,
    })
  }
  
  /**
   * if window resized, logo could have changed size, reset offset to maintain
   * stiky navbar in correct position
   */
  window.onresize = () => {
    setOffset(wrapperRef.current.offsetTop)
    setResized(true)
    makeSticky()
  }
  window.onscroll = () => {
    if (resized) {
      setOffset(wrapperRef.current.offsetTop);
      setResized(false);
    }
    makeSticky()
  }
  function makeSticky() {
    if (offset && window.pageYOffset >= offset) {
      setFastSticky(true)
      dispatchStickyNavbar(true)
    } else {
      setFastSticky(false)
      dispatchStickyNavbar(false)
    }
  }
  function handleRadioChange(e) {
    setViewFilter(e.target.value);
  }
  return (
    <Wrapper ref={wrapperRef} sticky={fastSticky} >
      {currentPath === 'profile' && (
        <>
          <input
            type="text"
            placeholder="search"
          ></input>
          <form>
            <input 
              type="radio"
              id="mine"
              name="viewFilter"
              value="mine"
              checked={viewFilter === 'mine'}
              onChange={handleRadioChange}
            />
            <label htmlFor="mine">my links</label>
            <input
              type="radio"
              id="all"
              name="viewFilter"
              value="all"
              checked={viewFilter === 'all'}
              onChange={handleRadioChange}
            />
            <label htmlFor="all">all links</label>
          </form>
        </>
      )}
      <div className="links">
        {currentPath === 'profile' ? (
          <div>
            
            <Link to="/" onClick={() => dispatch({type: 'setNewUrl', newUrl: ''})}>
              home
            </Link>
          </div>
        ) : (
          // {loggedIn && (
          <Link to="/profile">
            my links
          </Link>
          // )}
        )}
      </div>
    </Wrapper>
  );
};

export default GetLocation(Navbar);
// export default Navbar;

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
    text-shadow: -1px 2px 0px whitesmoke;
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
      text-shadow: -1px 2px 0px black;
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
  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
`;

// a {
//   text-decoration: none;
//   color: white;
// }
// .bar {
//   display: grid;
//   grid-template-columns: auto 1fr;
//   justify-content: space-between;
//   align-items: stretch;
//   @media (max-width: 1300px) {
//     grid-template-columns: 1fr;
//     justify-content: center;
//   }
// }
// .sub-bar {
//   display: grid;
//   grid-template-columns: 1fr auto;
//   border-bottom: 1px solid lightgray;
// }


