import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function GuessSelector(props) {

  if(props.result === "playing") {
  	return (
  		<div className="date-row">
  			{[0, 1, 2, 3].map((i) => (
  				<div key={i} className="date-box">
  					{props.currentGuess.charAt(i)}
  				</div>
  			))}
  		</div>
  	)
  }
  else if(props.result === "start"){
    // this is the case at the beginning
    return(
      <div>
      <div className="text">
        <span> hit enter to begin </span>
        <span style={{fontSize: '2rem'}}> correct answers shown in <span className="color-correct">green</span></span>
        <span style={{fontSize: '2rem'}}> guesses within three years are shown in <span className="color-close">yellow</span></span>
        <span style={{fontSize: '2rem'}}> other guesses are shown in <span className="color-far">red</span></span>
      </div>
      </div>
    );
  }
  else if (props.result === "won"){
    // this is the case i
    return(
      <div className="text">
        Yes! It was {props.songData.songTitle} from  {props.songData.songDate}  at {props.songData.songLocation}<br></br>
        Hit enter to play again...
      </div>
    );
  }
  else if (props.result === "lost"){
    return(
      <div className="text">
        Not quite... It was {props.songData.songTitle} from  {props.songData.songDate}  at {props.songData.songLocation}<br></br>
        Hit enter to play again...
      </div>
    );
  }
  else {
    return(
      <div>
      </div>
    );
  }
}

export default GuessSelector;
