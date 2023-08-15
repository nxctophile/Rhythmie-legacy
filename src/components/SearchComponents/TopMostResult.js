import React from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';
import download from '../../resources/download.png';

function TopMostResult(props) {
    return (
        <div className="topMostResult">
            {props.musicArt &&
                <div id="topMostResultArtContainer">
                    <object id="topMostResultMusicArt" data={props.musicArt} type="image/png">
                        <img id="failedMusicArt" src={defaultImg} onError={defaultImg}  alt={''}/>
                    </object>
                </div>
            }
            {!props.musicArt &&
                <img id="topMostResultMusicArt" src={defaultImg} alt={defaultImg} />
            }
            <div id="topMostResultSongInfo">
                <div id="topMostResultInfo">
                    <div style={{color: props.textColor}} id="topMostResultSongTitle">{props.songName.replace(/&quot;/g,'"')}</div>
                    <div id="topMostResultSongArtist">{props.songArtist}</div>
                </div>
                <div className="topMostResultIcons" id="topMostResultIcons">
                    {/* <img draggable={false} id="downloadSearchButton" className="searchedIcons" src={download} alt="" /> */}
                    <img draggable={false} id="topMostResultOptionButton" className="searchedIcons" src={dots} alt="" />
                    <img draggable={false} id="topMostResultFavButton" className="searchedIcons" src={unfav} alt="" />
                    <img draggable={false} onClick={() => {props.playMusic(props.songID)}} id="topMostResultPlayButton" src={play} alt="" />
                </div>
            </div>
        </div>
    )
}

export default TopMostResult;