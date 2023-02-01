import { usePlugin, renderWidget, useTracker } from '@remnote/plugin-sdk';
import CountdownTimer from '../components/CountdownTimer';
import useShowTimerLogic from '../hooks/useShowTimerLogic';

export const SampleWidget: any = () => {
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
          <h1 className="timer-heading">Flashcard Timer</h1>
          <p>Open flashcard to start timer</p>
        </div>
      );
    } else if (isAnswerReveal) {
      setQueueCardLoaded(false);
    } else {
      return (
        <div>
          <h1 className="timer-heading">Flashcard Timer</h1>
          <div className="divider"></div>
          <CountdownTimer targetDate={targetDate} />
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
