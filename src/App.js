import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import KeyListener from './KeyListener'
import GuessPanel from './GuessPanel/GuessPanel';
import AudioPlayer from './AudioPlayer';
import ScoreDisplay from './ScoreDisplay';


function App() {

  // game state
  const [hasStarted, setHasStarted] = useState(false);

  const [result, setResult] = useState("start");
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);

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
      // const result = await fetch("https://relistenapi.alecgorge.com/api/v2/artists/grateful-dead/shows/random");
      // const json = await result.json();
      // const source = await json['sources'][0];
      // const year = await json['year'].year;
      // const location = await json['venue'].name;
      //
      // // Get New Audio
      // const sets = await source['sets'];
      // const tracks = await sets[0].tracks;
      // let n_tracks = await tracks.length;
      // let random_track_n = await Math.floor(Math.random() * n_tracks)
      //
      // const track = await tracks[random_track_n];
      // const mp3_source = await track.mp3_url;
      //
      // const output_object = {songLink: mp3_source, songTitle: track.title, songDate: source.display_date, songYear: year, songLocation: location};
      //
      // setSongData(output_object)

      // 18622 - big river
      // 18552 - sugar mag
      const river_round = await fetch("https://relistenapi.alecgorge.com/api/v2/artists/grateful-dead/songs/18552");
      const json_river = await river_round.json();
      const shows = await json_river['shows'];
      let n_shows = await shows.length;
      let random_show_n = await Math.floor(Math.random() * n_shows);
      const show = await shows[random_show_n];

      let new_link = await 'https://relistenapi.alecgorge.com/api/v3/shows/' + show.uuid;
      const result = await fetch(new_link);
      const json = await result.json();
      const source = await json['sources'][0];
      const year = await json['year'].year;
      const location = await json['venue'].name;

      // Get New Audio
      const sets = await source['sets'];
      const tracks = await sets[0].tracks;
      const river_track = await tracks.filter(track => track.slug == "sugar-magnolia")[0];
      console.log(river_track);
      //let n_tracks = await tracks.length;
      //let random_track_n = await Math.floor(Math.random() * n_tracks)

      //const track = await tracks[random_track_n];
      const mp3_source = await river_track.mp3_url;

      const output_object = {songLink: mp3_source, songTitle: river_track.title, songDate: source.display_date, songYear: year, songLocation: location};
      setSongData(output_object)
    }

    if(hasStarted & result == "new_round") {
      // reset to new round when status won to lost
      fetchSong();
      setOldGuesses([]);
      setGuess("19");
      setResult("playing");
    }
    else{
      setHasStarted(true);
    }
  }, [result]);

  const updateTrueYear = (newTrueYear) => {
    setTrueYear(newTrueYear);
  }

  useEffect(() => {
    if(hasGuessed == true) {
      if(result == "start") {
        // This runs the first time through
        setResult("new_round");
        setDisplayScore(true);
        setHasGuessed(false);
      }
      if(result == "won") {
        setResult("new_round");
        setHasGuessed(false)
      }
      if(result == "lost") {
        setResult("new_round");
        setHasGuessed(false);
      }
      else {
        if(guess.length == 4) {
          setOldGuesses(previous_guesses => [...previous_guesses, guess]);
          setGuess("19");
          if(guess == songData.songYear) {
            setResult("won");
            setScore(score + 4 - (oldGuesses.length + 1));
          }
          else if(oldGuesses.length + 1 == 3) {
            setResult("lost");
          }
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
      <ScoreDisplay score={score} display={displayScore}/>
      <AudioPlayer songLink={songData.songLink}/>
      <GuessPanel guess={guess} hasStarted={hasStarted} hasGuessed={hasGuessed} oldGuesses={oldGuesses} trueYear={songData.songYear} result={result} songData={songData}/>
      <KeyListener handleKeyUp={handleKeyUp} />
    </div>
  );

}

export default App;
