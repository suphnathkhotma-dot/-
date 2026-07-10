export type Operator = '+' | '-' | 'x' | '÷' | '^' | 'sqrt' | 'compare';
export type Category = Operator | 'mixed';

export interface Question {
  num1: number;
  num2?: number;
  operator: Operator;
  displayExpr: string;
  correctAnswer: number | string;
  choices: (number | string)[];
  signature: string;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNumericChoices(correctAnswer: number, spread: number): number[] {
  const choices = new Set<number>();
  choices.add(correctAnswer);

  while (choices.size < 4) {
    const offset = getRandomInt(-spread, spread);
    if (offset === 0) continue;
    const wrongAnswer = correctAnswer + offset;
    // ensure choices are positive integers
    if (wrongAnswer >= 0) {
      choices.add(wrongAnswer);
    }
  }

  // Shuffle array
  return Array.from(choices).sort(() => Math.random() - 0.5);
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function generateQuestion(category: Category, recentSignatures: Set<string>): Question {
  const ops: Operator[] = ['+', '-', 'x', '÷', '^', 'sqrt', 'compare'];
  let op = category === 'mixed' ? ops[Math.floor(Math.random() * ops.length)] : (category as Operator);

  let num1 = 0;
  let num2: number | undefined = 0;
  let correctAnswer: number | string = 0;
  let choices: (number | string)[] = [];
  let displayExpr = '';
  let signature = '';

  let attempts = 0;
  do {
    if (op === '+') {
      num1 = getRandomInt(1, 99);
      num2 = getRandomInt(1, 99);
      correctAnswer = num1 + num2;
      displayExpr = `${num1} + ${num2}`;
      choices = generateNumericChoices(correctAnswer, 10);
    } else if (op === '-') {
      // Ensure num1 >= num2 to avoid negative answers
      num1 = getRandomInt(1, 99);
      num2 = getRandomInt(1, num1);
      correctAnswer = num1 - num2;
      displayExpr = `${num1} - ${num2}`;
      choices = generateNumericChoices(correctAnswer, 10);
    } else if (op === 'x') {
      num1 = getRandomInt(1, 12);
      num2 = getRandomInt(1, 12);
      correctAnswer = num1 * num2;
      displayExpr = `${num1} × ${num2}`;
      choices = generateNumericChoices(correctAnswer, 10);
    } else if (op === '÷') {
      const divisor = getRandomInt(1, 12);
      const quotient = getRandomInt(1, 12);
      num1 = divisor * quotient; // Dividend
      num2 = divisor;
      correctAnswer = quotient;
      displayExpr = `${num1} ÷ ${num2}`;
      choices = generateNumericChoices(correctAnswer, 10);
    } else if (op === '^') {
      num1 = getRandomInt(2, 9);
      num2 = getRandomInt(2, 3);
      correctAnswer = Math.pow(num1, num2);
      displayExpr = `${num1}^${num2}`;
      choices = generateNumericChoices(correctAnswer, 15);
    } else if (op === 'sqrt') {
      const root = getRandomInt(2, 15);
      num1 = root * root;
      num2 = undefined;
      correctAnswer = root;
      displayExpr = `√${num1}`;
      choices = generateNumericChoices(correctAnswer, 4);
    } else if (op === 'compare') {
      num1 = getRandomInt(1, 99);
      num2 = getRandomInt(1, 99);
      correctAnswer = num1 > num2 ? '>' : num1 < num2 ? '<' : '=';
      displayExpr = `${num1} ? ${num2}`;
      choices = shuffle(['>', '<', '=']);
    }
    signature = `${op}:${num1}:${num2 ?? ''}`;
    attempts++;
  } while (recentSignatures.has(signature) && attempts < 100);

  return {
    num1,
    num2,
    operator: op,
    displayExpr,
    correctAnswer,
    choices,
    signature
  };
}
