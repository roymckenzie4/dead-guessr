import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import OldGuessDisplay from './OldGuessDisplay'
import GuessSelector from './GuessSelector'


function GuessPanel({ guess, hasStarted, hasGuessed, oldGuesses, trueYear, result, songData}) {

	return(
    <div>
		<div className="box">
    <OldGuessDisplay oldGuesses={oldGuesses} trueYear={trueYear}/>
    </div>
    <div>
		<GuessSelector hasStarted={hasStarted} currentGuess={guess} result={result} songData={songData}/>
		</div>
    </div>
	);
}

export default GuessPanel;
