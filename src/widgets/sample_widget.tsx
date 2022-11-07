import { usePlugin, renderWidget, useTracker } from '@remnote/plugin-sdk';
import { useState } from 'react';
import CountdownTimer from '../components/CountdownTimer';

export const SampleWidget = () => {
  const plugin = usePlugin();
  const [isFlashCardOpen, setIsFlashCardOpen] = useState();

  let seconds: number = useTracker(() => plugin.settings.getSetting<string>('seconds'));

  const THREE_DAYS_IN_MS: number = 1000 * seconds;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const url = plugin.window.getURL().then((urlData) => {
    setIsFlashCardOpen(urlData.includes('/flashcards'));
  });

  if (!isFlashCardOpen) {
    return (
      <div>
        <h1>Flashcard Timer</h1>
        <p>Open flashcard to start timer</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Flashcard Timer</h1>
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
      </div>
    );
  }
};

renderWidget(SampleWidget);
