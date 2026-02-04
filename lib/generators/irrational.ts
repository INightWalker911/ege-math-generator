import { Difficulty, Problem, Step } from './types';
import { randInt, pick } from '../utils';

/**
 * Генератор иррациональных уравнений.
 * √(ax + b) = c  =>  ax + b = c²  =>  x = (c² - b) / a
 * Обратная генерация: выбираем x и c (c >= 0), строим уравнение.
 */
export function generateIrrational(difficulty: Difficulty): Problem {
  switch (difficulty) {
    case 'easy':
      return genSqrtSimple();
    case 'medium':
      return genSqrtWithCoeff();
    case 'hard':
      return genSqrtEquation();
  }
}

/** √(x + b) = c */
function genSqrtSimple(): Problem {
  const c = randInt(1, 8);
  const b = randInt(-10, 20);
  const x = c * c - b;

  const inner = formatInner(1, b, 'x');
  const statement = `Решите уравнение: √(${inner}) = ${c}.`;

  const steps: Step[] = [
    {
      explanation: 'Возведём обе части уравнения в квадрат:',
      formula: `${inner} = ${c}²`,
    },
    {
      explanation: 'Вычислим:',
      formula: `${inner} = ${c * c}`,
    },
    {
      explanation: `Перенесём (${b}) в правую часть:`,
      formula: `x = ${c * c} ${b >= 0 ? '- ' + b : '+ ' + Math.abs(b)}`,
    },
    {
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
    },
    {
      explanation: 'Проверка: подставим x в исходное уравнение:',
      formula: `√(${x} ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}) = √${c * c} = ${c} ✓`,
    },
  ];

  return { type: 'irrational', statement, answer: String(x), steps };
}

/** √(ax + b) = c, a > 1 */
function genSqrtWithCoeff(): Problem {
  const c = randInt(1, 7);
  const a = pick([2, 3, 4, 5]);
  const x = randInt(-5, 15);
  const b = c * c - a * x;

  // Проверяем ax + b >= 0 (должно быть = c² >= 0, всегда верно)
  const inner = formatInner(a, b, 'x');
  const statement = `Решите уравнение: √(${inner}) = ${c}.`;

  const steps: Step[] = [
    {
      explanation: 'Возведём обе части уравнения в квадрат:',
      formula: `${inner} = ${c}²`,
    },
    {
      explanation: 'Вычислим:',
      formula: `${inner} = ${c * c}`,
    },
    {
      explanation: `Перенесём (${b}) в правую часть:`,
      formula: `${a}x = ${c * c} ${b >= 0 ? '- ' + b : '+ ' + Math.abs(b)}`,
    },
    {
      explanation: 'Вычислим:',
      formula: `${a}x = ${c * c - b}`,
    },
    {
      explanation: `Разделим на ${a}:`,
      formula: `x = ${c * c - b} / ${a}`,
    },
    {
      explanation: 'Получим ответ:',
      formula: `x = ${x}`,
    },
    {
      explanation: 'Проверка ОДЗ: подкоренное выражение неотрицательно:',
      formula: `${a}·(${x}) + (${b}) = ${c * c} ≥ 0 ✓`,
    },
  ];

  return { type: 'irrational', statement, answer: String(x), steps };
}

/** √(ax + b) = x + d (с проверкой посторонних корней) */
function genSqrtEquation(): Problem {
  // Выбираем x — корень, и d, чтобы x + d ≥ 0
  const x = randInt(1, 8);
  const d = randInt(-x, 5); // x + d >= 0
  const rightSide = x + d;

  // ax + b = (x + d)² = x² + 2dx + d²
  // Значит √(ax + b) = x + d => ax + b = rightSide²
  const a = pick([1, 2, 3]);
  const b = rightSide * rightSide - a * x;

  const inner = formatInner(a, b, 'x');
  const statement = `Решите уравнение: √(${inner}) = x ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)}.`;

  const steps: Step[] = [
    {
      explanation: 'ОДЗ: правая часть должна быть неотрицательной, подкоренное выражение ≥ 0.',
      formula: `x ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)} ≥ 0, ${inner} ≥ 0`,
    },
    {
      explanation: 'Возведём обе части в квадрат:',
      formula: `${inner} = (x ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)})²`,
    },
    {
      explanation: `Подставим x = ${x} в обе части и проверим:`,
      formula: `Левая: √(${a * x + b}) = ${rightSide}`,
    },
    {
      explanation: `Правая часть:`,
      formula: `${x} ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)} = ${rightSide} ✓`,
    },
  ];

  return { type: 'irrational', statement, answer: String(x), steps };
}

function formatInner(a: number, b: number, v: string): string {
  let result = a === 1 ? v : `${a}${v}`;
  if (b > 0) result += ` + ${b}`;
  else if (b < 0) result += ` - ${Math.abs(b)}`;
  return result;
}
