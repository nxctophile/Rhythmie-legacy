import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import "./styles/App.css";
import Bottombar from "./components/Bottombar";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import play from "./resources/play.png";
import pause from "./resources/pause.png";
import defaultImg from "./resources/default.png";
import HomePage from "./components/HomePage";
import ExplorePage from "./components/ExplorePage";
import "./styles/Sidebar.css";
import WorkInProgress from "./components/WorkInProgress";
import BottomNavbar from "./components/BottomNavbar";
import MVPage from "./components/MVPage";
import MyLibraryPage from "./components/MyLibraryPage";

let x = 0;
let interval;
let homePageResults = [];
const restoreImage = () => {
  document.getElementById("musicArt").style.visibility = "visible";
}

export default function App() {
  const [greeting, setGreeting] = useState("Hey There,");
  const [localData, setLocalData] = useState({
    songName: "Your recent song here",
    songArtist: "Song artist",
    songArt: defaultImg,
    song_ID: "someID",
  });
  const [likedData, setLikedData] = useState([]);
  const [queue, setQueue] = useState({
    songName: undefined,
    songArtist: "Song artist",
    songArt: defaultImg,
    song_ID: "someID",
  });
  function initGreeting() {
    const date = new Date();
    if(date.getHours() >= 6 && date.getHours() <= 12) {
      setGreeting("Good morning,");
    }
    else if(date.getHours() >= 12 && date.getHours() <= 16) {
      setGreeting("Good afternoon,");
    }
    else if(date.getHours() >= 16 && date.getHours() <= 20) {
      setGreeting("Good evening,");
    }
    else if(date.getHours() >= 20 && date.getHours() <= 24) {
      setGreeting("Sweet dreams,");
    }
    else if(date.getHours() >= 0 && date.getHours() <= 6) {
      setGreeting("Sweet dreams,");
    }
    console.log(date.getHours());
  }
  useEffect(() => {
    // Update the document title using the browser API
    if (window.location.href.includes("explore")) {
      document.getElementsByClassName("navMenuItem")[0].id = "";
      document.getElementsByClassName("navMenuItem")[1].id = "active";
      document.getElementsByClassName("navMenuItem")[2].id = "";
      document.getElementsByClassName("bottomNavMenuItem")[0].id = "";
      document.getElementsByClassName("bottomNavMenuItem")[1].id = "active";
      document.getElementsByClassName("bottomNavMenuItem")[2].id = "";
    } else if (window.location.href.includes("mylibrary")) {
      document.getElementsByClassName("navMenuItem")[0].id = "";
      document.getElementsByClassName("navMenuItem")[1].id = "";
      document.getElementsByClassName("navMenuItem")[2].id = "active";
      document.getElementsByClassName("bottomNavMenuItem")[0].id = "";
      document.getElementsByClassName("bottomNavMenuItem")[1].id = "";
      document.getElementsByClassName("bottomNavMenuItem")[2].id = "active";
    } else {
      document.getElementsByClassName("navMenuItem")[0].id = "active";
      document.getElementsByClassName("navMenuItem")[1].id = "";
      document.getElementsByClassName("navMenuItem")[2].id = "";
      document.getElementsByClassName("bottomNavMenuItem")[0].id = "";
      document.getElementsByClassName("bottomNavMenuItem")[1].id = "";
      document.getElementsByClassName("bottomNavMenuItem")[2].id = "active";
    }
  });
  useEffect(() => {
    fetchHomeData();
    initGreeting();
    if (localStorage.getItem('recentSong')) {
      setLocalData(JSON.parse(localStorage.getItem('recentSong')));
    }
    if (localStorage.getItem('likedSongs')) {
      setLikedData(JSON.parse(localStorage.getItem('likedSongs')));
    }
  }, []);

  const navigate = useNavigate();
  const [playState, setPlayState] = useState(play);
  const [seekValue, setSeekValue] = useState("0");
  const [musicQuality, setMusicQuality] = useState(3);
  const [qualityState, setQualityState] = useState("Quality - MD");
  const [musicState, setMusicState] = useState({
    musicArt: defaultImg,
    musicLink: "",
    songTitle: "",
    songArtist: "",
    playerLoading: false,
    seekBar: false,
  });
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchLoadingState, setSearchLoadingState] = useState(false);
  const [searchProgress, setSearchProgress] = useState(false);

  function dialogBox(message) {
    const dialog = document.getElementById("dialogBox");
    const dialogText = document.getElementById("dialogText");
    dialog.style.display = "block";
    dialogText.innerHTML = message;
    setTimeout(() => {
      dialog.style.display = "none";
    }, 3000);
  }

  function converter(value) {
    let val = Math.round(value);
    const h = Math.floor(val / 3600);
    const m = Math.floor((val % 3600) / 60);
    const s = Math.floor((val % 3600) % 60);
    const hours = h > 0 ? h + ":" : "";
    const minutes = m > 0 ? (m < 10 ? "0" + m : m) + ":" : "00:";
    const seconds = s > 0 ? (s < 10 ? "0" + s : s) : "00";
    return hours + minutes + seconds;
  }


  function limitString(str, limit) {
    if (str.length > limit) {
      return str.slice(0, limit) + "...";
    } else {
      return str;
    }
  }

  function musicDuration() {
    let totalMusicDuration = document.getElementById("music").duration;
    setTotalDuration(converter(totalMusicDuration));
  }
  function currentMusicDuration() {
    const music = document.getElementById("music");
    let seekBar = document.getElementById("seekBar");
    let totalMusicDuration = document.getElementById("music").duration;
    seekBar.max = totalMusicDuration;
    interval = setInterval(() => {
      let currentDuration = document.getElementById("music").currentTime;
      setCurrentDuration(converter(currentDuration));
      setSeekValue(currentDuration);
      musicDuration();
      if (currentDuration - 10 >= totalMusicDuration) {
        music.pause();
        setPlayState(play);
        clearInterval(interval);
      }
    }, 500);
  }
  const fetchSong = async (songID) => {
    restoreImage();
    let url = `https://saavn.me/songs?id=${songID}`;
    setMusicState({
      musicArt: defaultImg,
      playerLoading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    setMusicState({
      musicArt: parsedData.data[0].image[2].link,
      musicLink: parsedData.data[0].downloadUrl[musicQuality].link,
      songTitle: limitString(parsedData.data[0].name, 30),
      songArtist: limitString(parsedData.data[0].primaryArtists, 40),
      playerLoading: false,
      seekBar: true,
      duration: parsedData.data[0].duration,
    });
    setPlayState(play);
    setTimeout(() => {
      music();
      x++;
      document.title = `${musicState.songArtist} - ${musicState.songTitle}`;
      const localData = {
        songName: limitString(parsedData.data[0].name, 30),
        songArtist: limitString(parsedData.data[0].primaryArtists, 40),
        songArt: parsedData.data[0].image[2].link,
        song_ID: songID,
      }
      const queueData = {
        songName: limitString(parsedData.data[0].name, 16),
        songArtist: limitString(parsedData.data[0].primaryArtists, 40),
        songArt: parsedData.data[0].image[0].link,
        song_ID: songID,
      }
      localStorage.setItem('recentSong', JSON.stringify(localData));
      sessionStorage.setItem('queue', JSON.stringify(queueData));
      setQueue(queueData)
    }, 2000);
  };
  function updateSeek() {
    let music = document.getElementById("music");
    let seekBar = document.getElementById("seekBar");
    music.currentTime = seekBar.value;
  }

  function search(searchData) {
    let searchVal = "";
    if (searchData.length > 1) {
      let searchQuery = searchData.split(" ");
      for (let i = 0; i < searchQuery.length; i++) {
        if (i === searchQuery.length) {
          searchVal += searchQuery[i];
        } else {
          searchVal += searchQuery[i] + "+";
        }
      }
      setSearchQuery(searchVal);
      fetchSearchResults(searchVal);
      navigate("/explore/topresults");
      setSearchProgress(true);
    }
  }

  let debounceTimeout = null;
  function searchHandler() {
      clearTimeout(debounceTimeout); // Clear any existing timeout
      debounceTimeout = setTimeout(() => {
        let searchData = document.getElementById("searchBox").value;
        search(searchData);
      }, 1600);
  }

  function exploreSearchHandler() {
    clearTimeout(debounceTimeout); // Clear any existing timeout
    debounceTimeout = setTimeout(() => {
      let searchData = document.getElementById("searchBox").value;
      search(searchData);
    }, 1600);
  }

  function topSearchHandler(query) {
    let searchQuery = query.split(" ");
    let search = "";
    for (let i = 0; i < searchQuery.length; i++) {
      search += searchQuery[i] + "+";
    }
    setSearchQuery(search);
    fetchSearchResults(search);
    navigate("/explore/topresults");
    setSearchProgress(true);
  }
  const mountExplore = () => {
    setSearchProgress(true);
  };
  while (document.title === "-") {
    if (musicState.songTitle) {
      document.title = `${musicState.songArtist} - ${musicState.songTitle} | Rhythmie`;
    } else {
      document.title = "Rhythmie - Listen Freely";
    }
  }
  function music() {
    const music = document.getElementById("music");
    const playPause = document.getElementById("playPause");
    document.title = `${musicState.songArtist} - ${musicState.songTitle} | Rhythmie`;
    if (x % 2 === 0) {
      music.play();
      setPlayState(pause);
      currentMusicDuration();
      playPause.style.marginLeft="2px";
      playPause.style.marginRight="2px";
    } else {
      music.pause();
      setPlayState(play);
      clearInterval(interval);
      playPause.style.marginLeft="10px";
      playPause.style.marginRight="10px";
    }
    setTimeout(() => {
    }, 5000);
  }
  function handleSpace() {
    const searchBox = document.getElementById("searchBox");
    if (searchBox.value.length !== 0) {
      document.getElementById("clearBox").style.visibility = "visible";
    } else {
      document.getElementById("clearBox").style.visibility = "hidden";
    }
  }

  function playPause() {
    music();
    x++;
  }
  function setQualityDataSaving() {
    setMusicQuality(1);
    setQualityState("Quality - Ds");
    dialogBox("The quality will be applied from the next song.");
  }
  function setQualityLow() {
    setMusicQuality(2);
    setQualityState("Quality - Lo");
    dialogBox("The quality will be applied from the next song.");
  }
  function setQualityMedium() {
    setMusicQuality(3);
    setQualityState("Quality - Md");
    dialogBox("The quality will be applied from the next song.");
  }
  function setQualityHigh() {
    setMusicQuality(4);
    setQualityState("Quality - Hi");
    dialogBox("The quality will be applied from the next song.");
  }

  function buttonHandler() {
    dialogBox("Still in development!");
  }

  const [searchResult, setSearchResult] = useState({
    results: [
      {
        name: "Song Name",
        artist: "Song Artist",
        image: [{ link: defaultImg }],
        duration: "00:00",
      },
    ],
  });
  async function fetchSearchResults(searchQuery) {
    setSearchLoadingState(true);
    setSearchResult({
      results: [
        {
          image: [{ link: defaultImg }],
        },
      ],
    });
    let url = `https://saavn.me/search/all?query=${searchQuery}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResult({
          results: data.data,
        });
      });

    setSearchLoadingState(false);
    setSearchProgress(true);
  }

  function handleArtist() {
    const artistQuery = musicState.songArtist;
    let artist = "";
    artistQuery.split(" ").forEach((element) => {
      artist += element + "+";
    });
    window.open("https://genius.com/search?q=" + artist, "_blank");
  }

  const homeCardSearch = (title) => {
    search(title);
  };

  const [homeState, setHomeState] = useState({
    loading: true,
    results: {
      greeting: "Hi there.",
      new_albums: [],
    },
    homeCardTitle: "Sample title",
    homeCardImg: "https://dummyimage.com/150x150",
  });

  const fetchHomeData = async () => {
    let url = "https://saavn.me/modules?language=hindi,english";
    setHomeState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    homePageResults.push(parsedData);
    setHomeState({
      loading: false,
    });
  };

  return (
    <>
        <Sidebar
          mountExplore={mountExplore}
          queue={queue}
        />
      <div id="body">

        <Topbar
          handleSpace={handleSpace}
          searchHandler={searchHandler}
          accountButtonHandler={buttonHandler}
          mountExplore={mountExplore}
        />
        <BottomNavbar
          mountExplore={mountExplore}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              !homeState.loading && (
                <HomePage
                  searchResult={searchResult}
                  setMusic={fetchSong}
                  searchLoadingState={searchLoadingState}
                  searchProgress={searchProgress}
                  greeting={greeting}
                  results={homePageResults[0].data.trending.albums}
                  limitString={limitString}
                  homeCardSearch={homeCardSearch}
                  localData={localData}
                  likedData={likedData}
                />
              )
            }
          ></Route>
          <Route
            path="/explore/*"
            element={
              searchProgress && (
                <ExplorePage
                  searchResult={searchResult}
                  setMusic={fetchSong}
                  searchLoadingState={searchLoadingState}
                  searchProgress={searchProgress}
                  searchQuery={searchQuery}
                  results={homePageResults[0].data.albums}
                  handleTopSearch={topSearchHandler}
                  handleSpace={handleSpace}
                  searchHandler={exploreSearchHandler}
                  limitString={limitString}
                  converter={converter}
                />
              )
            }
          ></Route>
          <Route path="/mv/*" element={
            <MVPage />
          }></Route>
          <Route path="/mylibrary/*" element={<MyLibraryPage />}></Route>
          <Route path="/workinprogress/*" element={<WorkInProgress />}></Route>
        </Routes>
      </div>
        <Bottombar
          playPause={playPause}
          playState={playState}
          musicArt={musicState.musicArt}
          musicLink={musicState.musicLink}
          songTitle={musicState.songTitle}
          songArtist={musicState.songArtist}
          playerLoading={musicState.playerLoading}
          seekBar={musicState.seekBar}
          currentDuration={currentDuration}
          totalDuration={totalDuration}
          updateSeek={updateSeek}
          seekValue={seekValue}
          setQualityDataSaving={setQualityDataSaving}
          setQualityLow={setQualityLow}
          setQualityMedium={setQualityMedium}
          setQualityHigh={setQualityHigh}
          qualityState={qualityState}
          handleArtist={handleArtist}
        />
    </>
  );
}
