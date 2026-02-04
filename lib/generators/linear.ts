import { Difficulty, Problem, Step } from './types';
import { randInt, randNonZero, formatCoeff, withSign } from '../utils';

/**
 * Генератор линейных уравнений вида ax + b = cx + d
 * Обратная генерация: выбираем x, затем строим уравнение.
 */
export function generateLinear(difficulty: Difficulty): Problem {
  let x: number;
  let a: number, b: number, c: number, d: number;

  switch (difficulty) {
    case 'easy': {
      // Простое: ax + b = d (c = 0)
      x = randInt(-10, 10);
      a = randNonZero(5);
      b = randInt(-10, 10);
      c = 0;
      d = a * x + b;
      break;
    }
    case 'medium': {
      // ax + b = cx + d, оба коэффициента при x ненулевые
      x = randInt(-15, 15);
      a = randNonZero(7);
      c = randNonZero(7);
      while (c === a) c = randNonZero(7);
      b = randInt(-20, 20);
      d = a * x + b - c * x;
      break;
    }
    case 'hard': {
      // Большие коэффициенты
      x = randInt(-20, 20);
      a = randNonZero(12);
      c = randNonZero(12);
      while (c === a) c = randNonZero(12);
      b = randInt(-30, 30);
      d = a * x + b - c * x;
      break;
    }
  }

  const leftSide = formatLinearSide(a, b);
  const rightSide = c === 0 ? String(d) : formatLinearSide(c, d);
  const statement = `Решите уравнение: ${leftSide} = ${rightSide}.`;

  const steps: Step[] = [];

  if (c !== 0) {
    steps.push({
      explanation: 'Перенесём слагаемые с x в левую часть, числа — в правую:',
      formula: `${formatCoeff(a, 'x')} - ${formatCoeff(c, 'x')} = ${d} ${withSign(-b)}`,
    });
    const newA = a - c;
    const newD = d - b;
    steps.push({
      explanation: 'Приведём подобные слагаемые:',
      formula: `${formatCoeff(newA, 'x')} = ${newD}`,
    });
    steps.push({
      explanation: `Разделим обе части на ${newA}:`,
      formula: `x = ${newD} / ${newA} = ${x}`,
    });
  } else {
    steps.push({
      explanation: 'Перенесём свободный член в правую часть:',
      formula: `${formatCoeff(a, 'x')} = ${d} ${withSign(-b)}`,
    });
    steps.push({
      explanation: 'Вычислим правую часть:',
      formula: `${formatCoeff(a, 'x')} = ${d - b}`,
    });
    steps.push({
      explanation: `Разделим обе части на ${a}:`,
      formula: `x = ${d - b} / ${a} = ${x}`,
    });
  }

  return {
    type: 'linear',
    statement,
    answer: String(x),
    steps,
  };
}

function formatLinearSide(a: number, b: number): string {
  const ax = formatCoeff(a, 'x');
  if (b === 0) return ax;
  return `${ax} ${withSign(b)}`;
}
