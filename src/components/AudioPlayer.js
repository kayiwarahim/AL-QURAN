import React, { useState, useRef, useEffect } from 'react';
import '../App.css'; // Import the CSS file
import surahNames from './surahNames';

const AudioPlayer = ({ surahNumber, onPrevious, onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // CaudioSrc, surahNumber, onPrevious, onNext onstruct audio source URL based on surahNumber
  const audioSrc = `/audio/${surahNumber}.mp3`;

  // Update audio source when surahNumber changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
    }
  }, [audioSrc, surahNumber]);

  const playAudio = async () => {
    try {
      await audioRef.current.play();
      console.log('Playback started successfully');
    } catch (error) {
      console.error('Error during playback: ', error);
    }
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  let debounceTimer;
  const debouncePlayPause = (action, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (action === 'play') {
        playAudio();
      } else if (action === 'pause') {
        pauseAudio();
      }
    }, delay);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      debouncePlayPause('pause', 200);
    } else {
      debouncePlayPause('play', 200);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      <h2>Surah {surahNames[surahNumber - 1]}</h2>
      <audio ref={audioRef} controls>
        Your browser does not support the audio element.
      </audio>
      <div className="controls">
        <button onClick={onPrevious}>Previous</button>
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default AudioPlayer;
