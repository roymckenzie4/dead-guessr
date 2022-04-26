import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function GuessSelector(props) {

  if(!props.wonRound) {
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
  else {
    if(props.songData.songYear == null){
      return(
        <div className="text">
          Hit Enter to Begin
        </div>
      );
    }
    else{
      return(
        <div className="text">
          Yes! It was {props.songData.songTitle} from  {props.songData.songDate}  at {props.songData.songLocation}<br></br>
          Hit enter to play again...
        </div>
      )
    }
  }

}

export default GuessSelector;
