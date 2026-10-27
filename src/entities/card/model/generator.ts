import { Card, CardOption } from './types';
import { CARDS } from './data';
import { WORD_PROBLEM_TEMPLATES } from './wordProblemTemplates';
import { QUESTIONS_PER_SESSION } from '../../../shared/config/constants';

function randomInt(min: number, max: number): number {
  const low = Math.ceil(Math.min(min, max));
  const high = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const CRAYON_HEX_PALETTE = [
  '#ef724f',
  '#ace2df',
  '#e69dff',
  '#e7db4c',
  '#84bfff',
  '#6ed311',
];

export function generateOptions(correctAnswer: number): number[] {
  const candidateOffsets = shuffleArray([-10, -5, -3, -2, -1, 1, 2, 3, 5, 10, -4, 4, 8, -8]);
  const optionsSet = new Set<number>([correctAnswer]);

  for (const offset of candidateOffsets) {
    if (optionsSet.size >= 4) break;
    const candidate = correctAnswer + offset;
    if (candidate >= 0 && !optionsSet.has(candidate)) {
      optionsSet.add(candidate);
    }
  }

  let step = 1;
  while (optionsSet.size < 4 && step <= 50) {
    const candidate = correctAnswer + step;
    if (candidate >= 0) {
      optionsSet.add(candidate);
    }
    step++;
  }

  return shuffleArray(Array.from(optionsSet));
}

export function generateFractionOptions(num: number, den: number): CardOption[] {
  const correct = `${num}/${den}`;
  const set = new Set<string>([correct]);

  const numCandidates = shuffleArray([
    num - 2,
    num - 1,
    num + 1,
    num + 2,
    den - num,
    1,
    den - 1,
  ]);
  for (const c of numCandidates) {
    if (set.size >= 4) break;
    if (c >= 1 && c <= den) {
      set.add(`${c}/${den}`);
    }
  }

  const denCandidates = [den + 1, den + 2, Math.max(2, den - 1)];
  for (const d of denCandidates) {
    if (set.size >= 4) break;
    set.add(`${Math.min(num, d - 1)}/${d}`);
  }

  return shuffleArray(Array.from(set));
}

function generateAdditionProblem(level: number, index: number): Card {
  const safeLevel = Math.max(1, level);
  let a = 1;
  let b = 1;

  if (safeLevel === 1) {
    a = randomInt(2, 13);
    b = randomInt(1, 20 - a);
  } else if (safeLevel === 2) {
    a = randomInt(8, 34);
    b = randomInt(4, 50 - a);
  } else if (safeLevel === 3) {
    a = randomInt(15, 68);
    b = randomInt(12, 100 - a);
  } else {
    const maxSum = 100 + (safeLevel - 3) * 50;
    const minTerm = Math.floor(maxSum * 0.15);
    const maxFirstTerm = Math.floor(maxSum * 0.7);
    a = randomInt(minTerm, maxFirstTerm);
    b = randomInt(minTerm, maxSum - a);
  }

  const correctAnswer = a + b;
  const bTens = Math.floor(b / 10) * 10;
  const bOnes = b % 10;
  const formula =
    b >= 10 && bOnes > 0
      ? `${a} + ${b} = (${a} + ${bTens}) + ${bOnes} = ${a + bTens} + ${bOnes} = ${correctAnswer}`
      : `${a} + ${b} = ${correctAnswer}`;

  return {
    id: `add-lvl${safeLevel}-${index}-${a}-${b}`,
    categoryId: 'addition',
    gradeLevel: safeLevel,
    question: `${a} + ${b}`,
    explanation: {
      text: {
        ru:
          b >= 10 && bOnes > 0
            ? `Разложим второе число (${b}) на десятки (${bTens}) и единицы (${bOnes}). Сначала прибавим к ${a} число ${bTens}, а затем ещё ${bOnes}.`
            : `Прибавим к числу ${a} ещё ${b} единиц по порядку и получим ${correctAnswer}.`,
        en:
          b >= 10 && bOnes > 0
            ? `Split ${b} into tens (${bTens}) and ones (${bOnes}). First add ${bTens} to ${a}, then add ${bOnes}.`
            : `Count up ${b} from ${a} to reach ${correctAnswer}.`,
      },
      formula,
    },
    options: generateOptions(correctAnswer),
    correctAnswer,
  };
}

function generateSubtractionProblem(level: number, index: number): Card {
  const safeLevel = Math.max(1, level);
  let a = 5;
  let b = 2;

  if (safeLevel === 1) {
    a = randomInt(5, 20);
    b = randomInt(1, a - 1);
  } else if (safeLevel === 2) {
    a = randomInt(16, 50);
    b = randomInt(4, a - 2);
  } else if (safeLevel === 3) {
    a = randomInt(32, 100);
    b = randomInt(11, a - 5);
  } else {
    const maxMinuend = 100 + (safeLevel - 3) * 50;
    const minMinuend = Math.floor(maxMinuend * 0.35);
    a = randomInt(minMinuend, maxMinuend);
    b = randomInt(Math.floor(maxMinuend * 0.1), a - 4);
  }

  const correctAnswer = a - b;
  const bTens = Math.floor(b / 10) * 10;
  const bOnes = b % 10;
  const formula =
    b >= 10 && bOnes > 0
      ? `${a} − ${b} = (${a} − ${bTens}) − ${bOnes} = ${a - bTens} − ${bOnes} = ${correctAnswer}`
      : `${a} − ${b} = ${correctAnswer}  (проверка: ${correctAnswer} + ${b} = ${a})`;

  return {
    id: `sub-lvl${safeLevel}-${index}-${a}-${b}`,
    categoryId: 'subtraction',
    gradeLevel: safeLevel,
    question: `${a} − ${b}`,
    explanation: {
      text: {
        ru:
          b >= 10 && bOnes > 0
            ? `Удобно вычитать по частям: сначала отнимем от ${a} десятки (${bTens}), получим ${a - bTens}, а затем вычтем единицы (${bOnes}).`
            : `Из уменьшаемого ${a} вычитаем ${b}. Проверить легко сложением: ${correctAnswer} + ${b} = ${a}.`,
        en:
          b >= 10 && bOnes > 0
            ? `Subtract in steps: first take away tens (${bTens}) from ${a} to get ${a - bTens}, then subtract ones (${bOnes}).`
            : `Subtract ${b} from ${a}. Check by adding back: ${correctAnswer} + ${b} = ${a}.`,
      },
      formula,
    },
    options: generateOptions(correctAnswer),
    correctAnswer,
  };
}

function generateMultiplicationProblem(level: number, index: number): Card {
  const safeLevel = Math.max(1, level);
  const maxFactorA = safeLevel === 1 ? 5 : safeLevel === 2 ? 9 : 9 + (safeLevel - 2) * 3;
  const maxFactorB = safeLevel === 1 ? 5 : safeLevel === 2 ? 9 : 12;

  const a = randomInt(2, maxFactorA);
  const b = randomInt(2, maxFactorB);
  const correctAnswer = a * b;

  return {
    id: `mul-lvl${safeLevel}-${index}-${a}-${b}`,
    categoryId: 'multiplication',
    gradeLevel: safeLevel,
    question: `${a} × ${b}`,
    explanation: {
      text: {
        ru: `Умножение ${a} × ${b} означает, что число ${a} повторяется слагаемым ${b} раз.`,
        en: `Multiplying ${a} × ${b} means adding ${a} a total of ${b} times.`,
      },
      formula: `${a} × ${b} = ${a} × ${b - 1} + ${a} = ${a * (b - 1)} + ${a} = ${correctAnswer}`,
    },
    options: generateOptions(correctAnswer),
    correctAnswer,
  };
}

function generateDivisionProblem(level: number, index: number): Card {
  const safeLevel = Math.max(1, level);
  const maxDivisor = safeLevel === 1 ? 5 : safeLevel === 2 ? 9 : 12;
  const maxQuotient = safeLevel === 1 ? 5 : safeLevel === 2 ? 9 : 9 + (safeLevel - 2) * 3;

  const divisor = randomInt(2, maxDivisor);
  const quotient = randomInt(2, maxQuotient);
  const dividend = divisor * quotient;

  return {
    id: `div-lvl${safeLevel}-${index}-${dividend}-${divisor}`,
    categoryId: 'division',
    gradeLevel: safeLevel,
    question: `${dividend} ÷ ${divisor}`,
    explanation: {
      text: {
        ru: `Деление — это действие, обратное умножению. Подберём число, которое при умножении на ${divisor} даёт ${dividend}.`,
        en: `Division is the inverse of multiplication. Find the number that multiplied by ${divisor} equals ${dividend}.`,
      },
      formula: `${dividend} ÷ ${divisor} = ${quotient}   (так как ${divisor} × ${quotient} = ${dividend})`,
    },
    options: generateOptions(quotient),
    correctAnswer: quotient,
  };
}

function generateFractionProblem(level: number, index: number): Card {
  const safeLevel = Math.max(1, level);
  const fillHex = CRAYON_HEX_PALETTE[index % CRAYON_HEX_PALETTE.length];

  if (safeLevel <= 2) {
    const minDen = safeLevel === 1 ? 3 : 5;
    const maxDen = safeLevel === 1 ? 6 : 9;
    const den = randomInt(minDen, maxDen);
    const num = randomInt(1, den - 1);
    const isPie = index % 2 === 0;

    return {
      id: `frac-lvl${safeLevel}-${index}-${num}-${den}`,
      categoryId: 'fractions',
      gradeLevel: safeLevel,
      question: `${num}/${den}`,
      questionText: {
        ru: 'Какая часть фигуры закрашена?',
        en: 'What fraction of the shape is shaded?',
      },
      explanation: {
        text: {
          ru: `Фигура разделена на ${den} равных долей (это знаменатель внизу), а цветом закрашено ${num} из них (это числитель вверху).`,
          en: `The shape is divided into ${den} equal parts (denominator), and ${num} of them are shaded (numerator).`,
        },
        formula: `${num} из ${den} = ${num}/${den}`,
      },
      visual: {
        type: isPie ? 'fraction-pie' : 'fraction-bar',
        numerator: num,
        denominator: den,
        fillHex,
      },
      options: generateFractionOptions(num, den),
      correctAnswer: `${num}/${den}`,
    };
  }

  if (safeLevel === 3) {
    const den = randomInt(4, 9);
    const a = randomInt(1, den - 2);
    const b = randomInt(1, den - a);
    const sum = a + b;

    return {
      id: `frac-add-lvl3-${index}-${a}-${b}-${den}`,
      categoryId: 'fractions',
      gradeLevel: 3,
      question: `${a}/${den} + ${b}/${den}`,
      questionText: {
        ru: `Сложите дроби: ${a}/${den} + ${b}/${den}`,
        en: `Add the fractions: ${a}/${den} + ${b}/${den}`,
      },
      explanation: {
        text: {
          ru: `При сложении дробей с одинаковым знаменателем (${den}) складываем только числители (${a} + ${b}), а знаменатель оставляем прежним.`,
          en: `When adding fractions with the same denominator (${den}), add the numerators (${a} + ${b}) and keep the denominator.`,
        },
        formula: `${a}/${den} + ${b}/${den} = (${a} + ${b})/${den} = ${sum}/${den}`,
      },
      visual: {
        type: 'fraction-bar',
        numerator: a,
        secondNumerator: b,
        denominator: den,
        operator: '+',
        fillHex,
      },
      options: generateFractionOptions(sum, den),
      correctAnswer: `${sum}/${den}`,
    };
  }

  if (safeLevel === 4) {
    const den = randomInt(5, 10);
    const a = randomInt(3, den - 1);
    const b = randomInt(1, a - 1);
    const diff = a - b;

    return {
      id: `frac-sub-lvl4-${index}-${a}-${b}-${den}`,
      categoryId: 'fractions',
      gradeLevel: 4,
      question: `${a}/${den} − ${b}/${den}`,
      questionText: {
        ru: `Вычтите дроби: ${a}/${den} − ${b}/${den}`,
        en: `Subtract the fractions: ${a}/${den} − ${b}/${den}`,
      },
      explanation: {
        text: {
          ru: `При вычитании дробей с общим знаменателем (${den}) вычитаем числители (${a} − ${b}), а знаменатель (${den}) не меняем.`,
          en: `Subtract the numerators (${a} − ${b}) while keeping the common denominator (${den}).`,
        },
        formula: `${a}/${den} − ${b}/${den} = (${a} − ${b})/${den} = ${diff}/${den}`,
      },
      visual: {
        type: 'fraction-bar',
        numerator: diff,
        denominator: den,
        operator: '−',
        fillHex,
      },
      options: generateFractionOptions(diff, den),
      correctAnswer: `${diff}/${den}`,
    };
  }

  const den = randomInt(3, 8);
  const num = randomInt(1, den - 1);
  const multiplier = randomInt(3, 9);
  const whole = den * multiplier;
  const answer = num * multiplier;

  return {
    id: `frac-of-lvl${safeLevel}-${index}-${num}-${den}-${whole}`,
    categoryId: 'fractions',
    gradeLevel: safeLevel,
    question: `${num}/${den} × ${whole}`,
    questionText: {
      ru: `Найдите ${num}/${den} от числа ${whole}:`,
      en: `Find ${num}/${den} of ${whole}:`,
    },
    explanation: {
      text: {
        ru: `Чтобы найти дробь ${num}/${den} от числа ${whole}, сначала разделим ${whole} на знаменатель ${den} (найдём 1 долю), а затем умножим на числитель ${num}.`,
        en: `To find ${num}/${den} of ${whole}, first divide ${whole} by the denominator ${den}, then multiply by the numerator ${num}.`,
      },
      formula: `(${whole} ÷ ${den}) × ${num} = ${multiplier} × ${num} = ${answer}`,
    },
    visual: {
      type: 'fraction-pie',
      numerator: num,
      denominator: den,
      fillHex,
    },
    options: generateOptions(answer),
    correctAnswer: answer,
  };
}

function generateGeometryProblem(level: number, index: number): Card {
  const safeLevel = Math.max(1, level);
  const fillHex = CRAYON_HEX_PALETTE[(index + 2) % CRAYON_HEX_PALETTE.length];

  if (safeLevel === 1) {
    const a = randomInt(3, 8);
    const b = randomInt(4, 8);
    const c = randomInt(Math.abs(a - b) + 2, a + b - 1);
    const perimeter = a + b + c;

    return {
      id: `geo-lvl1-${index}-${a}-${b}-${c}`,
      categoryId: 'geometry',
      gradeLevel: 1,
      question: `P = ${a} + ${b} + ${c}`,
      questionText: {
        ru: `Найдите периметр треугольника со сторонами ${a} см, ${b} см и ${c} см:`,
        en: `Find the perimeter of the triangle with sides ${a} cm, ${b} cm, and ${c} cm:`,
      },
      explanation: {
        text: {
          ru: `Периметр треугольника — это сумма длин всех трёх его сторон.`,
          en: `The perimeter of a triangle is the sum of all three sides.`,
        },
        formula: `P = ${a} + ${b} + ${c} = ${perimeter} см`,
      },
      visual: {
        type: 'geometry-shape',
        shape: 'triangle',
        labels: {
          left: `${a}`,
          right: `${b}`,
          bottom: `${c}`,
        },
        fillHex,
      },
      options: generateOptions(perimeter),
      correctAnswer: perimeter,
    };
  }

  if (safeLevel === 2) {
    const side = randomInt(3, 12);
    const perimeter = side * 4;

    return {
      id: `geo-lvl2-${index}-sq-${side}`,
      categoryId: 'geometry',
      gradeLevel: 2,
      question: `P = ?`,
      questionText: {
        ru: `Сторона квадрата равна ${side} см. Чему равен его периметр P?`,
        en: `A square has a side of ${side} cm. What is its perimeter P?`,
      },
      explanation: {
        text: {
          ru: `У квадрата все 4 стороны равны. Чтобы найти периметр, умножим длину стороны (${side} см) на 4.`,
          en: `A square has 4 equal sides. Multiply the side length (${side} cm) by 4.`,
        },
        formula: `P = 4 × ${side} = ${perimeter} см`,
      },
      visual: {
        type: 'geometry-shape',
        shape: 'square',
        labels: {
          top: `${side} cm`,
          right: `${side} cm`,
          center: 'P = ?',
        },
        fillHex,
      },
      options: generateOptions(perimeter),
      correctAnswer: perimeter,
    };
  }

  if (safeLevel === 3) {
    const w = randomInt(5, 12);
    const h = randomInt(3, w - 1);
    const askArea = index % 2 === 0;
    const answer = askArea ? w * h : 2 * (w + h);

    return {
      id: `geo-lvl3-${index}-${w}-${h}-${askArea ? 'S' : 'P'}`,
      categoryId: 'geometry',
      gradeLevel: 3,
      question: askArea ? 'S = ?' : 'P = ?',
      questionText: askArea
        ? {
            ru: `Найдите площадь S прямоугольника со сторонами ${w} см и ${h} см:`,
            en: `Find the area S of the rectangle with sides ${w} cm and ${h} cm:`,
          }
        : {
            ru: `Найдите периметр P прямоугольника со сторонами ${w} см и ${h} см:`,
            en: `Find the perimeter P of the rectangle with sides ${w} cm and ${h} cm:`,
          },
      explanation: askArea
        ? {
            text: {
              ru: `Площадь прямоугольника равна произведению его длины (${w} см) на ширину (${h} см).`,
              en: `The area of a rectangle equals its length (${w} cm) multiplied by its width (${h} cm).`,
            },
            formula: `S = ${w} × ${h} = ${answer} см²`,
          }
        : {
            text: {
              ru: `Периметр прямоугольника равен удвоенной сумме его длины и ширины: P = 2 × (a + b).`,
              en: `The perimeter of a rectangle equals twice the sum of its length and width: P = 2 × (a + b).`,
            },
            formula: `P = 2 × (${w} + ${h}) = 2 × ${w + h} = ${answer} см`,
          },
      visual: {
        type: 'geometry-shape',
        shape: 'rectangle',
        labels: {
          top: `${w} cm`,
          right: `${h} cm`,
          center: askArea ? 'S = ?' : 'P = ?',
        },
        fillHex,
      },
      options: generateOptions(answer),
      correctAnswer: answer,
    };
  }

  if (safeLevel === 4) {
    const w = randomInt(6, 14);
    const h = randomInt(4, 10);
    const area = w * h;

    return {
      id: `geo-lvl4-${index}-${w}-${h}`,
      categoryId: 'geometry',
      gradeLevel: 4,
      question: `b = ?`,
      questionText: {
        ru: `Площадь прямоугольника S = ${area} см², а его длина равна ${w} см. Найдите ширину:`,
        en: `The area of a rectangle is S = ${area} cm², and its length is ${w} cm. Find its width:`,
      },
      explanation: {
        text: {
          ru: `Так как площадь S = a × b, чтобы найти неизвестную сторону, разделим площадь (${area}) на известную сторону (${w}).`,
          en: `Since Area S = a × b, divide the area (${area}) by the known side (${w}) to find the missing width.`,
        },
        formula: `b = ${area} ÷ ${w} = ${h} см`,
      },
      visual: {
        type: 'geometry-shape',
        shape: 'rectangle',
        labels: {
          top: `${w} cm`,
          right: `? cm`,
          center: `S = ${area}`,
        },
        fillHex,
      },
      options: generateOptions(h),
      correctAnswer: h,
    };
  }

  const base = randomInt(3, 8) * 2;
  const height = randomInt(4, 11);
  const area = (base * height) / 2;

  return {
    id: `geo-lvl5-${index}-${base}-${height}`,
    categoryId: 'geometry',
    gradeLevel: safeLevel,
    question: `S = ?`,
    questionText: {
      ru: `Основание треугольника равно ${base} см, а высота — ${height} см. Найдите его площадь S:`,
      en: `A triangle has a base of ${base} cm and height of ${height} cm. Find its area S:`,
    },
    explanation: {
      text: {
        ru: `Площадь треугольника равна половине произведения его основания (${base} см) на высоту (${height} см).`,
        en: `The area of a triangle equals half the product of its base (${base} cm) and height (${height} cm).`,
      },
      formula: `S = (${base} × ${height}) ÷ 2 = ${base * height} ÷ 2 = ${area} см²`,
    },
    visual: {
      type: 'geometry-shape',
      shape: 'triangle',
      labels: {
        left: `h = ${height}`,
        bottom: `a = ${base}`,
        center: 'S = ?',
      },
      fillHex,
    },
    options: generateOptions(area),
    correctAnswer: area,
  };
}

function generateWordProblem(level: number, index: number): Card {
  const targetGrade = Math.min(5, Math.max(1, level));
  const gradeTemplates = WORD_PROBLEM_TEMPLATES.filter((t) => t.grade === targetGrade);
  const pool = gradeTemplates.length > 0 ? gradeTemplates : WORD_PROBLEM_TEMPLATES;
  const chosenTemplate = pool[index % pool.length];
  return chosenTemplate.buildInstance(randomInt, generateOptions, index);
}

const MIXED_CATEGORIES = [
  'addition',
  'subtraction',
  'multiplication',
  'division',
  'fractions',
  'geometry',
  'word-problems',
];

export function generateSessionCards(
  categoryId: string,
  level: number = 1,
  count: number = QUESTIONS_PER_SESSION
): Card[] {
  const targetCount = categoryId === 'word-problems' ? 5 : count;
  const generated: Card[] = [];
  const seenSignatures = new Set<string>();
  let attempts = 0;
  const maxAttempts = targetCount * 15;

  while (generated.length < targetCount && attempts < maxAttempts) {
    attempts++;
    const effectiveCategory =
      categoryId === 'mixed'
        ? MIXED_CATEGORIES[(generated.length + attempts) % MIXED_CATEGORIES.length]
        : categoryId;

    let card: Card | null = null;

    if (effectiveCategory === 'addition') {
      card = generateAdditionProblem(level, attempts);
    } else if (effectiveCategory === 'subtraction') {
      card = generateSubtractionProblem(level, attempts);
    } else if (effectiveCategory === 'multiplication') {
      card = generateMultiplicationProblem(level, attempts);
    } else if (effectiveCategory === 'division') {
      card = generateDivisionProblem(level, attempts);
    } else if (effectiveCategory === 'fractions') {
      card = generateFractionProblem(level, attempts);
    } else if (effectiveCategory === 'geometry') {
      card = generateGeometryProblem(level, attempts);
    } else if (effectiveCategory === 'word-problems') {
      card = generateWordProblem(level, attempts);
    }

    if (!card) break;

    const signature = card.questionText
      ? `${card.questionText.en}-${card.correctAnswer}`
      : `${card.question}-${card.correctAnswer}`;

    if (!seenSignatures.has(signature)) {
      seenSignatures.add(signature);
      generated.push(card);
    }
  }

  if (generated.length > 0) {
    return generated;
  }

  const fallback = CARDS.filter((c) => c.categoryId === categoryId);
  return shuffleArray(fallback).slice(0, targetCount);
}
