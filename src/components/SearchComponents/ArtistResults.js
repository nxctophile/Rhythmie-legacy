import React from 'react'
import '../../styles/ExplorePage.css'
import SearchLoading from '../SearchLoading';
import ArtistSearchResults from './ArtistSearchResults';

function ArtistResults(props) {
  return (
    <>
    {props.searchLoadingState &&
        <SearchLoading
            margin="25vh"
        />
    }
    {!props.searchLoadingState &&
        <section className="topSearchResults" id="topResultsSongs">
                    {props.searchResult.results.results.map(element => {
                        return (
                            <ArtistSearchResults
                                artistName={props.limitString(element.name, 22)}
                                artistProfile={element.image[0].link}
                                artistDescription={element.role}
                                artistID={element.id}
                                theme={props.theme}
                                textColor={props.textColor}
                                boxColor={props.boxColor}
                                playMusic={props.playMusic}
                            />
                        )
                    })
                    }
            <hr style={{width: '15%'}} id="resultsHr" />
        </section>
    }
    </>
  )
}

export default ArtistResults