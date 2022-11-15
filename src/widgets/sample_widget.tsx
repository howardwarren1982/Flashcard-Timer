import {
  usePlugin,
  renderWidget,
  useTracker,
  useAPIEventListener,
  AppEvents,
} from '@remnote/plugin-sdk';
import { useState } from 'react';
import CountdownTimer from '../components/CountdownTimer';

// plugin.event.addListener(AppEvents.RevealAnswer, undefined, async (data) => {
//   console.log('answer revealed');
//   console.log(data);
//   const floatingWidgetId = await plugin.window.openWidgetInRightSidebar('sample_widget', {});
// });

export const SampleWidget = () => {
  const plugin = usePlugin();
  const [isFlashCardOpen, setIsFlashCardOpen] = useState<boolean>();
  const [isAnswerReveal, setIsAnswerReveal] = useState<boolean>();
  const [isQueueCardComplete, setQueueCardComplete] = useState<boolean>();

  useAPIEventListener(AppEvents.RevealAnswer, undefined, async () => {
    setIsAnswerReveal(true);
    setQueueCardComplete(false);
  });

  useAPIEventListener(AppEvents.QueueCompleteCard, undefined, async () => {
    setIsAnswerReveal(false);
    setQueueCardComplete(true);
  });

  useAPIEventListener(AppEvents.QueueExit, undefined, async () => {
    console.log('editor selc change');
  });

  let seconds: string | undefined = useTracker(() => plugin.settings.getSetting<string>('seconds'));

  const THREE_DAYS_IN_MS: number = 1000 * Number(seconds);
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const url = plugin.window.getURL().then((urlData) => {
    setIsFlashCardOpen(urlData.includes('/flashcards'));
  });

  console.log(isQueueCardComplete);

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
