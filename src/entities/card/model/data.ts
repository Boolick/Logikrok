import { Card } from './types';

export const CARDS: Card[] = [
  // Addition
  { id: 'add-1', categoryId: 'addition', question: '7 + 8', options: [14, 15, 16, 17], correctAnswer: 15 },
  { id: 'add-2', categoryId: 'addition', question: '12 + 19', options: [29, 30, 31, 32], correctAnswer: 31 },
  { id: 'add-3', categoryId: 'addition', question: '45 + 23', options: [66, 67, 68, 69], correctAnswer: 68 },
  { id: 'add-4', categoryId: 'addition', question: '104 + 57', options: [151, 161, 160, 150], correctAnswer: 161 },
  { id: 'add-5', categoryId: 'addition', question: '88 + 44', options: [122, 132, 142, 152], correctAnswer: 132 },
  
  // Subtraction
  { id: 'sub-1', categoryId: 'subtraction', question: '15 - 7', options: [6, 7, 8, 9], correctAnswer: 8 },
  { id: 'sub-2', categoryId: 'subtraction', question: '34 - 18', options: [14, 16, 18, 20], correctAnswer: 16 },
  { id: 'sub-3', categoryId: 'subtraction', question: '72 - 45', options: [25, 27, 29, 31], correctAnswer: 27 },
  { id: 'sub-4', categoryId: 'subtraction', question: '100 - 37', options: [53, 63, 73, 83], correctAnswer: 63 },
  { id: 'sub-5', categoryId: 'subtraction', question: '155 - 89', options: [56, 66, 76, 86], correctAnswer: 66 },
  
  // Multiplication
  { id: 'mul-1', categoryId: 'multiplication', question: '6 × 7', options: [36, 42, 48, 54], correctAnswer: 42 },
  { id: 'mul-2', categoryId: 'multiplication', question: '8 × 9', options: [64, 72, 81, 90], correctAnswer: 72 },
  { id: 'mul-3', categoryId: 'multiplication', question: '12 × 5', options: [50, 55, 60, 65], correctAnswer: 60 },
  { id: 'mul-4', categoryId: 'multiplication', question: '15 × 4', options: [50, 60, 70, 80], correctAnswer: 60 },
  { id: 'mul-5', categoryId: 'multiplication', question: '11 × 11', options: [111, 121, 131, 141], correctAnswer: 121 },
];
