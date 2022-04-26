import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function AudioPlayer(props) {

	const audioRef = useRef(new Audio(props.songLink));
	const isReady = useRef(false);

	useEffect(() => {
		if(isReady.current) {
			audioRef.current.pause();
			audioRef.current = new Audio(props.songLink);
			audioRef.current.play();
		} else {
			isReady.current = true;
		}
	}, [props.songLink]);

	return (
		<div>
			<div className="play-button">
				<img src={"./stealie.png"} alt="" style={{'width':'150px'}} />
			</div>
		</div>
	);
}

export default AudioPlayer;
