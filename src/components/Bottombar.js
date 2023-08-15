import React, { useEffect, useState } from "react";
import "../styles/Bottombar.css";
import Playerloading from "./Playerloading";
import next from "../resources/next.png";
import prev from "../resources/prev.png";
import dots from "../resources/dots.png";
import volume from "../resources/volume.png";
import volume2 from "../resources/volume2.png";
import fav from "../resources/fav.png";
import unfav from "../resources/unfav.png";
import repeat from "../resources/repeat.png";
import shuffle from "../resources/shuffle.png";
import download from "../resources/download.png";

let v = 0;
let f = 0;
let m = 0;

function Bottombar(props) {
  const [volumeButton, setVolumeButton] = useState(volume);
  const [favButton, setFavButton] = useState(unfav);
  const [songName, setSongName] = useState("");
  function showSlider() {
    const sliderContainer = document.getElementById("sliderContainer");
    if (v % 2 === 0) {
      sliderContainer.style.display = "block";
      v++;
      setVolumeButton(volume2);
    } else {
      sliderContainer.style.display = "none";
      v++;
      setVolumeButton(volume);
    }
  }
  function updateVolume(defaultValue) {
    document.getElementById("music").volume = defaultValue.target.value;
  }
  function favoriteHandler() {
    if (f % 2 === 0) {
      setFavButton(fav);
      f++;
    } else {
      setFavButton(unfav);
      f++;
    }
  }
  function bottomMenuHandler() {
    if (m % 2 === 0) {
      document.getElementById("bottomMenuBox").style.display = "block";
      m++;
    } else {
      document.getElementById("bottomMenuBox").style.display = "none";
      m++;
    }
  }
  function qualityButtonHandler() {
    document.getElementById("qualityMenu").style.display = "block";
  }
  function qualityButtonOutHandler() {
    document.getElementById("qualityMenu").style.display = "none";
  }

  // function downloadHandler() {
  // document.getElementById('download_frame').src = props.musicLink;
  // }
  async function downloadHandler() {
    let url = `https://cors-anywhere.herokuapp.com/${props.musicLink}`;
    const music = await fetch(url);
    const musicBlob = await music.blob();
    const musicURL = URL.createObjectURL(musicBlob);
    const anchor = document.createElement("a");
    anchor.href = musicURL;
    anchor.download = "";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(musicURL);
  }
  useEffect(() => {
    if (props.songTitle) {
      if (props.songTitle.length >= 30) {
        setSongName(`${props.songTitle.slice(0, 30)}...`);
        if (window.innerWidth <= 550) {
          document.getElementById("songTitle").style.height = "30px";
          document.getElementById("songTitle").style.color = "blue";
          document.getElementById("songInfo").style.top = "60px";
        }
        console.log(window.innerWidth);
      } else {
        setSongName(props.songTitle);
      }
    }
  }, [props.songTitle]);

  let youtube =  `https://www.youtube.com/results?search_query=${props.songTitle} by ${props.songArtist}`;

  return (
    <>
      <div
        style={{
          background: `${props.bottomBarTheme}`,
          color: `${props.textColor}`,
          boxShadow: `${props.bottomBarShadow}`,
        }}
        id="bottomBar"
      >
        <div id="bottomBG"></div>
        {!props.playerLoading && (
          <div id="musicControls">
            <audio id="music" src={props.musicLink} />
            <div id="musicComponent">
              <img draggable={false} id="shuffleButton" src={shuffle} alt="Shuffle" />
              <img
                draggable={false}
                id="prevButton"
                src={prev}
                alt="Previous"
              />
              <img
                draggable={false}
                id="playPause"
                src={props.playState}
                onClick={props.playPause}
                alt="Play/Pause Button"
              />
              <img draggable={false} id="nextButton" src={next} alt="Next" />
              <img draggable={false} id="repeatButton" src={repeat} alt="Repeat" />
            </div>
          </div>
        )}
        {props.playerLoading && <Playerloading />}
        <div id="musicInfo">
          <a id="youtubeLink" href={youtube}>
            <img
                draggable={false}
                id="musicArt"
                src={props.musicArt}
                alt="Music art"
            />
          </a>
          <div id="songInfo">
            <div id="songTitle">
              <span dangerouslySetInnerHTML={{ __html: songName }}></span>
              <div onClick={props.handleArtist} id="songArtist">
                {props.songArtist}
              </div>
            </div>
          </div>
        </div>
        {props.seekBar && (
          <>
            <div id="totalSeek">
              <input
                style={{ background: `${props.seekBarTheme}` }}
                id="seekBar"
                value={props.seekValue}
                type="range"
                min="0"
                max="100"
                step="1"
                onChange={props.updateSeek}
              />
            </div>
            <div id="musicDuration">
              <div id="duration">
                <span id="currentDuration">{props.currentDuration}</span>/
                <span id="totalDuration">{props.totalDuration}</span>
              </div>
              <div
                style={{
                  background: `${props.bottomBarTheme}`,
                  color: `${props.textColor}`,
                  boxShadow: `${props.bottomBarShadow}`,
                  display: "none",
                }}
                id="bottomMenuBox"
              >
                <div
                  id="qualityButton"
                  className="bottomMenuItem"
                  onMouseOut={qualityButtonOutHandler}
                  onMouseOver={qualityButtonHandler}
                >
                  <span id="chevronLeft" className="material-symbols-outlined">
                    chevron_left
                  </span>
                  <span id="qualityText">{props.qualityState}</span>
                  <div
                    style={{
                      background: `${props.bottomBarTheme}`,
                      color: `${props.textColor}`,
                      boxShadow: `${props.bottomBarShadow}`,
                      display: "none",
                    }}
                    id="qualityMenu"
                  >
                    <div
                      onClick={props.setQualityDataSaving}
                      className="qualityMenuItem"
                    >
                      <span
                        style={{ display: "none" }}
                        id="qualitySetDS"
                        className="material-symbols-outlined"
                      >
                        done
                      </span>
                      <span id="qualitySetting">
                        Data Saving{" "}
                        <span id="qualityOption">{` (48kbps)`}</span>{" "}
                      </span>
                    </div>
                    <div
                      onClick={props.setQualityLow}
                      className="qualityMenuItem"
                    >
                      <span
                        style={{ display: "none" }}
                        id="qualitySetL"
                        className="material-symbols-outlined"
                      >
                        done
                      </span>
                      <span id="qualitySetting">
                        Low <span id="qualityOption">{` (96kbps)`}</span>{" "}
                      </span>
                    </div>
                    <div
                      onClick={props.setQualityMedium}
                      className="qualityMenuItem"
                    >
                      <span
                        style={{ display: "none" }}
                        id="qualitySetM"
                        className="material-symbols-outlined"
                      >
                        done
                      </span>
                      <span id="qualitySetting">
                        Medium <span id="qualityOption">{` (160kbps)`}</span>{" "}
                      </span>
                    </div>
                    <div
                      onClick={props.setQualityHigh}
                      className="qualityMenuItem"
                    >
                      <span
                        style={{ display: "none" }}
                        id="qualitySetH"
                        className="material-symbols-outlined"
                      >
                        done
                      </span>
                      <span id="qualitySetting">
                        High <span id="qualityOption">{` (320kbps)`}</span>{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div id="playlistButton" className="bottomMenuItem">
                  Add to playlist
                </div>
                <div id="playlistButton" className="bottomMenuItem">
                  Share
                </div>
              </div>
              <div id="bottomIcons">
                {/* <img
                  draggable={false}
                  onClick={downloadHandler}
                  id="downloadButton"
                  src={download}
                  alt=""
                /> */}
                <img
                  draggable={false}
                  onClick={favoriteHandler}
                  id="favButton"
                  src={favButton}
                  alt=""
                />
                <img
                  draggable={false}
                  onClick={bottomMenuHandler}
                  id="bottomMenu"
                  src={dots}
                  alt=""
                />
                <img
                  draggable={false}
                  onClick={showSlider}
                  id="volumeButton"
                  src={volumeButton}
                  alt=""
                />

                <div id="sliderContainer">
                  <input
                    id="volumeSlider"
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.1"
                    onChange={updateVolume}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Bottombar;
