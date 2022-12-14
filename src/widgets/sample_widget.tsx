import {
  usePlugin,
  renderWidget,
  useTracker,
  useAPIEventListener,
  AppEvents,
} from '@remnote/plugin-sdk';
import { useState } from 'react';
import CountdownTimer from '../components/CountdownTimer';

export const SampleWidget = () => {
  const plugin = usePlugin();
  const [isFlashCardOpen, setIsFlashCardOpen] = useState<boolean>();
  const [isAnswerReveal, setIsAnswerReveal] = useState<boolean>();
  const [isQueueCardComplete, setQueueCardComplete] = useState<boolean>();
  // const [seenCards] = useSessionStorageState('seenCards', 0);

  useAPIEventListener(AppEvents.RevealAnswer, undefined, async () => {
    setIsAnswerReveal(true);
    setQueueCardComplete(false);
  });

  useAPIEventListener(AppEvents.QueueCompleteCard, undefined, async () => {
    setIsAnswerReveal(false);
    setQueueCardComplete(true);
  });

  let seconds: string | undefined = useTracker(() => plugin.settings.getSetting<string>('seconds'));

  const THREE_DAYS_IN_MS: number = 1000 * Number(seconds);
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
  } else if (isAnswerReveal) {
    return (
      <div>
        <h1>Flashcard Timer will start on next card</h1>
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

//queue__badge     rn-queue__card-counter
