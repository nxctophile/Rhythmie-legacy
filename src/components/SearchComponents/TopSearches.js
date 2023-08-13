import React from 'react'

function TopSearches(props) {
  return (
    <>
    <div style={{color: props.textColor}} onClick={() => props.handleTopSearch(props.title)} id="topSearches">
        <span id="topSearchesIcon" className="material-symbols-outlined">
            trending_up
        </span>
        <div id="topSearch">
            {props.title}
        </div>
     </div>
    </>
  )
}

export default TopSearches