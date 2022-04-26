import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import KeyListener from './KeyListener'
import GuessPanel from './GuessPanel/GuessPanel';
import AudioPlayer from './AudioPlayer';


function App() {

  // game state
  const [hasStarted, setHasStarted] = useState(false);
  const [wonRound, setWonRound] = useState(true);

  // song state
  const [trueYear, setTrueYear] = useState("");
  const [songNumber, setSongNumber] = useState("0");
  const [songData, setSongData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false)

  // guess state
  const [guess, setGuess] = useState("19");
  const [oldGuesses, setOldGuesses] = useState([]);
  const [hasGuessed, setHasGuessed] = useState(false);

  useEffect(() => {

    const fetchSong = async (props) => {
      const result = await fetch("https://api.relisten.net/api/v2/artists/grateful-dead/shows/random");
      const json = await result.json();
      const source = await json['sources'][0];
      const year = await json['year'].year;
      const location = await json['venue'].name;

      // Get New Audio
      const sets = await source['sets'];
      const tracks = await sets[0].tracks;
      let n_tracks = await tracks.length;
      let random_track_n = await Math.floor(Math.random() * n_tracks)

      const track = await tracks[random_track_n];
      const mp3_source = await track.mp3_url;

      const output_object = {songLink: mp3_source, songTitle: track.title, songDate: source.display_date, songYear: year, songLocation: location};

      setSongData(output_object)
    }

    if(hasStarted & !wonRound) {
      // reset to new round when status changes from true to false
      fetchSong();
      setOldGuesses([]);
      setGuess("19");
    }
    else{
      setHasStarted(true);
    }
  }, [wonRound])

  const updateTrueYear = (newTrueYear) => {
    setTrueYear(newTrueYear);
  }

  useEffect(() => {
    if(hasGuessed == true) {
      if(wonRound == true) {
        setWonRound(false);
        setHasGuessed(false);
      }
      else {
        if(guess == songData.songYear) {
          setWonRound(true);
        }
        if(guess.length == 4) {
          setOldGuesses(previous_guesses => [...previous_guesses, guess]);
          setGuess("19")
        }
        setHasGuessed(false);
      }
    }
  }, [hasGuessed]);

  // handle io
  const handleKeyUp = (e) => {
    if(/^[0-9]/.test(e.key)) {
      addGuessDigit(e.key)
    }
    if(/^Backspace$/.test(e.key)) {
      removeGuessDigit()
    }
    if(/^Enter$/.test(e.key)) {
      enterGuess();
    }
  }

  const addGuessDigit = (newGuessDigit, guessLength) => {
		setGuess(previous_guess => previous_guess.length < 4 ? previous_guess + newGuessDigit : previous_guess)
	}

	const removeGuessDigit = () => {
		setGuess(previous_guess => previous_guess.length > 2 ? previous_guess.slice(0, -1) : previous_guess)
	}

	const enterGuess = () => {
    setHasGuessed(true);
	}

  return(
    <div>
      <AudioPlayer songLink={songData.songLink}/>
      <GuessPanel guess={guess} hasStarted={hasStarted} hasGuessed={hasGuessed} oldGuesses={oldGuesses} trueYear={songData.songYear} wonRound={wonRound} songData={songData}/>
      <KeyListener handleKeyUp={handleKeyUp} />
    </div>
  );

}

export default App;
