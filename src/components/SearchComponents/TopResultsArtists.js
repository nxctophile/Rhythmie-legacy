import React from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';

function TopResults(props) {
  return (
    <div style={{background: `${props.boxColor}`}} className="searchResults">
        {props.musicArt &&
            <img id="searchedArtistArt" src={props.artistProfile} alt={defaultImg} />
        }
        {!props.musicArt && 
            <img id="searchedArtistArt" src={props.artistProfile} alt={defaultImg} />
        }
        <div id="searchedSongInfo">
            <div id="actualInfo">
                <div style={{color: props.textColor}} id="searchedSongTitle">{props.artistName}</div>
                <div id="searchedSongArtist">{props.artistDescription}</div>
            </div>
            <div id="searchedArtistIcons">
                <img onClick={() => {props.playMusic(props.artistID)}} id="searchedPlayButton" className="searchedIcons" src={play} alt="" />
                <img id="searchedFavButton" className="searchedIcons" src={unfav} alt="" />
                <img id="searchedOptionButton" className="searchedIcons" src={dots} alt="" />
            </div>
        </div>
    </div>
  )
}

export default TopResults