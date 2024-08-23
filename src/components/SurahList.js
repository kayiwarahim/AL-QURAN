import React from 'react';
import '../SurahList.css';
import surahNames from './surahNames';

const SurahList = ({ onSelectSurah }) => {
  return (
    <div className="surah-list">
      <h2>Select a Surah</h2>
      <ul>
        {surahNames.map((surahName, index) => (
          <li key={index} onClick={() => onSelectSurah((index + 1).toString().padStart(3, '0'))}>
            {index + 1}. {surahName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurahList;
