import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import AudioPlayer from './components/AudioPlayer';
import SurahList from './components/SurahList';
import surahNames from './components/surahNames'; // Import the list of surahs

function App() {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleSelectSurah = (surahNumber) => {
    setSelectedSurah(surahNumber);
    setCurrentIndex(surahNames.indexOf(surahNumber) + 1);
  };

  const handlePrevious = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    setSelectedSurah((newIndex + 1).toString().padStart(3, '0'));
  };

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, surahNames.length - 1);
    setCurrentIndex(newIndex);
    setSelectedSurah((newIndex + 1).toString().padStart(3, '0'));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>AL-QURAN</h1>
      </header>
      <div className="container">
        <SurahList onSelectSurah={handleSelectSurah} />
        {selectedSurah && (
          <AudioPlayer
            audioSrc={`/audio/${selectedSurah}.mp3`} // Ensure audioSrc is correct
            surahNumber={selectedSurah}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}

export default App;
