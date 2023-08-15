import React from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';

function SearchResults(props) {
  return (
    <div style={{background: `${props.boxColor}`}} className="searchResults">
        {props.musicArt &&
            <div id="musicArtContainer" onClick={() => {props.playMusic(props.songID)}}>
                <object id="searchedMusicArt" data={props.musicArt} type="image/png">
                    <img id="failedMusicArt" src={defaultImg} onError={defaultImg}  alt={''}/>
                </object>
                <img draggable={false} id="searchedPlayButton" src={play} alt="" />
            </div>
        }
        {!props.musicArt && 
            <img id="searchedMusicArt" src={defaultImg}  alt={''}/>
        }
        <div id="searchedSongInfo">
            <div id="actualInfo">
                <div id="searchedSongTitle">{props.songName}</div>
                <div id="searchedSongArtist">{props.songArtist}</div>
            </div>
            <div id="searchedIcons">
                <div id="totalMusicDuration">
                    {props.duration}
                </div>
                <img onClick={() => {props.playMusic(props.songID)}} id="searchedPlayButton" className="searchedIcons" src={play} alt="" />
                <img id="searchedFavButton" className="searchedIcons" src={unfav} alt="" />
                <div id="searchedSongDuration">{props.songDuration}</div>
                <img id="searchedOptionButton" className="searchedIcons" src={dots} alt="" />
             </div>
        </div>
    </div>
  )
}

export default SearchResults