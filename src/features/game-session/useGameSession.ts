import { useState, useCallback } from 'react';
import { CardOption, generateSessionCards } from '../../entities/card';
import { GameSession } from '../../entities/game-session';
import { gameSessionService } from '../../shared/api/gameSessionService';
import {
  LEVEL_UP_ACCURACY_THRESHOLD,
  QUESTIONS_PER_SESSION,
} from '../../shared/config/constants';

function buildSession(categoryId?: string): GameSession | null {
  if (!categoryId) return null;
  const currentLevel = gameSessionService.getCategoryLevel(categoryId);
  const cards = generateSessionCards(categoryId, currentLevel, QUESTIONS_PER_SESSION);

  return {
    categoryId,
    level: currentLevel,
    cards,
    currentIndex: 0,
    currentStepIndex: 0,
    correctAnswers: 0,
    currentCardHadMistake: false,
    isFinished: false,
    selectedOption: null,
    isAnswerChecked: false,
    leveledUp: false,
    newLevel: currentLevel,
    newlyUnlockedAwards: [],
  };
}

export const useGameSession = (categoryId?: string) => {
  const [session, setSession] = useState<GameSession | null>(() => buildSession(categoryId));
  const [prevCategoryId, setPrevCategoryId] = useState(categoryId);

  if (categoryId !== prevCategoryId) {
    setPrevCategoryId(categoryId);
    setSession(buildSession(categoryId));
  }

  const restartSession = useCallback(() => {
    setSession(buildSession(categoryId));
  }, [categoryId]);

  const selectOption = useCallback((option: CardOption) => {
    setSession((prev) => {
      if (!prev || prev.isAnswerChecked) return prev;
      return { ...prev, selectedOption: option };
    });
  }, []);

  const checkAnswer = useCallback(() => {
    setSession((prev) => {
      if (!prev || prev.selectedOption === null || prev.isAnswerChecked) return prev;

      const currentCard = prev.cards[prev.currentIndex];
      const steps = currentCard.steps;
      const isMultiStep = Array.isArray(steps) && steps.length > 0;

      const expectedAnswer = isMultiStep
        ? steps[prev.currentStepIndex].correctAnswer
        : currentCard.correctAnswer;

      const isCorrect = prev.selectedOption === expectedAnswer;
      const isLastStep = !isMultiStep || prev.currentStepIndex >= steps.length - 1;
      const hadMistake = prev.currentCardHadMistake || !isCorrect;
      const cardFullySolved = isLastStep && isCorrect && !hadMistake;

      let unlockedFromCard: string[] = [];
      if (isLastStep) {
        unlockedFromCard = gameSessionService.recordCardOutcome(
          currentCard.categoryId,
          cardFullySolved,
          isMultiStep ? 20 : 10
        );
      } else if (isCorrect) {
        // Intermediate step XP reward
        const p = gameSessionService.getProgress();
        p.xp += 5;
        gameSessionService.saveProgress(p);
      }

      const nextCorrectAnswers = cardFullySolved
        ? prev.correctAnswers + 1
        : prev.correctAnswers;

      const mergedAwards = Array.from(
        new Set([...(prev.newlyUnlockedAwards || []), ...unlockedFromCard])
      );

      return {
        ...prev,
        isAnswerChecked: true,
        currentCardHadMistake: hadMistake,
        correctAnswers: nextCorrectAnswers,
        newlyUnlockedAwards: mergedAwards,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setSession((prev) => {
      if (!prev || !prev.isAnswerChecked) return prev;

      const currentCard = prev.cards[prev.currentIndex];
      const steps = currentCard.steps;
      const isMultiStep = Array.isArray(steps) && steps.length > 0;

      if (isMultiStep && prev.currentStepIndex < steps.length - 1) {
        return {
          ...prev,
          currentStepIndex: prev.currentStepIndex + 1,
          selectedOption: null,
          isAnswerChecked: false,
        };
      }

      if (prev.currentIndex < prev.cards.length - 1) {
        return {
          ...prev,
          currentIndex: prev.currentIndex + 1,
          currentStepIndex: 0,
          currentCardHadMistake: false,
          selectedOption: null,
          isAnswerChecked: false,
        };
      }

      const total = prev.cards.length;
      const roundResult = gameSessionService.completeRound(
        prev.categoryId,
        prev.correctAnswers,
        total,
        LEVEL_UP_ACCURACY_THRESHOLD
      );

      const allAwards = Array.from(
        new Set([...(prev.newlyUnlockedAwards || []), ...roundResult.newlyUnlockedAwards])
      );

      return {
        ...prev,
        isFinished: true,
        leveledUp: roundResult.leveledUp,
        newLevel: roundResult.newLevel,
        newlyUnlockedAwards: allAwards,
      };
    });
  }, []);

  return {
    session,
    selectOption,
    checkAnswer,
    nextQuestion,
    restartSession,
  };
};
