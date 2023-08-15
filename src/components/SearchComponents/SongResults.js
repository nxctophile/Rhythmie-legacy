import React from 'react'
import '../../styles/ExplorePage.css'
import SearchResults from './SearchResults';
import SearchLoading from '../SearchLoading';

function SongResults(props) {



  return (
    <>
      <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Songs</div>
    {props.searchLoadingState &&
        <SearchLoading
            margin="25vh"
        />
    }
    {!props.searchLoadingState &&
        <section className="topSearchResults" id="topResultsSongs">
            {props.searchResult.results.results.map(element => {
                return (
                    <SearchResults
                        songName={props.limitString(element.name, 40)}
                        songArtist={props.limitString(element.primaryArtists, 30)}
                        musicArt={element.image[0].link}
                        songID={element.id}
                        songDuration={props.converter(element.duration)}
                        theme={props.theme}
                        textColor={props.textColor}
                        boxColor={props.boxColor}
                        playMusic={props.playMusic}
                    />
                )
            })
            }
            <div style={{color: props.textColor}} id="seeMore">
                See more results
            </div>
          <div style={{width: '15%'}} id="resultsHr"></div>
        </section>
    }
    </>
  )
}

export default SongResults