import { Difficulty, Problem, Step } from './types';
import { randInt, pick } from '../utils';

/**
 * Генератор логарифмических уравнений.
 * log_a(bx + c) = d  =>  bx + c = a^d  =>  x = (a^d - c) / b
 * Обратная генерация: выбираем x, a, b, d, вычисляем c = a^d - b*x
 */
export function generateLogarithmic(difficulty: Difficulty): Problem {
  switch (difficulty) {
    case 'easy':
      return genLog(pick([2, 3, 5]), 1);
    case 'medium':
      return genLog(pick([2, 3, 5, 7]), 2);
    case 'hard':
      return genLogFraction(pick([2, 3, 5]));
  }
}

/** log_a(bx + c) = d */
function genLog(base: number, maxPower: number): Problem {
  const d = randInt(1, maxPower + 1);
  const aToD = Math.pow(base, d);
  const b = pick([1, 1, 2, 3]);
  const x = randInt(1, 15);
  const c = aToD - b * x;

  // Проверяем ОДЗ: bx + c > 0 => bx + c = a^d > 0 — всегда верно
  const inner = b === 1 ? formatInner(1, c, 'x') : formatInner(b, c, 'x');

  const statement = `Решите уравнение: log${subscript(base)}(${inner}) = ${d}.`;

  // Решение ОДЗ: bx + c > 0 => bx > -c => x > -c/b
  const odzBound = -c / b;
  const odzSteps: Step[] = [
    {
      explanation: `ОДЗ: аргумент логарифма должен быть положительным:`,
      formula: `${inner} > 0`,
    },
  ];
  if (b !== 1) {
    odzSteps.push({
      explanation: `Перенесём (${c}) в правую часть:`,
      formula: `${b}x > ${-c}`,
    });
    odzSteps.push({
      explanation: `Разделим на ${b}:`,
      formula: `x > ${odzBound}`,
    });
  } else {
    odzSteps.push({
      explanation: `Решим неравенство:`,
      formula: `x > ${-c}`,
    });
  }

  const steps: Step[] = [
    ...odzSteps,
    {
      explanation: `По определению логарифма, перейдём к показательной форме:`,
      formula: `${inner} = ${base}^${d}`,
    },
    {
      explanation: `Вычислим ${base}^${d}:`,
      formula: `${inner} = ${aToD}`,
    },
  ];

  if (b !== 1) {
    steps.push({
      explanation: `Перенесём (${c}) в правую часть:`,
      formula: `${b}x = ${aToD} ${c >= 0 ? '- ' + c : '+ ' + Math.abs(c)}`,
    });
    steps.push({
      explanation: 'Вычислим:',
      formula: `${b}x = ${aToD - c}`,
    });
    steps.push({
      explanation: `Разделим на ${b}:`,
      formula: `x = ${aToD - c} / ${b}`,
    });
    steps.push({
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
    });
  } else {
    steps.push({
      explanation: `Перенесём (${c}) в правую часть:`,
      formula: `x = ${aToD} ${c >= 0 ? '- ' + c : '+ ' + Math.abs(c)}`,
    });
    steps.push({
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
    });
  }

  steps.push({
    explanation: `Проверка ОДЗ: подставим x = ${x}:`,
    formula: `${b === 1 ? '' : b + '·'}${x} ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = ${aToD} > 0 ✓`,
  });

  return { type: 'logarithmic', statement, answer: String(x), steps };
}

/** log_{1/a}(bx + c) = d */
function genLogFraction(base: number): Problem {
  const d = pick([-1, -2, 1, 2]);
  // log_{1/a}(expr) = d  =>  (1/a)^d = expr  =>  a^(-d) = expr
  const aToMinusD = Math.pow(base, -d);
  const x = randInt(1, 20);
  const b = 1;
  const c = aToMinusD - x;

  const inner = formatInner(b, c, 'x');

  const statement = `Решите уравнение: log(1/${base})(${inner}) = ${d}.`;

  // Решение ОДЗ: x + c > 0 => x > -c
  const steps: Step[] = [
    {
      explanation: `ОДЗ: аргумент логарифма должен быть положительным:`,
      formula: `${inner} > 0`,
    },
    {
      explanation: `Решим неравенство:`,
      formula: `x > ${-c}`,
    },
    {
      explanation: `По определению логарифма:`,
      formula: `${inner} = (1/${base})^${d < 0 ? '(' + d + ')' : d}`,
    },
    {
      explanation: `Преобразуем: (1/${base})^${d} = ${base}^(${-d}):`,
      formula: `${inner} = ${aToMinusD}`,
    },
    {
      explanation: `Перенесём (${c}) в правую часть:`,
      formula: `x = ${aToMinusD} ${c >= 0 ? '- ' + c : '+ ' + Math.abs(c)}`,
    },
    {
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
    },
    {
      explanation: `Проверка ОДЗ: подставим x = ${x}:`,
      formula: `${x} ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = ${aToMinusD} > 0 ✓`,
    },
  ];

  return { type: 'logarithmic', statement, answer: String(x), steps };
}

function subscript(n: number): string {
  return `₍${n}₎`;
}

function formatInner(b: number, c: number, v: string): string {
  let result = b === 1 ? v : `${b}${v}`;
  if (c > 0) result += ` + ${c}`;
  else if (c < 0) result += ` - ${Math.abs(c)}`;
  return result;
}
