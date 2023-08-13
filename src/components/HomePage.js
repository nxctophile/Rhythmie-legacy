import React from 'react'
import '../styles/HomePage.css'
import { Link } from "react-router-dom";
import HomePageCards from './HomePageCards'
import play from "../resources/play-button.png";
import edit from "../resources/pencil.png";
import heart from "../resources/heart.png";

function HomePage(props) {
    let index = 0;

    const changeUsername = () => {
        let usernameInput = document.getElementById("usernameInput");
        let usernameField = document.getElementById("usernameField");
        usernameInput.style.display = "block";
        usernameField.style.display = "none";
        usernameInput.focus();
    }

  return (
    <section style={{background: `${props.theme}`, color: `${props.textColor}`}} id="homePage">
        <div id="content">
            <div id="greeting">
                {props.greeting}
                {props.greeting.includes('Hey') &&
                    <img id="handWaveEmoji" src="https://c.tenor.com/Wx9IEmZZXSoAAAAi/hi.gif" alt="" />
                }
                {props.greeting.includes('dreams') &&
                    <img id="handWaveEmoji" src="https://c.tenor.com/wNzoikuVQDUAAAAi/sleeping-face-joypixels.gif" alt="" />
                }
                {props.greeting.includes('morning') &&
                    <img style={{marginLeft: '-3px'}} id="handWaveEmoji" src="https://c.tenor.com/0l3zCp-KLX4AAAAi/pictia-nft.gif" alt="" />
                }
                {props.greeting.includes('afternoon') &&
                    <img style={{marginLeft: '-3px'}} id="handWaveEmoji" src="https://c.tenor.com/0l3zCp-KLX4AAAAi/pictia-nft.gif" alt="" />
                }
                {props.greeting.includes('evening') &&
                    <img style={{marginLeft: '5px'}} id="handWaveEmoji" src="https://c.tenor.com/fK_mqBr8xGIAAAAi/coffee-lover.gif" alt="" />
                }
                <div id="username">
                    {/*Enter your name*/}
                    <div id="usernameField">Samarth Singh Bachhotiya</div>
                    <input placeholder="Enter your name" type="text" id="usernameInput" />
                    <img id="editUsername" src={edit} onClick={changeUsername} />
                </div>
            </div>
            <div id="secondaryHomeSection">
                <div id="lastPlayedContainer">
                    <div id="lastPlayedSectionTitle">Pick up where you left off</div>
                    <div id="lastPlayed">
                        <div id="lastPlayedArt">
                            <img src="https://c.saavncdn.com/820/Blinding-Lights-English-2020-20200912094411-150x150.jpg"/>
                        </div>
                        <div id="lastPlayedDetails">
                            <div id="lastPlayedTitle">Blinding Lights</div>
                            <div id="lastPlayedArtist">The Weeknd</div>
                        </div>
                        <div id="playButtonEffectContainer">
                            <img id="playButtonEffect" src={play}/>
                        </div>
                    </div>
                </div>
                <div id="likedSongsButtonContainer">
                    <div id="likedSongs">
                        <div id="likedSongsHeart">
                            <img id="heartIcon" src={heart}/>
                        </div>
                        <div id="likedSongsDetails">
                            <div id="likedSongsTitle">Your liked songs</div>
                            <div id="likedSongsNumber">52 Songs</div>
                        </div>
                        <div id="playButtonEffectContainer">
                            <img id="playButtonEffect" src={play}/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="homePageTitleContainer">
                <div id="homePageTitle">
                    Most Popular <img id="fireEmoji" src="https://c.tenor.com/8McIGu0Tf_QAAAAi/fire-joypixels.gif" alt=""/>
                </div>
            </div>
        <div id="homeCardContainer">
            {props.results.map((element) => {
                index++;
                if (index < 16) {
                    return(
                        <HomePageCards
                            key={element.id}
                            homeCardImg={element.image[2].link}
                            homeCardTitle={props.limitString(element.name, 45)}
                            id={element.id}
                            homeCardSearch={props.homeCardSearch}
                        />)
                }
            })}
        </div>
            <div id="homeSeparatorContainer">
                <div id="homeSeparator"></div>
                <Link id="exploreMoreHomeContainer" to="/explore">
                    <div id="exploreMoreHome">
                        Explore more music
                    </div>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default HomePage