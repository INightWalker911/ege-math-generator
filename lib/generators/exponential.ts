import { Problem, Step } from './types';
import { randInt, pick } from '../utils';

const BASES = [2, 3, 5, 7];

/**
 * Простые показательные уравнения (лёгкий уровень).
 * @param scale — множитель для диапазонов чисел
 */
export function generateExpSimple(scale = 1): Problem {
  const base = pick(BASES);
  return pick([() => genExpDirect(base, scale), () => genExpInverse(base, scale)])();
}

/**
 * Показательные уравнения посложнее (средний уровень).
 * @param scale — множитель для диапазонов чисел
 */
export function generateExpAdvanced(scale = 1): Problem {
  return genExpDouble(pick(BASES), scale);
}

/** a^(x+b) = a^c */
function genExpDirect(base: number, scale: number): Problem {
  const maxX = Math.max(3, Math.round(8 * scale));
  const maxB = Math.max(2, Math.round(5 * scale));
  const x = randInt(-maxX, maxX);
  const b = randInt(-maxB, maxB);
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

/** (1/a)^(x+b) = a^c */
function genExpInverse(base: number, scale: number): Problem {
  const maxX = Math.max(2, Math.round(6 * scale));
  const maxB = Math.max(2, Math.round(4 * scale));
  const x = randInt(-maxX, maxX);
  const b = randInt(-maxB, maxB);
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

/** a^(kx+b) = a^c */
function genExpDouble(base: number, scale: number): Problem {
  const maxX = Math.max(2, Math.round(5 * scale));
  const maxB = Math.max(2, Math.round(4 * scale));
  const x = randInt(-maxX, maxX);
  const k = pick([2, 3]);
  const b = randInt(-maxB, maxB);
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
