import { useState } from 'react';
import { useAPIEventListener, AppEvents } from '@remnote/plugin-sdk';

const useShowTimerLogic = () => {
  const [isFlashCardOpen, setIsFlashCardOpen] = useState<boolean>();
  const [isAnswerReveal, setIsAnswerReveal] = useState<boolean>();
  const [isQueueCardLoaded, setQueueCardLoaded] = useState<boolean>(true);

  useAPIEventListener(AppEvents.RevealAnswer, undefined, async () => {
    setIsAnswerReveal(true);
  });

  useAPIEventListener(AppEvents.QueueCompleteCard, undefined, async () => {
    setIsAnswerReveal(false);
    setQueueCardLoaded(false);
  });

  useAPIEventListener(AppEvents.QueueLoadCard, undefined, async () => {
    setQueueCardLoaded(true);
  });

  return {
    isFlashCardOpen,
    isAnswerReveal,
    isQueueCardLoaded,
    setIsFlashCardOpen,
    setQueueCardLoaded,
    setIsAnswerReveal,
  };
};

export default useShowTimerLogic;
