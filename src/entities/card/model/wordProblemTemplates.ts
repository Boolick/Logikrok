import { Card, LocalizedText, ProblemStep } from './types';

export interface WordProblemTemplate {
  id: string;
  grade: number;
  buildInstance: (
    randomInt: (min: number, max: number) => number,
    generateOptions: (correctAnswer: number) => number[],
    index: number
  ) => Card;
}

export const WORD_PROBLEM_TEMPLATES: WordProblemTemplate[] = [
  // ─────────────────────────────────────────────────────
  // GRADE 1 (Level 1): 2-step addition & subtraction within 20
  // ─────────────────────────────────────────────────────
  {
    id: 'wp-g1-apples',
    grade: 1,
    buildInstance: (randomInt, generateOptions, index) => {
      const a = randomInt(5, 9);
      const b = randomInt(4, 8);
      const step1 = a + b;
      const eaten = randomInt(2, step1 - 3);
      const step2 = step1 - eaten;

      const questionText: LocalizedText = {
        ru: `В первой корзинке лежало ${a} яблок, а во второй — ${b} яблок. За обедом ребята съели ${eaten} яблок. Сколько яблок осталось?`,
        en: `There were ${a} apples in the first basket and ${b} apples in the second basket. At lunch, the kids ate ${eaten} apples. How many apples are left?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: 'Сколько всего яблок было в двух корзинках?',
            en: 'How many apples were in both baskets in total?',
          },
          summary: {
            ru: `1) ${a} + ${b} = ${step1} (яблок всего)`,
            en: `1) ${a} + ${b} = ${step1} (total apples)`,
          },
          explanation: {
            text: {
              ru: `Чтобы узнать, сколько всего яблок в двух корзинках, сложим яблоки из первой (${a}) и второй (${b}) корзинки.`,
              en: `To find the total number of apples in both baskets, add the apples from the first (${a}) and second (${b}) basket.`,
            },
            formula: `${a} + ${b} = ${step1}`,
          },
          options: generateOptions(step1),
          correctAnswer: step1,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: `Сколько яблок осталось после того, как съели ${eaten}?`,
            en: `How many apples are left after eating ${eaten}?`,
          },
          summary: {
            ru: `2) ${step1} − ${eaten} = ${step2} (яблок осталось)`,
            en: `2) ${step1} − ${eaten} = ${step2} (apples left)`,
          },
          explanation: {
            text: {
              ru: `Из общего числа яблок (${step1}) вычтем те яблоки, которые съели за обедом (${eaten}).`,
              en: `Subtract the apples eaten at lunch (${eaten}) from the total apples (${step1}).`,
            },
            formula: `${step1} − ${eaten} = ${step2}`,
          },
          options: generateOptions(step2),
          correctAnswer: step2,
        },
      ];

      return {
        id: `wp-g1-apples-${index}-${a}-${b}-${eaten}`,
        categoryId: 'word-problems',
        gradeLevel: 1,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },
  {
    id: 'wp-g1-birds',
    grade: 1,
    buildInstance: (randomInt, generateOptions, index) => {
      const a = randomInt(6, 11);
      const b = randomInt(3, 7);
      const step1 = a + b;
      const flewAway = randomInt(2, step1 - 4);
      const step2 = step1 - flewAway;

      const questionText: LocalizedText = {
        ru: `На ветке сидело ${a} синичек. К ним прилетело ещё ${b} синичек, а потом ${flewAway} птички улетели. Сколько синичек осталось на ветке?`,
        en: `${a} birds were sitting on a branch. ${b} more birds joined them, and then ${flewAway} birds flew away. How many birds remained on the branch?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: 'Сколько птичек стало на ветке, когда прилетели новые?',
            en: 'How many birds were on the branch after more joined?',
          },
          summary: {
            ru: `1) ${a} + ${b} = ${step1} (птичек стало)`,
            en: `1) ${a} + ${b} = ${step1} (birds together)`,
          },
          explanation: {
            text: {
              ru: `Когда к ${a} синичкам прилетели ещё ${b}, их количество увеличилось — складываем оба числа.`,
              en: `When ${b} more birds joined the ${a} sitting birds, the total increased — add both numbers.`,
            },
            formula: `${a} + ${b} = ${step1}`,
          },
          options: generateOptions(step1),
          correctAnswer: step1,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: 'Сколько синичек осталось после того, как часть улетела?',
            en: 'How many birds remained after some flew away?',
          },
          summary: {
            ru: `2) ${step1} − ${flewAway} = ${step2} (синичек осталось)`,
            en: `2) ${step1} − ${flewAway} = ${step2} (birds left)`,
          },
          explanation: {
            text: {
              ru: `Так как ${flewAway} птички улетели, вычитаем ${flewAway} из получившегося числа птичек (${step1}).`,
              en: `Since ${flewAway} birds flew away, subtract ${flewAway} from the ${step1} birds.`,
            },
            formula: `${step1} − ${flewAway} = ${step2}`,
          },
          options: generateOptions(step2),
          correctAnswer: step2,
        },
      ];

      return {
        id: `wp-g1-birds-${index}-${a}-${b}-${flewAway}`,
        categoryId: 'word-problems',
        gradeLevel: 1,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },

  // ─────────────────────────────────────────────────────
  // GRADE 2 (Level 2): "More/less than" + total within 50
  // ─────────────────────────────────────────────────────
  {
    id: 'wp-g2-books',
    grade: 2,
    buildInstance: (randomInt, generateOptions, index) => {
      const shelf1 = randomInt(12, 22);
      const diff = randomInt(4, 11);
      const shelf2 = shelf1 + diff;
      const total = shelf1 + shelf2;

      const questionText: LocalizedText = {
        ru: `На первой полке стоит ${shelf1} книг, а на второй — на ${diff} книг больше. Сколько всего книг стоит на двух полках?`,
        en: `There are ${shelf1} books on the first shelf, and ${diff} more books than that on the second shelf. How many books are on both shelves in total?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: 'Сколько книг стоит на второй полке?',
            en: 'How many books are on the second shelf?',
          },
          summary: {
            ru: `1) ${shelf1} + ${diff} = ${shelf2} (книг на 2-й полке)`,
            en: `1) ${shelf1} + ${diff} = ${shelf2} (on 2nd shelf)`,
          },
          explanation: {
            text: {
              ru: `Фраза «на ${diff} больше» означает сложение: прибавим ${diff} к количеству книг на первой полке (${shelf1}).`,
              en: `"${diff} more than ${shelf1}" means addition: add ${diff} to the books on the first shelf (${shelf1}).`,
            },
            formula: `${shelf1} + ${diff} = ${shelf2}`,
          },
          options: generateOptions(shelf2),
          correctAnswer: shelf2,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: 'Сколько всего книг на обеих полках?',
            en: 'How many books are on both shelves altogether?',
          },
          summary: {
            ru: `2) ${shelf1} + ${shelf2} = ${total} (книг всего)`,
            en: `2) ${shelf1} + ${shelf2} = ${total} (total books)`,
          },
          explanation: {
            text: {
              ru: `Теперь сложим книги на первой полке (${shelf1}) и книги на второй полке (${shelf2}).`,
              en: `Now add the books on the first shelf (${shelf1}) and the second shelf (${shelf2}).`,
            },
            formula: `${shelf1} + ${shelf2} = ${total}`,
          },
          options: generateOptions(total),
          correctAnswer: total,
        },
      ];

      return {
        id: `wp-g2-books-${index}-${shelf1}-${diff}`,
        categoryId: 'word-problems',
        gradeLevel: 2,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },
  {
    id: 'wp-g2-stickers',
    grade: 2,
    buildInstance: (randomInt, generateOptions, index) => {
      const blue = randomInt(18, 28);
      const less = randomInt(5, 11);
      const red = blue - less;
      const total = blue + red;

      const questionText: LocalizedText = {
        ru: `У Миши в альбоме ${blue} синих наклеек, а красных — на ${less} меньше. Сколько всего наклеек у Миши?`,
        en: `Leo has ${blue} blue stickers in his album, and ${less} fewer red stickers than blue ones. How many stickers does Leo have in total?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: 'Сколько красных наклеек у Миши?',
            en: 'How many red stickers does Leo have?',
          },
          summary: {
            ru: `1) ${blue} − ${less} = ${red} (красных наклеек)`,
            en: `1) ${blue} − ${less} = ${red} (red stickers)`,
          },
          explanation: {
            text: {
              ru: `Фраза «на ${less} меньше» означает вычитание: от синих наклеек (${blue}) отнимем ${less}.`,
              en: `"${less} fewer than ${blue}" means subtraction: subtract ${less} from ${blue}.`,
            },
            formula: `${blue} − ${less} = ${red}`,
          },
          options: generateOptions(red),
          correctAnswer: red,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: 'Сколько всего синих и красных наклеек в альбоме?',
            en: 'How many blue and red stickers are in the album altogether?',
          },
          summary: {
            ru: `2) ${blue} + ${red} = ${total} (всего наклеек)`,
            en: `2) ${blue} + ${red} = ${total} (total stickers)`,
          },
          explanation: {
            text: {
              ru: `Сложим количество синих (${blue}) и красных (${red}) наклеек.`,
              en: `Add the blue stickers (${blue}) and red stickers (${red}) together.`,
            },
            formula: `${blue} + ${red} = ${total}`,
          },
          options: generateOptions(total),
          correctAnswer: total,
        },
      ];

      return {
        id: `wp-g2-stickers-${index}-${blue}-${less}`,
        categoryId: 'word-problems',
        gradeLevel: 2,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },

  // ─────────────────────────────────────────────────────
  // GRADE 3 (Level 3): Multiplication/Division + Addition/Subtraction
  // ─────────────────────────────────────────────────────
  {
    id: 'wp-g3-boxes',
    grade: 3,
    buildInstance: (randomInt, generateOptions, index) => {
      const boxes = randomInt(4, 8);
      const perBox = randomInt(5, 9);
      const totalPicked = boxes * perBox;
      const sold = randomInt(10, totalPicked - 6);
      const remaining = totalPicked - sold;

      const questionText: LocalizedText = {
        ru: `В саду собрали ${boxes} ящиков груш по ${perBox} кг в каждом. На ярмарке продали ${sold} кг груш. Сколько килограммов груш осталось?`,
        en: `An orchard harvested ${boxes} crates of pears with ${perBox} kg in each crate. They sold ${sold} kg at the market. How many kilograms of pears are left?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: `Сколько всего килограммов груш было в ${boxes} ящиках?`,
            en: `How many kilograms of pears were in the ${boxes} crates in total?`,
          },
          summary: {
            ru: `1) ${boxes} × ${perBox} = ${totalPicked} кг (собрали всего)`,
            en: `1) ${boxes} × ${perBox} = ${totalPicked} kg (total harvested)`,
          },
          explanation: {
            text: {
              ru: `В каждом из ${boxes} ящиков одинаковое количество груш (${perBox} кг). Умножим число ящиков на массу одного ящика.`,
              en: `Each of the ${boxes} crates holds ${perBox} kg. Multiply the number of crates by the weight per crate.`,
            },
            formula: `${boxes} × ${perBox} = ${totalPicked}`,
          },
          options: generateOptions(totalPicked),
          correctAnswer: totalPicked,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: `Сколько килограммов груш осталось после продажи ${sold} кг?`,
            en: `How many kilograms are left after selling ${sold} kg?`,
          },
          summary: {
            ru: `2) ${totalPicked} − ${sold} = ${remaining} кг (осталось)`,
            en: `2) ${totalPicked} − ${sold} = ${remaining} kg (left)`,
          },
          explanation: {
            text: {
              ru: `Из общей массы собранных груш (${totalPicked} кг) вычтем проданные ${sold} кг.`,
              en: `Subtract the ${sold} kg sold from the total harvested weight (${totalPicked} kg).`,
            },
            formula: `${totalPicked} − ${sold} = ${remaining}`,
          },
          options: generateOptions(remaining),
          correctAnswer: remaining,
        },
      ];

      return {
        id: `wp-g3-boxes-${index}-${boxes}-${perBox}-${sold}`,
        categoryId: 'word-problems',
        gradeLevel: 3,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },
  {
    id: 'wp-g3-notebooks',
    grade: 3,
    buildInstance: (randomInt, generateOptions, index) => {
      const packs = randomInt(3, 7);
      const perPack = randomInt(6, 10);
      const inPacks = packs * perPack;
      const loose = randomInt(8, 19);
      const total = inPacks + loose;

      const questionText: LocalizedText = {
        ru: `Для класса купили ${packs} пачек тетрадей по ${perPack} штук в каждой и ещё ${loose} тетрадей отдельно. Сколько всего тетрадей купили?`,
        en: `A teacher bought ${packs} packs of notebooks with ${perPack} notebooks in each pack, plus ${loose} extra notebooks. How many notebooks were bought in total?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: 'Сколько тетрадей находится в пачках?',
            en: 'How many notebooks are in the packs?',
          },
          summary: {
            ru: `1) ${packs} × ${perPack} = ${inPacks} (тетрадей в пачках)`,
            en: `1) ${packs} × ${perPack} = ${inPacks} (in packs)`,
          },
          explanation: {
            text: {
              ru: `Умножим количество пачек (${packs}) на число тетрадей в одной пачке (${perPack}).`,
              en: `Multiply the number of packs (${packs}) by the notebooks per pack (${perPack}).`,
            },
            formula: `${packs} × ${perPack} = ${inPacks}`,
          },
          options: generateOptions(inPacks),
          correctAnswer: inPacks,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: 'Сколько всего тетрадей купили вместе с отдельными?',
            en: 'How many notebooks were bought altogether?',
          },
          summary: {
            ru: `2) ${inPacks} + ${loose} = ${total} (тетрадей всего)`,
            en: `2) ${inPacks} + ${loose} = ${total} (total notebooks)`,
          },
          explanation: {
            text: {
              ru: `Прибавим к тетрадям в пачках (${inPacks}) ещё ${loose} отдельных тетрадей.`,
              en: `Add the ${loose} extra notebooks to the ${inPacks} notebooks in packs.`,
            },
            formula: `${inPacks} + ${loose} = ${total}`,
          },
          options: generateOptions(total),
          correctAnswer: total,
        },
      ];

      return {
        id: `wp-g3-notebooks-${index}-${packs}-${perPack}-${loose}`,
        categoryId: 'word-problems',
        gradeLevel: 3,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },

  // ─────────────────────────────────────────────────────
  // GRADE 4 (Level 4): Motion & Shopping with Change
  // ─────────────────────────────────────────────────────
  {
    id: 'wp-g4-journey',
    grade: 4,
    buildInstance: (randomInt, generateOptions, index) => {
      const speed = randomInt(12, 18);
      const hours = randomInt(3, 5);
      const distByBike = speed * hours;
      const distOnFoot = randomInt(6, 15);
      const totalDist = distByBike + distOnFoot;

      const questionText: LocalizedText = {
        ru: `Турист ехал на велосипеде ${hours} ч со скоростью ${speed} км/ч, а затем прошёл пешком ещё ${distOnFoot} км. Какое общее расстояние преодолел турист?`,
        en: `A traveler rode a bicycle for ${hours} hours at ${speed} km/h, and then walked ${distOnFoot} km more. What total distance did the traveler cover?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: 'Сколько километров турист проехал на велосипеде?',
            en: 'How many kilometers did the traveler ride by bicycle?',
          },
          summary: {
            ru: `1) ${speed} × ${hours} = ${distByBike} км (на велосипеде)`,
            en: `1) ${speed} × ${hours} = ${distByBike} km (by bike)`,
          },
          explanation: {
            text: {
              ru: `Чтобы найти расстояние, умножим скорость (${speed} км/ч) на время движения (${hours} ч): S = v × t.`,
              en: `To find distance, multiply speed (${speed} km/h) by time (${hours} h): d = v × t.`,
            },
            formula: `S = ${speed} × ${hours} = ${distByBike}`,
          },
          options: generateOptions(distByBike),
          correctAnswer: distByBike,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: 'Какое общее расстояние преодолел турист?',
            en: 'What is the total distance covered?',
          },
          summary: {
            ru: `2) ${distByBike} + ${distOnFoot} = ${totalDist} км (весь путь)`,
            en: `2) ${distByBike} + ${distOnFoot} = ${totalDist} km (total)`,
          },
          explanation: {
            text: {
              ru: `Сложим путь на велосипеде (${distByBike} км) и путь пешком (${distOnFoot} км).`,
              en: `Add the distance by bike (${distByBike} km) and the distance on foot (${distOnFoot} km).`,
            },
            formula: `${distByBike} + ${distOnFoot} = ${totalDist}`,
          },
          options: generateOptions(totalDist),
          correctAnswer: totalDist,
        },
      ];

      return {
        id: `wp-g4-journey-${index}-${speed}-${hours}-${distOnFoot}`,
        categoryId: 'word-problems',
        gradeLevel: 4,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },
  {
    id: 'wp-g4-shopping',
    grade: 4,
    buildInstance: (randomInt, generateOptions, index) => {
      const count = randomInt(4, 7);
      const price = randomInt(11, 16);
      const cost = count * price;
      const bill = 150;
      const change = bill - cost;

      const questionText: LocalizedText = {
        ru: `Катя купила ${count} альбомов по ${price} монет каждый и дала кассиру купюру в ${bill} монет. Сколько монет сдачи она должна получить?`,
        en: `Kate bought ${count} sketchbooks for ${price} coins each and paid with a ${bill}-coin bill. How many coins of change should she receive?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: `Сколько монет стоят все ${count} альбомов?`,
            en: `How much do all ${count} sketchbooks cost?`,
          },
          summary: {
            ru: `1) ${count} × ${price} = ${cost} (стоимость покупки)`,
            en: `1) ${count} × ${price} = ${cost} (total cost)`,
          },
          explanation: {
            text: {
              ru: `Умножим количество альбомов (${count}) на цену одного альбома (${price} монет).`,
              en: `Multiply the number of sketchbooks (${count}) by the price of each (${price} coins).`,
            },
            formula: `${count} × ${price} = ${cost}`,
          },
          options: generateOptions(cost),
          correctAnswer: cost,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: `Сколько монет сдачи получит Катя с ${bill} монет?`,
            en: `How much change will Kate get from ${bill} coins?`,
          },
          summary: {
            ru: `2) ${bill} − ${cost} = ${change} (монет сдачи)`,
            en: `2) ${bill} − ${cost} = ${change} (change)`,
          },
          explanation: {
            text: {
              ru: `Чтобы найти сдачу, вычтем стоимость покупки (${cost}) из суммы купюры (${bill}).`,
              en: `To find the change, subtract the total cost (${cost}) from the bill (${bill}).`,
            },
            formula: `${bill} − ${cost} = ${change}`,
          },
          options: generateOptions(change),
          correctAnswer: change,
        },
      ];

      return {
        id: `wp-g4-shopping-${index}-${count}-${price}`,
        categoryId: 'word-problems',
        gradeLevel: 4,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },

  // ─────────────────────────────────────────────────────
  // GRADE 5 (Level 5+): 3-step problems with Area & Fractions
  // ─────────────────────────────────────────────────────
  {
    id: 'wp-g5-garden',
    grade: 5,
    buildInstance: (randomInt, generateOptions, index) => {
      const width = randomInt(6, 10);
      const length = randomInt(2, 4) * 3;
      const area = width * length;
      const berriesArea = area / 3;
      const flowersArea = area - berriesArea;

      const questionText: LocalizedText = {
        ru: `Садовый участок прямоугольной формы имеет длину ${length} м и ширину ${width} м. Треть (1/3) всей площади занята клубникой, а остальная часть — цветами. Какая площадь занята цветами?`,
        en: `A rectangular garden plot is ${length} m long and ${width} m wide. One third (1/3) of the total area is planted with strawberries, and the rest with flowers. What area is planted with flowers?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: 'Найдите общую площадь садового участка (м²):',
            en: 'Find the total area of the garden plot (m²):',
          },
          summary: {
            ru: `1) ${length} × ${width} = ${area} м² (общая площадь)`,
            en: `1) ${length} × ${width} = ${area} m² (total area)`,
          },
          explanation: {
            text: {
              ru: `Площадь прямоугольника равна произведению длины (${length} м) на ширину (${width} м): S = a × b.`,
              en: `The area of a rectangle equals length (${length} m) times width (${width} m): S = a × b.`,
            },
            formula: `S = ${length} × ${width} = ${area}`,
          },
          options: generateOptions(area),
          correctAnswer: area,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: 'Какая площадь (1/3 участка) занята клубникой?',
            en: 'What area (1/3 of the plot) is planted with strawberries?',
          },
          summary: {
            ru: `2) ${area} ÷ 3 = ${berriesArea} м² (под клубникой)`,
            en: `2) ${area} ÷ 3 = ${berriesArea} m² (strawberries)`,
          },
          explanation: {
            text: {
              ru: `Чтобы найти 1/3 от общей площади (${area} м²), разделим ${area} на 3.`,
              en: `To find 1/3 of the total area (${area} m²), divide ${area} by 3.`,
            },
            formula: `${area} ÷ 3 = ${berriesArea}`,
          },
          options: generateOptions(berriesArea),
          correctAnswer: berriesArea,
        },
        {
          stepNumber: 3,
          prompt: {
            ru: 'Какая оставшаяся площадь занята цветами?',
            en: 'What remaining area is planted with flowers?',
          },
          summary: {
            ru: `3) ${area} − ${berriesArea} = ${flowersArea} м² (под цветами)`,
            en: `3) ${area} − ${berriesArea} = ${flowersArea} m² (flowers)`,
          },
          explanation: {
            text: {
              ru: `Вычтем площадь под клубникой (${berriesArea} м²) из общей площади участка (${area} м²).`,
              en: `Subtract the strawberry area (${berriesArea} m²) from the total plot area (${area} m²).`,
            },
            formula: `${area} − ${berriesArea} = ${flowersArea}`,
          },
          options: generateOptions(flowersArea),
          correctAnswer: flowersArea,
        },
      ];

      return {
        id: `wp-g5-garden-${index}-${length}-${width}`,
        categoryId: 'word-problems',
        gradeLevel: 5,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },
  {
    id: 'wp-g5-expedition',
    grade: 5,
    buildInstance: (randomInt, generateOptions, index) => {
      const denom = 4;
      const unitPart = randomInt(12, 22);
      const totalKm = unitPart * denom;
      const day1 = unitPart;
      const day2 = randomInt(15, unitPart * 2);
      const walkedTwoDays = day1 + day2;
      const day3 = totalKm - walkedTwoDays;

      const questionText: LocalizedText = {
        ru: `Длина маршрута экспедиции — ${totalKm} км. В первый день команда прошла 1/4 всего пути, во второй день — ещё ${day2} км. Сколько километров осталось пройти в третий день?`,
        en: `An expedition route is ${totalKm} km long. On Day 1 the team walked 1/4 of the total route, and on Day 2 they walked ${day2} km. How many kilometers are left for Day 3?`,
      };

      const steps: ProblemStep[] = [
        {
          stepNumber: 1,
          prompt: {
            ru: `Сколько километров команда прошла в 1-й день (1/4 от ${totalKm})?`,
            en: `How many kilometers did the team walk on Day 1 (1/4 of ${totalKm})?`,
          },
          summary: {
            ru: `1) ${totalKm} ÷ 4 = ${day1} км (в 1-й день)`,
            en: `1) ${totalKm} ÷ 4 = ${day1} km (Day 1)`,
          },
          explanation: {
            text: {
              ru: `Четверть (1/4) маршрута находится делением всей длины (${totalKm} км) на 4.`,
              en: `One fourth (1/4) of the route is found by dividing the total length (${totalKm} km) by 4.`,
            },
            formula: `${totalKm} ÷ 4 = ${day1}`,
          },
          options: generateOptions(day1),
          correctAnswer: day1,
        },
        {
          stepNumber: 2,
          prompt: {
            ru: 'Сколько километров прошли за первые два дня вместе?',
            en: 'How many kilometers did they walk in the first two days combined?',
          },
          summary: {
            ru: `2) ${day1} + ${day2} = ${walkedTwoDays} км (за 2 дня)`,
            en: `2) ${day1} + ${day2} = ${walkedTwoDays} km (in 2 days)`,
          },
          explanation: {
            text: {
              ru: `Сложим расстояние за первый день (${day1} км) и за второй день (${day2} км).`,
              en: `Add the distance from Day 1 (${day1} km) and Day 2 (${day2} km).`,
            },
            formula: `${day1} + ${day2} = ${walkedTwoDays}`,
          },
          options: generateOptions(walkedTwoDays),
          correctAnswer: walkedTwoDays,
        },
        {
          stepNumber: 3,
          prompt: {
            ru: 'Сколько километров осталось пройти в третий день?',
            en: 'How many kilometers are left for the third day?',
          },
          summary: {
            ru: `3) ${totalKm} − ${walkedTwoDays} = ${day3} км (осталось)`,
            en: `3) ${totalKm} − ${walkedTwoDays} = ${day3} km (remaining)`,
          },
          explanation: {
            text: {
              ru: `Вычтем пройденный за два дня путь (${walkedTwoDays} км) из общей длины маршрута (${totalKm} км).`,
              en: `Subtract the two-day distance (${walkedTwoDays} km) from the total route (${totalKm} km).`,
            },
            formula: `${totalKm} − ${walkedTwoDays} = ${day3}`,
          },
          options: generateOptions(day3),
          correctAnswer: day3,
        },
      ];

      return {
        id: `wp-g5-expedition-${index}-${totalKm}-${day2}`,
        categoryId: 'word-problems',
        gradeLevel: 5,
        question: questionText.ru,
        questionText,
        steps,
        options: steps[0].options,
        correctAnswer: steps[0].correctAnswer,
      };
    },
  },
];
