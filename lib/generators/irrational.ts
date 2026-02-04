import { Problem, Step } from './types';
import { randInt, pick } from '../utils';

/**
 * Генератор иррациональных уравнений (средний уровень).
 * @param scale — множитель для диапазонов чисел
 */
export function generateIrrational(scale = 1): Problem {
  return pick([
    () => genSqrtSimple(scale),
    () => genSqrtWithCoeff(scale),
    () => genSqrtEquation(scale),
  ])();
}

/** √(x + b) = c */
function genSqrtSimple(scale: number): Problem {
  const maxC = Math.max(2, Math.round(8 * scale));
  const c = randInt(1, maxC);
  const b = randInt(-10, Math.round(20 * scale));
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
function genSqrtWithCoeff(scale: number): Problem {
  const maxC = Math.max(2, Math.round(7 * scale));
  const c = randInt(1, maxC);
  const a = pick([2, 3, 4, 5]);
  const maxX = Math.max(3, Math.round(15 * scale));
  const x = randInt(-Math.round(5 * scale), maxX);
  const b = c * c - a * x;

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

/** √(ax + b) = x + d */
function genSqrtEquation(scale: number): Problem {
  const maxX = Math.max(2, Math.round(8 * scale));
  const x = randInt(1, maxX);
  const d = randInt(-x, Math.round(5 * scale));
  const rightSide = x + d;

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
