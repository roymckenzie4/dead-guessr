import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import OldGuessDisplay from './OldGuessDisplay'
import GuessSelector from './GuessSelector'


function GuessPanel({ guess, hasStarted, hasGuessed, oldGuesses, trueYear, wonRound, songData}) {

	return(
    <div>
		<div className="box">
    <OldGuessDisplay oldGuesses={oldGuesses} trueYear={trueYear}/>
    </div>
    <div>
		<GuessSelector hasStarted={hasStarted} currentGuess={guess} wonRound={wonRound} songData={songData}/>
		</div>
    </div>
	);
}

export default GuessPanel;
