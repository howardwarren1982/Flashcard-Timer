//in tesing

import React from 'react';

interface SoundProps {
  time: number;
  triggerTime: number;
  audioPath: string;
}

const Sound: React.FC<SoundProps> = ({ time, triggerTime, audioPath }) => {
  const audio = new Audio('https://api.dictionaryapi.dev/media/pronunciations/en/royal-us.mp3');
  audio.autoplay = true;
  audio.muted = true;

  if (time === triggerTime) {
    audio.muted = false;
    audio.play();
  }

  return null;
};

export default Sound;
