import React from 'react'
import '../styles/Sidebar.css'
import icon from "../resources/icon.png"
import { Link } from 'react-router-dom'
import home from "../resources/home.png"
import explore from "../resources/explore.png"
import mv from "../resources/mv.png"
import library from "../resources/library.png"

function Sidebar(props) {
  return (
    <nav id="sideNav" style={{background: `${props.theme}`, color: `${props.textColor}`}}>
        <div id="barTitle">
            <img id="icon" src={icon} alt="ApidMusic icon"/>
            <div id="titleTextContainer">
                <div id="barTitleText">
                    Rhythmie
                </div>
                <div id="alpha">
                    In-Dev
                </div>
            </div>
        </div>
        <div id="navMenu">
            <Link id="active" className="navMenuItem" style={{color: `${props.textColor}`}} to="/">
                <div>
                     <img id="homeIcon" className="navMenuIcon" src={home} alt="Home icon"/>
                        <span className="navMenuText">
                            Home
                        </span>
                </div>
            </Link>
            <Link className="navMenuItem" onClick={props.mountExplore} style={{color: `${props.textColor}`}} to="/explore">
                <div>
                     <img className="navMenuIcon" src={explore} alt="Explore"/>
                        <span className="navMenuText">
                            Explore
                        </span>
                </div>
            </Link>
            <Link className="navMenuItem" style={{color: `${props.textColor}`}} to="/mylibrary">
                <div>
                     <img className="navMenuIcon" src={library} alt="Your Library icon"/>
                        <span className="navMenuText">
                            My Library
                        </span>
                </div>
            </Link>
        </div>
        <div id="playQueue">
            <div id="playQueueTitle">
                Your Queue
            </div>
            <div id="emptyQueue">
                <button style={{color: `${props.textColor}`}} id="createQueueButton">
                    Create a queue +
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Sidebar
