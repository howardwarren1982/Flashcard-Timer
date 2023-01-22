import {
  usePlugin,
  renderWidget,
  useTracker,
  useAPIEventListener,
  AppEvents,
} from '@remnote/plugin-sdk';
import { useState } from 'react';
import CountdownTimer from '../components/CountdownTimer';
import useShowTimerLogic from '../hooks/useShowTimerLogic';

export const SampleWidget = () => {
  const plugin = usePlugin();
  const {
    isFlashCardOpen,
    isAnswerReveal,
    isQueueCardLoaded,
    setIsFlashCardOpen,
    setQueueCardLoaded,
  } = useShowTimerLogic();

  let seconds: string | undefined = useTracker(() => plugin.settings.getSetting<string>('seconds'));

  const THREE_DAYS_IN_MS: number = 1000 * Number(seconds);
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  plugin.window.getURL().then((urlData) => {
    setIsFlashCardOpen(urlData.includes('/flashcards'));
  });
  if (isQueueCardLoaded) {
    if (!isFlashCardOpen) {
      return (
        <div>
          <h1>Flashcard Timer</h1>
          <p>Open flashcard to start timer</p>
        </div>
      );
    } else if (isAnswerReveal) {
      setQueueCardLoaded(false);
    } else {
      return (
        <div>
          <h1>Flashcard Timer</h1>
          <CountdownTimer targetDate={dateTimeAfterThreeDays} />
        </div>
      );
    }
  } else {
    return (
      <div>
        <h1>Waiting...</h1>
      </div>
    );
  }
};

renderWidget(SampleWidget);

//queue__badge     rn-queue__card-counter

// const [isFlashCardOpen, setIsFlashCardOpen] = useState<boolean>();
// const [isAnswerReveal, setIsAnswerReveal] = useState<boolean>();
// const [isQueueCardLoaded, setQueueCardLoaded] = useState<boolean>(true);

// useAPIEventListener(AppEvents.RevealAnswer, undefined, async () => {
//   setIsAnswerReveal(true);
// });

// useAPIEventListener(AppEvents.QueueCompleteCard, undefined, async () => {
//   setIsAnswerReveal(false);
//   setQueueCardLoaded(false);
// });

// useAPIEventListener(AppEvents.QueueLoadCard, undefined, async () => {
//   setQueueCardLoaded(true);
// });

// useAPIEventListener(AppEvents.QueueEnter, undefined, async () => {
//   setQueueCardLoaded(true);
// });

// useAPIEventListener(AppEvents.QueueExit, undefined, async () => {
//   setQueueCardLoaded(true);
// });
