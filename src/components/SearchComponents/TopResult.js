import React from 'react'
import '../../styles/ExplorePage.css'
import TopResultsSongs from './TopResultsSongs';
import TopResultsArtists from './TopResultsArtists';
import TopResultsAlbums from './TopResultsAlbums';

function TopResults(props) {
  return (
    <>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Songs</div>
        <section className="topSearchResults" id="topResultsSongs">
            {props.searchResult.results !== null ? props.searchResult.results.songs.results.map(element => {
                return (
                    <TopResultsSongs
                        songName={props.limitString(element.title, 20)}
                        songArtist={props.limitString(element.primaryArtists, 25)}
                        musicArt={element.image[1].link}
                        songID={element.id}
                        theme={props.theme}
                        textColor={props.textColor}
                        boxColor={props.boxColor}
                        playMusic={props.playMusic}
                    />
                )
            }) : console.log("Songs are null")
            }
            <hr id="resultsHr" />
        </section>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Albums</div>
        <section className="topSearchResults" id="topResultsAlbums">
            {props.searchResult.results !== null ? props.searchResult.results.albums.results.map(element => {
                return (
                    <TopResultsAlbums
                        songName={props.limitString(element.title, 30)}
                        songArtist={props.limitString(element.artist, 30)}
                        musicArt={element.image[1].link}
                        songID={element.id}
                        theme={props.theme}
                        textColor={props.textColor}
                        boxColor={props.boxColor}
                        playMusic={props.playMusic}
                    />
                )
            }) : console.log("Songs are null")
            }
            <hr id="resultsHr" />
        </section>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Artists</div>
        <section className="topSearchResults" id="topResultsArtists">
            {props.searchResult.results !== null ? props.searchResult.results.artists.results.map(element => {
                return (
                    <TopResultsArtists
                        artistName={props.limitString(element.title, 30)}
                        artistProfile={element.image[1].link}
                        artistDescription={element.description}
                        artistID={element.id}
                        theme={props.theme}
                        textColor={props.textColor}
                        boxColor={props.boxColor}
                        playMusic={props.playMusic}
                    />
                )
            }) : console.log("Songs are null")
            }
            <hr style={{width: '25%'}} id="resultsLastHr" />
            <div id="bottom"></div>
        </section>
    </>
  )
}

export default TopResults