import React from 'react';
import '../styles/HomePage.css';

function HomePageCards(props) {
  return (
    <div key={props.id} onClick={() => props.homeCardSearch(props.homeCardTitle)} className="homeCard">
      <img id="homeCardImg" src={props.homeCardImg} alt="Card" />
      <div id="homeCardTitle" dangerouslySetInnerHTML={{ __html: props.homeCardTitle }}></div>
    </div>
  );
}

export default HomePageCards;
