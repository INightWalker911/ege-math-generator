import { Problem, Step } from './types';
import { randInt, randNonZero, formatCoeff, withSign } from '../utils';

/**
 * Генератор линейных уравнений (лёгкий уровень).
 * Случайно генерирует ax + b = d или ax + b = cx + d.
 */
export function generateLinear(): Problem {
  const x = randInt(-15, 15);
  const a = randNonZero(7);
  // С вероятностью ~50% делаем простое (c=0) или с двумя частями
  const useSimple = Math.random() < 0.5;

  let b: number, c: number, d: number;

  if (useSimple) {
    b = randInt(-10, 10);
    c = 0;
    d = a * x + b;
  } else {
    c = randNonZero(7);
    while (c === a) c = randNonZero(7);
    b = randInt(-20, 20);
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
