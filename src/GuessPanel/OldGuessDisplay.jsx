import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function OldGuessDisplay(props) {

		return(
			props.oldGuesses.map((guess) => (
				<div className="date-row">
					{[0, 1, 2, 3].map((i) => (
							// <div key={guess + i} className={guess.charAt(i) == props.trueYear.charAt(i) ? "date-box date-box-correct" : "date-box date-box-old"}>
							// 	{guess.charAt(i)}
							// </div>
							<div key={guess + i} className={guess === props.trueYear ? "date-box date-box-old color-correct" : Math.abs(guess - props.trueYear) < 3 ? "date-box date-box-old color-close" : "date-box date-box-old color-far"}>
								{guess.charAt(i)}
							</div>
					))}
				</div>
			))
		)
}

export default OldGuessDisplay;
