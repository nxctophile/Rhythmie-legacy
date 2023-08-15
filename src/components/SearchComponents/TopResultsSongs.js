import React from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';
import download from '../../resources/download.png';

function TopResults(props) {
  return (
    <div style={{background: `${props.boxColor}`}} className="searchResults">
        {props.musicArt &&
            <div onClick={() => {props.playMusic(props.songID)}} id="musicArtContainer">
                <object id="searchedMusicArt" data={props.musicArt} type="image/png">
                    <img id="failedMusicArt" src={defaultImg} onError={defaultImg}  alt={''}/>
                </object>
                <img draggable={false} id="searchedPlayButton" src={play} alt="" />
            </div>
        }
        {!props.musicArt &&
                <img id="searchedMusicArt" src={defaultImg} alt={defaultImg} />
        }
        <div id="searchedSongInfo">
            <div id="actualInfo">
                <div style={{color: props.textColor}} id="searchedSongTitle">{props.songName.replace(/&quot;/g,'"')}</div>
                <div id="searchedSongArtist">{props.songArtist}</div>
            </div>
        <div className="topSearchIcons" id="searchedIcons">
            {/* <img draggable={false} id="downloadSearchButton" className="searchedIcons" src={download} alt="" /> */}
            <img draggable={false} id="searchedFavButton" className="searchedIcons" src={unfav} alt="" />
            <img draggable={false} id="searchedOptionButton" className="searchedIcons" src={dots} alt="" />
        </div>
        </div>
    </div>
  )
}

export default TopResults