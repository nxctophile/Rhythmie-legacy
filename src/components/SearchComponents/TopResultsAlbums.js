import React from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';

function TopResults(props) {
  return (
    <div style={{background: `${props.boxColor}`}} className="searchAlbumResults">
        {props.musicArt &&
            <div id="albumArtContainer" onClick={() => {props.playMusic(props.songID)}}>
                <object id="searchedAlbumArt" data={props.musicArt} type="image/png">
                    <img id="failedMusicArt" src={defaultImg} onError={defaultImg}  alt={''}/>
                </object>
                <img draggable={false} id="searchedAlbumPlayButton" src={play} alt="" />
                <div id="searchedAlbumIcons">
                    <img id="searchedAlbumFavButton" className="searchedIcons" src={unfav} alt="" />
                    <img id="searchedAlbumOptionButton" className="searchedIcons" src={dots} alt="" />
                </div>
            </div>
        }
        {!props.musicArt && 
            <img id="searchedAlbumArt" src={defaultImg} alt={defaultImg} />
        }
        <div id="searchedAlbumInfo">
            <div id="actualInfo">
                <div style={{color: props.textColor}} id="searchedAlbumTitle">{props.songName}</div>
                <div id="searchedAlbumArtist">{props.songArtist}</div>
            </div>
        </div>
    </div>
  )
}

export default TopResults