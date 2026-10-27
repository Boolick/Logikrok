import { Card, CardOption } from '../../card';

export interface GameSession {
  categoryId: string;
  level: number;
  cards: Card[];
  currentIndex: number;
  /** Index of the active step when solving a multi-step card (0-based) */
  currentStepIndex: number;
  correctAnswers: number;
  /** Tracks whether any step on the current card had a wrong attempt */
  currentCardHadMistake: boolean;
  isFinished: boolean;
  selectedOption: CardOption | null;
  isAnswerChecked: boolean;
  leveledUp?: boolean;
  newLevel?: number;
  newlyUnlockedAwards?: string[];
}
