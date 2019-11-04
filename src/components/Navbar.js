import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';
import { useStateValue } from '../state';
import debounce from '../lib/debounce';
import GetLocation from './GetLocation';

function Navbar({ currentPath, ...rest }) {
  const wrapperRef = useRef()
  const [{ viewFilter }, dispatch] = useStateValue();
  const [fastSticky, setFastSticky] = useState(false);
  const [offset, setOffset] = useState(0);
  const [resized, setResized] = useState(false);
  /**
   * dispatcfh setViewFilter
   */
  function setViewFilter(newFilter) {
    dispatch({
      type: 'setViewFilter',
      viewFilter: newFilter,
    })
  }
  /**
   * dispatch setSearchQUery
   */
  function setSearchQuery(newQuery) {
    dispatch({
      type: 'setSearchQuery',
      searchQuery: newQuery,
    })
  }
  /**
   * use a debounced function to prefent filter from happening to quickly
   * and frequently
   */
  const debouncedSearchQuery = debounce(setSearchQuery, 500);
  useEffect(() => {
    setOffset(wrapperRef.current.offsetTop)
    setResized(true)
  }, [offset, setResized])
  
  /**
   * dispatch stickyNavbar
   */
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
  /**
   * on window scroll check offset vs navbar location to determine if
   * nav needs to be sticky
   */
  window.onscroll = () => {
    if (resized) {
      setOffset(wrapperRef.current.offsetTop);
      setResized(false);
    }
    makeSticky()
  }
  function makeSticky() {
    if (offset && window.pageYOffset >= offset ) {
      if (!fastSticky) {
        // this double if is to prevent this call from happening repeatedly
        setFastSticky(true)
        dispatchStickyNavbar(true)
      }
    } else if (fastSticky) {
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
            onChange={(e) => debouncedSearchQuery(e.target.value)}
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

const Wrapper = styled.nav`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  background-color: white;
  color: black;
  max-width: 100%;
  z-index: 1;
  margin: 0;
  box-shadow: 0px 2px 10px #273136;
  height: 30px;
  border-radius: 0 0 10px 10px;
  ${props => props.sticky && css`
    position: fixed;
    top: 0;
    width: calc(100% - 32px);
  `}
  @media (max-width: 700px) {
    display: none;
  }
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
