import React from 'react';
import '../styles/Bottombar.css';
import { Link } from 'react-router-dom'

function BottomNavbar(props) {
  return (
    <nav id="bottomNav" style={{background: `${props.theme}`, color: `${props.textColor}`}}>
        <div id="bottomNavMenu">
            <Link className="bottomNavMenuItem" style={{color: `${props.textColor}`}} to="/trending">
                <div id="bottomNavMenuTitle">
                    {/* <img className="bottomNavMenuIcon" src={trending} alt="Trending icon"/> */}
                    <span id="bottomNavMenuIcon" className="material-symbols-outlined">slideshow</span>
                        <span className="bottomNavMenuText">
                            MVs
                        </span>
                </div>
            </Link>
            <Link className="bottomNavMenuItem" onClick={props.mountExplore} style={{color: `${props.textColor}`}} to="/explore">
                <div id="bottomNavMenuTitle">
                    {/* <img className="bottomNavMenuIcon" src={trending} alt="Trending icon"/> */}
                    <span id="bottomNavMenuIcon" className="material-symbols-outlined">explore</span>
                    <span className="bottomNavMenuText">
                            Explore
                        </span>
                </div>
            </Link>
            <Link id="active" className="bottomNavMenuItem" style={{color: `${props.textColor}`}} to="/">
                <div id="bottomNavMenuTitle">
                    {/* <img className="bottomNavMenuIcon" src={home} alt="Home icon"/> */}
                    <span id="bottomNavMenuIcon" className="material-symbols-outlined">home</span>
                        <span className="bottomNavMenuText">
                            Home
                        </span>
                </div>
            </Link>
            <Link className="bottomNavMenuItem" style={{color: `${props.textColor}`}} to="/topcharts">
                <div id="bottomNavMenuTitle">
                    {/* <img className="bottomNavMenuIcon" src={top} alt="Top Charts icon"/> */}
                    <span id="bottomNavMenuIcon" className="material-symbols-outlined">whatshot</span>
                    <span className="bottomNavMenuText">
                            Charts
                        </span>
                </div>
            </Link>
            <Link className="bottomNavMenuItem" style={{color: `${props.textColor}`}} to="/mylibrary">
                <div id="bottomNavMenuTitle">
                    {/* <img className="bottomNavMenuIcon" src={library} alt="Your Library icon"/> */}
                    <span id="bottomNavMenuIcon" className="material-symbols-outlined">library_music</span>
                    <span className="bottomNavMenuText">
                            Library
                        </span>
                </div>
            </Link>
        </div>
    </nav>
  )
}

export default BottomNavbar