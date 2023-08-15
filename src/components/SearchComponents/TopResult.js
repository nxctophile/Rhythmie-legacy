import React from 'react'
import '../../styles/ExplorePage.css'
import TopResultsSongs from './TopResultsSongs';
import TopResultsArtists from './TopResultsArtists';
import TopResultsAlbums from './TopResultsAlbums';
import TopMostResult from "./TopMostResult";
import more from '../../resources/arrow-right.png';
import moreWhite from '../../resources/arrow-right-white.png';
import {Link} from "react-router-dom";

function TopResults(props) {
  return (
    <>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Top Result</div>
        <section className="topSearchResults" id="topMostResult">
            {props.searchResult.results !== null ? props.searchResult.results.songs.results.slice(0, 1).map(element => {
                return (
                    <TopMostResult
                        songName={props.limitString(element.title, 35)}
                        songArtist={props.limitString(element.primaryArtists, 30)}
                        musicArt={element.image[2].link}
                        songID={element.id}
                        playMusic={props.playMusic}
                    />
                )
            }) : console.log("Songs are null")
            }
            <div id="resultsHr"></div>
        </section>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Songs</div>
        <section className="topSearchResults" id="topResultsSongs">
            {props.searchResult.results !== null ? props.searchResult.results.songs.results.map(element => {
                return (
                    <TopResultsSongs
                        songName={props.limitString(element.title, 40)}
                        songArtist={props.limitString(element.primaryArtists, 40)}
                        musicArt={element.image[1].link}
                        songID={element.id}
                        playMusic={props.playMusic}
                    />
                )
            }) : console.log("Songs are null")
            }
            <div id="resultsHr"></div>
        </section>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Albums</div>
        <section className="topSearchResults" id="topResultsAlbums">
            {props.searchResult.results !== null ? props.searchResult.results.albums.results.map(element => {
                return (
                    <TopResultsAlbums
                        songName={props.limitString(element.title, 20)}
                        songArtist={props.limitString(element.artist,30)}
                        musicArt={element.image[2].link}
                        songID={element.id}
                        playMusic={props.playMusic}
                    />
                )
            }) : console.log("Songs are null")
            }
            <div id="moreButton">
                <Link to="/explore/albums"><img alt="More" src={moreWhite} /> </Link>
            </div>
            {/*<div id="resultsHr"></div>*/}
        </section>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Artists</div>
        <section className="topSearchResults" id="topResultsArtists">
            {props.searchResult.results !== null ? props.searchResult.results.artists.results.map(element => {
                return (
                    <TopResultsArtists
                        artistName={props.limitString(element.title, 40)}
                        artistProfile={element.image[1].link}
                        artistDescription={element.description}
                        artistID={element.id}
                        playMusic={props.playMusic}
                    />
                )
            }) : ( <div id="null"> No artist found </div> )
            }
            <div style={{width: '25%'}} id="resultsLastHr"></div>
            <div id="bottom"></div>
        </section>
    </>
  )
}

export default TopResults