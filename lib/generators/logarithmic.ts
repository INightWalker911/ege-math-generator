import { Problem, Step } from './types';
import { randInt, pick } from '../utils';

/**
 * Генератор логарифмических уравнений (сложный уровень).
 * @param scale — множитель для диапазонов чисел
 */
export function generateLogarithmic(scale = 1): Problem {
  const base = pick([2, 3, 5]);
  return pick([() => genLog(base, scale), () => genLogFraction(base, scale)])();
}

/** log_a(bx + c) = d */
function genLog(base: number, scale: number): Problem {
  const maxPow = scale >= 1.5 ? 3 : 2;
  const d = randInt(1, maxPow);
  const aToD = Math.pow(base, d);
  const b = pick([1, 1, 2, 3]);
  const maxX = Math.max(3, Math.round(15 * scale));
  const x = randInt(1, maxX);
  const c = aToD - b * x;

  const inner = b === 1 ? formatInner(1, c, 'x') : formatInner(b, c, 'x');

  const statement = `Решите уравнение: log${subscript(base)}(${inner}) = ${d}.`;

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
function genLogFraction(base: number, scale: number): Problem {
  const d = pick([-1, -2, 1, 2]);
  const aToMinusD = Math.pow(base, -d);
  const maxX = Math.max(3, Math.round(20 * scale));
  const x = randInt(1, maxX);
  const b = 1;
  const c = aToMinusD - x;

  const inner = formatInner(b, c, 'x');

  const statement = `Решите уравнение: log(1/${base})(${inner}) = ${d}.`;

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

const SUBSCRIPT_DIGITS = '₀₁₂₃₄₅₆₇₈₉';

function subscript(n: number): string {
  return String(n)
    .split('')
    .map((ch) => SUBSCRIPT_DIGITS[Number(ch)] ?? ch)
    .join('');
}

function formatInner(b: number, c: number, v: string): string {
  let result = b === 1 ? v : `${b}${v}`;
  if (c > 0) result += ` + ${c}`;
  else if (c < 0) result += ` - ${Math.abs(c)}`;
  return result;
}
