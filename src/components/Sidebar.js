import React from 'react'
import '../styles/Sidebar.css'
import icon from "../resources/icon.png"
import { Link } from 'react-router-dom'
// import home from "../resources/home.png"
// import trending from "../resources/trending.png"
// import top from "../resources/top.png"
// import library from "../resources/library.png"

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
                    Alpha
                </div>
            </div>
        </div>
        <div id="navMenu">
            <Link id="active" className="navMenuItem" style={{color: `${props.textColor}`}} to="/">
                <div>
                    {/* <img className="navMenuIcon" src={home} alt="Home icon"/> */}
                    <span id="navMenuIcon" className="material-symbols-outlined">home</span>
                        <span className="navMenuText">
                            Home
                        </span>
                </div>
            </Link>
            <Link className="navMenuItem" onClick={props.mountExplore} style={{color: `${props.textColor}`}} to="/explore">
                <div>
                    {/* <img className="navMenuIcon" src={trending} alt="Trending icon"/> */}
                    <span id="navMenuIcon" className="material-symbols-outlined">explore</span>
                        <span className="navMenuText">
                            Explore
                        </span>
                </div>
            </Link>
            <Link className="navMenuItem" style={{color: `${props.textColor}`}} to="/trending">
                <div>
                    {/* <img className="navMenuIcon" src={trending} alt="Trending icon"/> */}
                    <span id="navMenuIcon" className="material-symbols-outlined">slideshow</span>
                        <span className="navMenuText">
                            Music Videos
                        </span>
                </div>
            </Link>
            <Link className="navMenuItem" style={{color: `${props.textColor}`}} to="/topcharts">
                <div>
                    {/* <img className="navMenuIcon" src={top} alt="Top Charts icon"/> */}
                    <span id="navMenuIcon" className="material-symbols-outlined">whatshot</span>
                        <span className="navMenuText">
                            Top Charts
                        </span>
                </div>
            </Link>
            <Link className="navMenuItem" style={{color: `${props.textColor}`}} to="/mylibrary">
                <div>
                    {/* <img className="navMenuIcon" src={library} alt="Your Library icon"/> */}
                    <span id="navMenuIcon" className="material-symbols-outlined">library_music</span>
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
