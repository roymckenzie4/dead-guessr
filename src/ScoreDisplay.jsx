import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function ScoreDisplay({score, display}) {
  if(display == true) {
    return(
      <div>
      <div className="score-text">
        Score: {score}
      </div>
      </div>
    );
  }
  else {
    return(
      <div>
      </div>
    )
  }
}

export default ScoreDisplay;
