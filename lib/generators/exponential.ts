import { Difficulty, Problem, Step } from './types';
import { randInt, pick } from '../utils';

/**
 * Генератор показательных уравнений.
 * Типы:
 *   - a^(x+b) = a^c  =>  x+b = c  =>  x = c - b
 *   - (1/a)^(x+b) = a^c  =>  a^(-(x+b)) = a^c  =>  -(x+b) = c
 *   - a^(2x+b) = a^c (сложнее)
 */
export function generateExponential(difficulty: Difficulty): Problem {
  const bases = [2, 3, 5, 7];

  switch (difficulty) {
    case 'easy':
      return genExpSimple(pick(bases));
    case 'medium':
      return genExpInverse(pick(bases));
    case 'hard':
      return genExpDouble(pick(bases));
  }
}

/** a^(x+b) = a^c */
function genExpSimple(base: number): Problem {
  const x = randInt(-8, 8);
  const b = randInt(-5, 5);
  const c = x + b;

  const statement = `Решите уравнение: ${base}^(x ${formatSign(b)}) = ${base}^${formatPow(c)}.`;
  const steps: Step[] = [
    {
      explanation: 'Основания степеней одинаковы, приравняем показатели:',
      formula: `x ${formatSign(b)} = ${c}`,
    },
    {
      explanation: `Перенесём ${b >= 0 ? b : '(' + b + ')'} в правую часть:`,
      formula: `x = ${c} ${formatSign(-b)}`,
    },
    {
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
    },
  ];

  return { type: 'exponential', statement, answer: String(x), steps };
}

/** (1/a)^(x+b) = a^c  =>  a^(-(x+b)) = a^c */
function genExpInverse(base: number): Problem {
  const x = randInt(-6, 6);
  const b = randInt(-4, 4);
  const c = -(x + b);

  const statement = `Решите уравнение: (1/${base})^(x ${formatSign(b)}) = ${base}^${formatPow(c)}.`;
  const steps: Step[] = [
    {
      explanation: `Заменим 1/${base} = ${base}^(-1):`,
      formula: `${base}^(-(x ${formatSign(b)})) = ${base}^${formatPow(c)}`,
    },
    {
      explanation: 'Приравняем показатели:',
      formula: `-(x ${formatSign(b)}) = ${c}`,
    },
    {
      explanation: 'Раскроем скобки:',
      formula: `-x ${formatSign(-b)} = ${c}`,
    },
    {
      explanation: 'Найдём x:',
      formula: `x = ${-c} ${formatSign(-b)}`,
    },
    {
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
    },
  ];

  return { type: 'exponential', statement, answer: String(x), steps };
}

/** a^(2x+b) = a^c */
function genExpDouble(base: number): Problem {
  const x = randInt(-5, 5);
  const k = pick([2, 3]);
  const b = randInt(-4, 4);
  const c = k * x + b;

  const statement = `Решите уравнение: ${base}^(${k}x ${formatSign(b)}) = ${base}^${formatPow(c)}.`;
  const steps: Step[] = [
    {
      explanation: 'Основания степеней одинаковы, приравняем показатели:',
      formula: `${k}x ${formatSign(b)} = ${c}`,
    },
    {
      explanation: 'Перенесём свободный член:',
      formula: `${k}x = ${c} ${formatSign(-b)}`,
    },
    {
      explanation: 'Вычислим:',
      formula: `${k}x = ${c - b}`,
    },
    {
      explanation: `Разделим на ${k}:`,
      formula: `x = ${c - b} / ${k}`,
    },
    {
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
    },
  ];

  return { type: 'exponential', statement, answer: String(x), steps };
}

function formatSign(n: number): string {
  return n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`;
}

function formatPow(n: number): string {
  if (n < 0) return `(${n})`;
  return String(n);
}
