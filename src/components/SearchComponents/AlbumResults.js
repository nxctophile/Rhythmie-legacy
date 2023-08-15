import React from 'react'
import '../../styles/ExplorePage.css'
import SearchLoading from '../SearchLoading';
import AlbumSearchResults from './AlbumSearchResults';

function AlbumResults(props) {
  return (
    <>
      <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Albums</div>
    {props.searchLoadingState &&
        <SearchLoading
            margin="25vh"
        />
    }
    {!props.searchLoadingState &&
        <section className="topSearchResults" id="topResultsSongs">
            {props.searchResult.results.results.map(element => {
                return (
                    <AlbumSearchResults
                        albumName={props.limitString(element.name, 22)}
                        albumArtist={element.primaryArtist}
                        albumArt={element.image[0].link}
                        albumID={element.id}
                        theme={props.theme}
                        textColor={props.textColor}
                        boxColor={props.boxColor}
                        searchAlbum={props.searchAlbum}
                    />
                )
            })
            }
            <div style={{color: props.textColor}} id="seeMore">
                See more results
            </div>
            <hr style={{width: '15%'}} id="resultsHr" />
        </section>
    }
    </>
  )
}

export default AlbumResults