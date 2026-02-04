import { Problem, Step } from './types';
import { randInt, randNonZero, formatCoeff, withSign } from '../utils';

/**
 * Генератор линейных уравнений (лёгкий уровень).
 * @param scale — множитель для диапазонов чисел
 */
export function generateLinear(scale = 1): Problem {
  const maxX = Math.round(15 * scale);
  const maxA = Math.max(2, Math.round(7 * scale));
  const maxB = Math.round(10 * scale);

  const x = randInt(-maxX, maxX);
  const a = randNonZero(maxA);
  const useSimple = Math.random() < 0.5;

  let b: number, c: number, d: number;

  if (useSimple) {
    b = randInt(-maxB, maxB);
    c = 0;
    d = a * x + b;
  } else {
    c = randNonZero(maxA);
    while (c === a) c = randNonZero(maxA);
    b = randInt(-maxB * 2, maxB * 2);
    d = a * x + b - c * x;
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
      formula: `x = ${newD} / (${newA})`,
    });
    steps.push({
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
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
      formula: `x = ${d - b} / ${a}`,
    });
    steps.push({
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
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
