import { usePlugin, renderWidget, useTracker } from '@remnote/plugin-sdk';
import CountdownTimer from '../components/CountdownTimer';
import useShowTimerLogic from '../hooks/useShowTimerLogic';

export const FlashcardTimer: any = () => {
  const plugin = usePlugin();
  const {
    isFlashCardOpen,
    isAnswerReveal,
    isQueueCardLoaded,
    setIsFlashCardOpen,
    setQueueCardLoaded,
  } = useShowTimerLogic();

  let seconds: string | undefined = useTracker(() => plugin.settings.getSetting<string>('seconds'));

  //change the names of some of these variables

  const SECONDS_IN_MS: number = 1000 * Number(seconds);
  const NOW_IN_MS = new Date().getTime();

  const targetDate = NOW_IN_MS + SECONDS_IN_MS;

  plugin.window.getURL().then((urlData) => {
    setIsFlashCardOpen(urlData.includes('/flashcards'));
  });
  if (isQueueCardLoaded) {
    if (!isFlashCardOpen) {
      return (
        <div>
          <h1 className="timer-heading text-4xl mt-7 mb-7">Flashcard Timer</h1>
          <p className="sub-text text-2xl">Open flashcards to start timer</p>
        </div>
      );
    } else if (isAnswerReveal) {
      setQueueCardLoaded(false);
    } else {
      return (
        <div>
          <h1 className="timer-heading text-4xl mt-7 mb-7">Flashcard Timer</h1>
          <div className="divider bg-black mb-11 h-1 w-80 mx-auto"></div>
          <CountdownTimer targetDate={targetDate} />
        </div>
      );
    }
  } else {
    return (
      <div>
        <h1 className="timer-heading text-4xl mt-7 mb-7">Flashcard Timer</h1>
        <div className="divider bg-black mb-11 h-1 w-80 mx-auto"></div>
        <h1 className="sub-text text-2xl">Waiting...</h1>
      </div>
    );
  }
};

renderWidget(FlashcardTimer);
