import React from 'react';
import '../styles/Topbar.css';
import search from '../resources/search.png';
import icon from "../resources/icon.png"
import { Link } from "react-router-dom";
import accountIcon from '../resources/user-icon.png';

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
        <div id="searchBar">
            <input style={{background: `${props.searchBoxTheme}`, color: `${props.textColor}`}} onChange={props.searchHandler} placeholder="What's on your mind?" id="searchBox" type="text"/>
            <span onClick={handleClearBox} id="clearBox" style={{background: `${props.searchBoxTheme}`}} className="material-symbols-outlined">close</span>
            <button onClick={props.searchHandler} id="searchButton">
                Search
            </button>
        </div>
        <div id="userAccountPanel">
            <img src={accountIcon} />
        </div>
    </div>
    </>
  )
}

export default Topbar
