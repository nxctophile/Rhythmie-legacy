import React, { useState } from 'react'
import '../styles/ExplorePage.css'
import SearchLoading from './SearchLoading';
import TopResult from './SearchComponents/TopResult';
import defaultImg from '../resources/default.png';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import SongResults from './SearchComponents/SongResults';
import TopSearches from './SearchComponents/TopSearches';
import AlbumResults from './SearchComponents/AlbumResults';
import ArtistResults from './SearchComponents/ArtistResults';

function ExplorePage(props) {
    const [searchLoadingState, setSearchLoadingState] = useState(false);
    const [searchResult, setSearchResult] = useState({
      results: [{
          name: "Song Name",
          artist: "Song Artist",
          image:[{link: defaultImg}],
          duration: '00:00'
      }
      ]
    })


    // function converter (value) {
    //     let val = Math.round(value);
    //     const h = Math.floor(val / 3600);
    //     const m = Math.floor(val % 3600 / 60);
    //     const s = Math.floor(val % 3600 % 60);
    //     const hours = h > 0 ? h + ':' : "";
    //     const minutes = m > 0 ? (m<10 ? '0'+m : m) + ':' : "00:";
    //     const seconds = s > 0 ? (s<10 ? '0'+s : s) : "00";
    //     let duration = hours + minutes + seconds
    //     return duration;
    // }
    function playMusic(ID) {

        props.setMusic(ID);
    }
    function songResults() {
        fetchSongResults(props.searchQuery);
    }
    async function fetchSongResults(searchQuery) {
        setSearchLoadingState(true);
        setSearchResult({
        results: [{
            image:[{link: defaultImg}]
        }]
        });
        let url = `https://saavn.me/search/songs?query=${searchQuery}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setSearchResult({
            results: parsedData.data
        });
        setSearchLoadingState(false);
    }
    function albumResults() {
        fetchAlbumResults(props.searchQuery);
    }
    async function fetchAlbumResults(searchQuery) {
        setSearchLoadingState(true);
        setSearchResult({
        results: [{
            image:[{link: defaultImg}]
        }]
        });
        let url = `https://saavn.me/search/albums?query=${searchQuery}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setSearchResult({
            results: parsedData.data
        });
        setSearchLoadingState(false);
    }
    function artistResults() {
        fetchArtistResults(props.searchQuery);
    }
    async function fetchArtistResults(searchQuery) {
        setSearchLoadingState(true);
        setSearchResult({
        results: [{
            image:[{link: defaultImg}]
        }]
        });
        let url = `https://saavn.me/search/artists?query=${searchQuery}`;
        console.log("URL: ", url)
        let data = await fetch(url);
        let parsedData = await data.json();
        setSearchResult({
            results: parsedData.data
        });

        console.log("Data: ", searchResult)
        setSearchLoadingState(false);
    }
    const searchAlbum = () => {
        alert("Album was searched");
    }

    function handleClearBox () {
        document.getElementById("searchBox").value = '';
        document.getElementById("clearBox").style.visibility = "hidden";
      }


  return (
    <section id="explorePage">
            <div id="exploreSearchBar">
                <input style={{background: `${props.searchBoxTheme}`, color: `${props.textColor}`}} onChange={props.searchHandler} placeholder="Search for a song, album or artist" id="exploreSearchBox" type="text"/>
                <span onClick={handleClearBox} id="clearBox" className="material-symbols-outlined">close</span>
                {/*<button onClick={props.searchHandler} id="exploreSearchButton">*/}
                {/*    Search*/}
                {/*</button>*/}
            </div>
            {props.searchLoadingState && <SearchLoading />}
            {!props.searchLoadingState && 
            <div id="explorePageContents">
                <div id="results">
                    <Routes>
                        <Route path='/' element={
                            <div id="topSearchesContainer">
                                <div style={{color: props.textColor}} id="topSearchesText">
                                Top Searches
                                <img id="topSearchesIcon" src="https://c.tenor.com/S8dOItPNscgAAAAi/loop-loading.gif" alt="" /></div>
                                
                                <Link style={{color: props.textColor}} id="mostRecentSearch" to="/explore/topresults">
                                    <span id="mostRecentSearchIcon" className="material-symbols-outlined">
                                        history
                                    </span>
                                    <div>
                                        Most Recent Search
                                    </div>
                                </Link>
                                {props.results.map((element) => {
                                    return(
                                        <TopSearches
                                            title={element.name}
                                            handleTopSearch={props.handleTopSearch}
                                            textColor={props.textColor}
                                        />
                                    )
                                })}
                            </div>
                        }></Route>
                        <Route path='/topresults' element={
                            <>
                                <div id="searchedTitle">
                                    <span id="searchBack" onClick={() => window.history.go(-1)} className="material-symbols-outlined">
                                        arrow_back_ios
                                    </span>
                                    <div style={{color: `${props.textColor}`}} id="activeMusicTitle" className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/">Top Results</Link>
                                    </div>
                                    <div onClick={songResults} style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/songs">Songs</Link>
                                    </div>
                                    <div onClick={albumResults} style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/albums">Albums</Link>
                                    </div>
                                    <div onClick={artistResults} style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/artists">Artists</Link>
                                    </div>
                                </div>
                                <TopResult
                                    theme={props.theme}
                                    textColor={props.textColor}
                                    boxColor={props.boxColor}
                                    searchResult={props.searchResult}
                                    setMusic={props.setMusic}
                                    searchLoadingState={props.searchLoadingState}
                                    searchProgress={props.searchProgress}
                                    playMusic={playMusic}
                                    limitString={props.limitString}
                                />
                            </>
                            }>
                        </Route>
                        <Route path='/songs' element={
                            <>
                                <div id="searchedTitle">
                                <span id="searchBack" onClick={() => window.history.go(-1)} className="material-symbols-outlined">
                                    arrow_back_ios
                                </span>
                                    <div style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/topresults">Top Results</Link>
                                    </div>
                                    <div onClick={songResults} style={{color: `${props.textColor}`}} id="activeMusicTitle" className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/songs">Songs</Link>
                                    </div>
                                    <div onClick={albumResults} style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/albums">Albums</Link>
                                    </div>
                                    <div onClick={artistResults} style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/artists">Artists</Link>
                                    </div>
                                </div>
                                <SongResults
                                    theme={props.theme}
                                    textColor={props.textColor}
                                    boxColor={props.boxColor}
                                    searchResult={searchResult}
                                    setMusic={props.setMusic}
                                    searchLoadingState={searchLoadingState}
                                    searchProgress={props.searchProgress}
                                    playMusic={playMusic}
                                    limitString={props.limitString}
                                />
                            </>
                            }>
                        </Route>
                        <Route path='/albums' element={
                            <>
                                <div id="searchedTitle">
                                <span id="searchBack" onClick={() => window.history.go(-1)} className="material-symbols-outlined">
                                    arrow_back_ios
                                </span>
                                    <div style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/topresults">Top Results</Link>
                                    </div>
                                    <div onClick={songResults} style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/songs">Songs</Link>
                                    </div>
                                    <div onClick={albumResults} style={{color: `${props.textColor}`}} id="activeMusicTitle" className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/albums">Albums</Link>
                                    </div>
                                    <div onClick={artistResults} style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/artists">Artists</Link>
                                    </div>
                                </div>
                                <AlbumResults
                                    theme={props.theme}
                                    textColor={props.textColor}
                                    boxColor={props.boxColor}
                                    searchResult={searchResult}
                                    setMusic={props.setMusic}
                                    searchLoadingState={searchLoadingState}
                                    searchProgress={props.searchProgress}
                                    searchAlbum={searchAlbum}
                                    limitString={props.limitString}
                                />
                            </>
                            }>
                        </Route>
                        <Route path='/artists' element={
                            <>
                                <div id="searchedTitle">
                                <span id="searchBack" onClick={() => window.history.go(-1)} className="material-symbols-outlined">
                                    arrow_back_ios
                                </span>
                                    <div style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/topresults">Top Results</Link>
                                    </div>
                                    <div onClick={songResults} style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/songs">Songs</Link>
                                    </div>
                                    <div onClick={albumResults} style={{color: `${props.textColor}`}} className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/albums">Albums</Link>
                                    </div>
                                    <div onClick={artistResults} style={{color: `${props.textColor}`}} id="activeMusicTitle" className="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/artists">Artists</Link>
                                    </div>
                                </div>
                                <ArtistResults
                                    theme={props.theme}
                                    textColor={props.textColor}
                                    boxColor={props.boxColor}
                                    searchResult={searchResult}
                                    setMusic={props.setMusic}
                                    searchLoadingState={searchLoadingState}
                                    searchProgress={props.searchProgress}
                                    limitString={props.limitString}
                                />
                            </>
                            }>
                        </Route>
                    </Routes>
                </div>
                </div>
            }
            </section>
  )
}

export default ExplorePage