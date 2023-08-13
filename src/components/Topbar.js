import React from 'react';
import '../styles/Topbar.css';
import search from '../resources/search.png';
import icon from "../resources/icon.png"
import { Link } from "react-router-dom";

function Topbar(props) {
  function handleClearBox () {
    document.getElementById("searchBox").value = '';
    document.getElementById("clearBox").style.visibility = "hidden";
    
  }
  return (
    <>
    <div id="dialogBox">
        <span id="infoLogo" className="material-symbols-outlined">info</span>
        <span id="dialogText">This is a test message.</span>
    </div>
    <div style={{background: `${props.theme}`, color: `${props.textColor}`}} id="topBar">

    <div id="topbarTextContainer">
            <img id="barIcon" src={icon} alt="ApidMusic icon"/>
                <div id="topbarText">
                    Rhythmie
                </div>
                <div id="barAlpha">
                    In-Dev
                </div>
                <Link onClick={props.mountExplore} to="/explore">
                  <img src={search} id="searchIcon" alt="Search" />
                </Link>
            </div>


      <div id="theme">
        <img id="themeButton" onClick={props.themeButton} src={props.themeState} alt="Theme Button" />
      </div>
        <div id="searchBar">
        
            <input style={{background: `${props.searchBoxTheme}`, color: `${props.textColor}`}} onChange={props.searchHandler} placeholder="Search for a song, album or artist" id="searchBox" type="text"/>
            <span onClick={handleClearBox} id="clearBox" style={{background: `${props.searchBoxTheme}`}} className="material-symbols-outlined">close</span>
                    <button onClick={props.searchHandler} id="searchButton">
                        Search
                    </button>
        </div>
        <div id="userAccountPanel">
            <button style={{color: `${props.textColor}`}} onClick={props.accountButtonHandler} id="loginButton">Login</button>
            <button onClick={props.accountButtonHandler} id="signupButton">Sign Up</button>
        </div>
    </div>
    </>
  )
}

export default Topbar
