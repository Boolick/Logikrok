export type CardOption = number | string;

export interface LocalizedText {
  en: string;
  ru: string;
}

export interface CardExplanation {
  /** Plain child-friendly text explanation */
  text: LocalizedText;
  /** Step-by-step numeric example ("пример цифрами") */
  formula: string;
}

export interface FractionVisual {
  type: 'fraction-pie' | 'fraction-bar';
  numerator: number;
  denominator: number;
  secondNumerator?: number;
  operator?: '+' | '−';
  fillHex?: string;
}

export interface GeometryVisual {
  type: 'geometry-shape';
  shape: 'rectangle' | 'square' | 'triangle' | 'polygon';
  labels: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    center?: string;
  };
  sidesCount?: number;
  fillHex?: string;
}

export type CardVisual = FractionVisual | GeometryVisual;

export interface ProblemStep {
  stepNumber: number;
  prompt: LocalizedText;
  summary: LocalizedText;
  explanation?: CardExplanation;
  options: CardOption[];
  correctAnswer: CardOption;
}

export interface Card {
  id: string;
  categoryId: string;
  gradeLevel?: number;
  question: string;
  questionText?: LocalizedText;
  explanation?: CardExplanation;
  visual?: CardVisual;
  steps?: ProblemStep[];
  options: CardOption[];
  correctAnswer: CardOption;
}
