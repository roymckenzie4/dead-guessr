import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function KeyListener(props) {

  useEffect(() => {
    const handleKeyUp = (e) => {
      props.handleKeyUp(e);
    }
    window.document.addEventListener('keyup', handleKeyUp);
    return () => {
      window.document.removeEventListener('keyup', handleKeyUp);
    }
  }, []);

  return(
    null
  );
}

export default KeyListener;
