
import React, { useEffect, useState } from 'react'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import './styles/App.css';
import Bottombar from './components/Bottombar';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import play from './resources/play.png';
import pause from './resources/pause.png';
import defaultImg from './resources/default.png';
import HomePage from './components/HomePage';
import hello from './resources/hello.png';
import themeOn from './resources/themeOn.png';
import themeOff from  './resources/themeOff.png';
import ExplorePage from './components/ExplorePage';
import './styles/Sidebar.css';
import WorkInProgress from './components/WorkInProgress';
import BottomNavbar from './components/BottomNavbar';

let x = 0
let t = 0;
let interval;
let homePageResults = [];
export default function App() {

  useEffect(() => {
    // Update the document title using the browser API
    if (window.location.href.includes('explore')) {
      document.getElementsByClassName('navMenuItem')[0].id="";
      document.getElementsByClassName('navMenuItem')[1].id="active";
      document.getElementsByClassName('navMenuItem')[2].id="";
      document.getElementsByClassName('navMenuItem')[3].id="";
      document.getElementsByClassName('navMenuItem')[4].id="";
      document.getElementsByClassName('bottomNavMenuItem')[0].id="";
      document.getElementsByClassName('bottomNavMenuItem')[1].id="active";
      document.getElementsByClassName('bottomNavMenuItem')[2].id="";
      document.getElementsByClassName('bottomNavMenuItem')[3].id="";
      document.getElementsByClassName('bottomNavMenuItem')[4].id="";
    }
    else if (window.location.href.includes('trending')) {
      document.getElementsByClassName('navMenuItem')[0].id="";
      document.getElementsByClassName('navMenuItem')[1].id="";
      document.getElementsByClassName('navMenuItem')[2].id="active";
      document.getElementsByClassName('navMenuItem')[3].id="";
      document.getElementsByClassName('navMenuItem')[4].id="";
      document.getElementsByClassName('bottomNavMenuItem')[0].id="active";
      document.getElementsByClassName('bottomNavMenuItem')[1].id="";
      document.getElementsByClassName('bottomNavMenuItem')[2].id="";
      document.getElementsByClassName('bottomNavMenuItem')[3].id="";
      document.getElementsByClassName('bottomNavMenuItem')[4].id="";
    }
    else if (window.location.href.includes('topcharts')) {
      document.getElementsByClassName('navMenuItem')[0].id="";
      document.getElementsByClassName('navMenuItem')[1].id="";
      document.getElementsByClassName('navMenuItem')[2].id="";
      document.getElementsByClassName('navMenuItem')[3].id="active";
      document.getElementsByClassName('navMenuItem')[4].id="";
      document.getElementsByClassName('bottomNavMenuItem')[0].id="";
      document.getElementsByClassName('bottomNavMenuItem')[1].id="";
      document.getElementsByClassName('bottomNavMenuItem')[2].id="";
      document.getElementsByClassName('bottomNavMenuItem')[3].id="active";
      document.getElementsByClassName('bottomNavMenuItem')[4].id="";
    }
    else if (window.location.href.includes('mylibrary')) {
      document.getElementsByClassName('navMenuItem')[0].id="";
      document.getElementsByClassName('navMenuItem')[1].id="";
      document.getElementsByClassName('navMenuItem')[2].id="";
      document.getElementsByClassName('navMenuItem')[3].id="";
      document.getElementsByClassName('navMenuItem')[4].id="active";
      document.getElementsByClassName('bottomNavMenuItem')[0].id="";
      document.getElementsByClassName('bottomNavMenuItem')[1].id="";
      document.getElementsByClassName('bottomNavMenuItem')[2].id="";
      document.getElementsByClassName('bottomNavMenuItem')[3].id="";
      document.getElementsByClassName('bottomNavMenuItem')[4].id="active";
    }
    else {
      document.getElementsByClassName('navMenuItem')[0].id="active";
      document.getElementsByClassName('navMenuItem')[1].id="";
      document.getElementsByClassName('navMenuItem')[2].id="";
      document.getElementsByClassName('navMenuItem')[3].id="";
      document.getElementsByClassName('navMenuItem')[4].id="";
      document.getElementsByClassName('bottomNavMenuItem')[0].id="";
      document.getElementsByClassName('bottomNavMenuItem')[1].id="";
      document.getElementsByClassName('bottomNavMenuItem')[2].id="active";
      document.getElementsByClassName('bottomNavMenuItem')[3].id="";
      document.getElementsByClassName('bottomNavMenuItem')[4].id="";
    }
  });
  useEffect(() => {
    fetchHomeData();
  }, []);


  const navigate = useNavigate();
  const [playState, setPlayState] = useState(play);
  const [seekValue, setSeekValue] = useState("0");
  const [musicQuality, setMusicQuality] = useState(3);
  const [qualityState, setQualityState] = useState("Quality - MD");
  const [musicState, setMusicState] = useState({
    musicArt: hello,
    musicLink: '',
    songTitle: '',
    songArtist: '',
    playerLoading: false,
    seekBar: false
  });
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");
  const [themeState, setThemeState] = useState(themeOff);
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchLoadingState, setSearchLoadingState] = useState(false);
  const [searchProgress, setSearchProgress] = useState(false);

  function dialogBox (message) {
    const dialog = document.getElementById("dialogBox");
    const dialogText = document.getElementById("dialogText");
    dialog.style.display = "block";
    dialogText.innerHTML = message;
    setTimeout(() => {
      dialog.style.display = "none";
    }, 3000);
  }




  function converter (value) {
    let val = Math.round(value);
    const h = Math.floor(val / 3600);
    const m = Math.floor(val % 3600 / 60);
    const s = Math.floor(val % 3600 % 60);
    const hours = h > 0 ? h + ':' : "";
    const minutes = m > 0 ? (m<10 ? '0'+m : m) + ':' : "00:";
    const seconds = s > 0 ? (s<10 ? '0'+s : s) : "00";
    let duration = hours + minutes + seconds
    return duration;
  }


  function limitString(str, limit) {
    
    if (str.length > limit) {
      return str.slice(0, limit) + '...';
    } else {
      return str;
    }
  }

  function musicDuration() {
    let totalMusicDuration = document.getElementById("music").duration;
    setTotalDuration(converter(totalMusicDuration));
  }
  function currentMusicDuration () {
    const music = document.getElementById("music");
    let seekBar = document.getElementById("seekBar");
    let totalMusicDuration = document.getElementById("music").duration;
    seekBar.max = totalMusicDuration;
    interval = setInterval(() => {
      let currentDuration = document.getElementById("music").currentTime;
      setCurrentDuration(converter(currentDuration));
      setSeekValue(currentDuration);
      musicDuration();
      if ((currentDuration-10) >= totalMusicDuration) {
        music.pause();
        setPlayState(play);
        clearInterval(interval);
      }
    }, 500);
  }
  const fetchSong = async (songID) => {
    let url = `https://saavn.me/songs?id=${songID}`;
    setMusicState({
      musicArt: defaultImg,
      playerLoading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    setMusicState({
      musicArt: parsedData.data[0].image[1].link,
      musicLink: parsedData.data[0].downloadUrl[musicQuality].link,
      songTitle: limitString(parsedData.data[0].name, 18),
      songArtist: limitString(parsedData.data[0].primaryArtists, 15),
      playerLoading: false,
      seekBar: true,
      duration: parsedData.data[0].duration
    });
    setPlayState(play);
    setTimeout(() => {
      music();
      x++;
      document.title = `${musicState.songArtist} - ${musicState.songTitle}`;
    }, 2000)

  }
  function updateSeek() {
    let music = document.getElementById("music");
    let seekBar = document.getElementById("seekBar");
    music.currentTime = seekBar.value;
  }

  function search(searchData) {
    let searchVal = '';
      if (searchData.length > 1) {
        let searchQuery = searchData.split(' ');
          for (let i = 0 ; i < searchQuery.length ; i++) {
            if (i === searchQuery.length) {
              searchVal += searchQuery[i];
            } else {
              searchVal += searchQuery[i] + '+';
            }
        }
        setSearchQuery(searchVal);
        fetchSearchResults(searchVal);
        navigate('/explore/topresults');
        setSearchProgress(true);
      }
  }


let temp = 0;
  function searchHandler() {
    if (temp === 1 || temp % 7 === 0)
    setTimeout(() => {
      let searchData = document.getElementById('searchBox').value;
      search(searchData)
    }, 2000);
    temp++;
    console.log(temp);
  }
  function exploreSearchHandler() {
    if (temp === 1 || temp % 7 === 0)
    setTimeout(() => {
      let searchData = document.getElementById('exploreSearchBox').value;
      search(searchData)
    }, 2000);
    temp++;
    console.log(temp);
  }



  function topSearchHandler(query) {
    let searchQuery = query.split(' ');
    let search = '';
    for (let i = 0 ; i < searchQuery.length ; i++) {
      search += searchQuery[i] + '+'
    }
    setSearchQuery(search);
    fetchSearchResults(search);
    navigate('/explore/topresults');
    setSearchProgress(true);
  }
  const mountExplore = () => {
    setSearchProgress(true);
  }
  while(document.title === '-') {
    if (musicState.songTitle) {
      document.title = `${musicState.songArtist} - ${musicState.songTitle} | Rhythmie`;
    }
    else {
      document.title = "Rhythmie - Listen Freely";
    }
  }
  function music() {
    const music = document.getElementById("music");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    document.title = `${musicState.songArtist} - ${musicState.songTitle} | Rhythmie`;
    // while (document.title !== `${musicState.songArtist} - ${musicState.songTitle} | Rhythmie`) {
    // }
    if (x % 2 === 0) {
      music.play();
      setPlayState(pause);
      currentMusicDuration();
      prevButton.style.marginRight = "10px"
      nextButton.style.marginLeft = "10px"
    }
    else {
      music.pause();
      setPlayState(play);
      clearInterval(interval);
      prevButton.style.marginRight = "20px"
      nextButton.style.marginLeft = "20px"
    }
  }
  function handleSpace () {
    const searchBox = document.getElementById("searchBox");
    if (searchBox.value.length !== 0) {
      document.getElementById("clearBox").style.visibility = "visible";
    }
    else {
      document.getElementById("clearBox").style.visibility = "hidden";
    }
  }

  function playPause() {
    music();
    x++;
  }
  function setQualityDataSaving () {
    setMusicQuality(1);
    setQualityState("Quality - Ds");
    dialogBox("The quality will be applied from the next song.")
  }
  function setQualityLow () {
    setMusicQuality(2);
    setQualityState("Quality - Lo");
    dialogBox("The quality will be applied from the next song.");
  }
  function setQualityMedium () {
    setMusicQuality(3);
    setQualityState("Quality - Md");
    dialogBox("The quality will be applied from the next song.");
  }
  function setQualityHigh () {
    setMusicQuality(4);
    setQualityState("Quality - Hi");
    dialogBox("The quality will be applied from the next song.");
  }
  
  function buttonHandler () {
    dialogBox("Still in development!");
  }

  const dark = '#111';
  const light = '#fff';
  const [theme, setTheme] = useState(light);
  const [textColor, setTextColor] = useState(dark);
  const [searchBoxTheme, setSearchBoxTheme] = useState('#fff');
  const [bottomBarShadow, setBottomBarShadow] = useState('0 0 15px #999');
  const [bottomBarTheme, setBottomBarTheme] = useState('#dedede');
  const [seekBarTheme, setSeekBarTheme] = useState('#aaa');
  const [musicArtTheme, setMusicArtTheme] = useState('0 0 7px #000');
  const [searchResultTheme, setSearchResultTheme] = useState('#eee');
  // const [themePersistentState, setThemePersistentState] = useState(0);
  // let t = themePersistentState;
  // useEffect(() => {
  //   themeButton();
  // }, t)
  

  function themeButton() {
    const body = document.querySelector("body");
    if(t % 2 === 0) {
      setThemeState(themeOn);
      setTheme(dark);
      setTextColor(light);
      setSearchBoxTheme('#222');
      setSearchResultTheme('#222');
      setBottomBarTheme(dark);
      setBottomBarShadow('0 0 15px #333');
      setSeekBarTheme('#333');
      setMusicArtTheme('0 0 10px #333');
      body.style.background = dark;
      body.style.color = light;
    }
    else {
      setThemeState(themeOff);
      setTheme(light);
      setTextColor(dark);
      setSearchBoxTheme('#fff');
      setSearchResultTheme('#eee');
      setBottomBarTheme('#dedede');
      setBottomBarShadow('0 0 15px #999');
      setSeekBarTheme('#aaa');
      setMusicArtTheme('0 0 7px #000');
      body.style.background = light;
      body.style.color = dark;
    }
    t++;
    // setThemePersistentState(t++);
  }



  const [searchResult, setSearchResult] = useState({
    results: [{
        name: "Song Name",
        artist: "Song Artist",
        image:[{link: defaultImg}],
        duration: '00:00'
    }
    ]
  })
  async function fetchSearchResults(searchQuery) {
      setSearchLoadingState(true);
      setSearchResult({
        results: [{
          image:[{link: defaultImg}]
        }]
      });
        let url = `https://saavn.me/search/all?query=${searchQuery}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => {
              setSearchResult({
                results: data.data
              });
            });

      setSearchLoadingState(false);
      setSearchProgress(true);
  }

  function handleArtist() {
    const artistQuery = musicState.songArtist;
    let artist = ''
    artistQuery.split(' ').forEach((element) => {
      artist += element + '+';
    })
    window.open(
      "https://duckduckgo.com/?q=" + artist,
      '_blank'
    );
  }

  const homeCardSearch = (title) => {
    search(title)
  }


    const [homeState, setHomeState] = useState({
      loading: true,
      results: {
          greeting: "Hi there.",
          new_albums:[]
      },
      homeCardTitle: "Sample title",
      homeCardImg: "https://dummyimage.com/150x150"
    })


     const fetchHomeData = async () => {
      let url = "https://saavn.me/modules?language=hindi,english";
      setHomeState({
          loading: true
      });
      let data = await fetch(url);
      let parsedData = await data.json();

      homePageResults.push(parsedData);
      setHomeState({
        loading: false
      });

    }






  return (
    <>
      <div id="body">
        
        <Sidebar
          theme={theme}
          textColor={textColor}
          mountExplore={mountExplore}
        />


        <Topbar
          handleSpace={handleSpace}
          searchHandler={searchHandler}
          accountButtonHandler={buttonHandler}
          themeState={themeState}
          themeButton={themeButton}
          theme={theme}
          textColor={textColor}
          searchBoxTheme={searchBoxTheme}
          mountExplore={mountExplore}
        />
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
          theme={theme}
          textColor={textColor}
          bottomBarShadow={bottomBarShadow}
          seekBarTheme={seekBarTheme}
          musicArtTheme={musicArtTheme}
          bottomBarTheme={bottomBarTheme}
          handleArtist={handleArtist}
        />
        <BottomNavbar
          theme={theme}
          textColor={textColor}
          mountExplore={mountExplore}
        />
        <Routes>
          <Route exact path="/" element={
            !homeState.loading &&
              <HomePage
                theme={theme}
                textColor={textColor}
                boxColor={searchResultTheme}
                searchResult={searchResult}
                setMusic={fetchSong}
                searchLoadingState={searchLoadingState}
                searchProgress={searchProgress}
                greeting={"Hi There."}
                results={homePageResults[0].data.trending.albums}
                limitString={limitString}
                homeCardSearch={homeCardSearch}
              />
          }>
          </Route>
          <Route path="/explore/*" element={
            searchProgress && 
              <ExplorePage
                theme={theme}
                textColor={textColor}
                boxColor={searchResultTheme}
                searchResult={searchResult}
                setMusic={fetchSong}
                searchLoadingState={searchLoadingState}
                searchProgress={searchProgress}
                searchQuery={searchQuery}
                results={homePageResults[0].data.albums}
                handleTopSearch={topSearchHandler}
                searchBoxTheme={searchBoxTheme}
                handleSpace={handleSpace}
                searchHandler={exploreSearchHandler}
                limitString={limitString}
              />
          }>
          </Route>
          <Route path="/trending/*" element={
              <WorkInProgress />
          }>
          </Route>
          <Route path="/topcharts/*" element={
              <WorkInProgress />
          }>
          </Route>
          <Route path="/mylibrary/*" element={
              <WorkInProgress />
          }>
          </Route>
          <Route path="/workinprogress/*" element={
              <WorkInProgress />
          }>
          </Route>
        </Routes>
      </div>
    </>
  )
}