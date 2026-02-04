import { Difficulty, Problem, Step } from './types';
import { randInt, pick } from '../utils';

/**
 * Генератор квадратных уравнений.
 * Обратная генерация: выбираем корни x1, x2, строим уравнение a(x - x1)(x - x2) = 0.
 * Для ЕГЭ базового уровня: если 2 корня, в ответ записываем меньший.
 */
export function generateQuadratic(difficulty: Difficulty): Problem {
  let x1: number, x2: number, a: number;

  switch (difficulty) {
    case 'easy': {
      // a = 1, корни маленькие
      a = 1;
      x1 = randInt(-5, 5);
      x2 = randInt(-5, 5);
      break;
    }
    case 'medium': {
      a = pick([1, 1, 1, 2]);
      x1 = randInt(-8, 8);
      x2 = randInt(-8, 8);
      break;
    }
    case 'hard': {
      a = pick([1, 2, 3]);
      x1 = randInt(-10, 10);
      x2 = randInt(-10, 10);
      while (x2 === x1) x2 = randInt(-10, 10);
      break;
    }
  }

  // a(x - x1)(x - x2) = ax² - a(x1+x2)x + a·x1·x2
  const bCoeff = -a * (x1 + x2);
  const cCoeff = a * x1 * x2;

  const statement = `Решите уравнение: ${formatQuadratic(a, bCoeff, cCoeff)}. Если уравнение имеет более одного корня, в ответе запишите меньший из корней.`;

  const steps: Step[] = [];

  if (x1 === x2) {
    // Один корень (кратный)
    const D = bCoeff * bCoeff - 4 * a * cCoeff;
    steps.push({
      explanation: `Найдём дискриминант: D = b² - 4ac`,
      formula: `D = (${bCoeff})² - 4·${a}·(${cCoeff})`,
    });
    steps.push({
      explanation: 'Вычислим:',
      formula: `D = ${bCoeff * bCoeff} - ${4 * a * cCoeff}`,
    });
    steps.push({
      explanation: `D = ${D}. Дискриминант равен 0, уравнение имеет один корень:`,
      formula: `x = -(${bCoeff}) / (2·${a})`,
    });
    steps.push({
      explanation: 'Получим ответ:',
      formula: `x = ${x1}`,
    });
    return { type: 'quadratic', statement, answer: String(x1), steps };
  }

  const D = bCoeff * bCoeff - 4 * a * cCoeff;
  const sqrtD = Math.sqrt(D);
  const minRoot = Math.min(x1, x2);
  const maxRoot = Math.max(x1, x2);

  steps.push({
    explanation: 'Найдём дискриминант: D = b² - 4ac',
    formula: `D = (${bCoeff})² - 4·${a}·(${cCoeff})`,
  });
  steps.push({
    explanation: 'Вычислим:',
    formula: `D = ${D}`,
  });
  steps.push({
    explanation: 'Дискриминант положителен, найдём корни по формуле:',
    formula: `√D = ${sqrtD}`,
  });
  steps.push({
    explanation: 'Первый корень:',
    formula: `x₁ = (-(${bCoeff}) - ${sqrtD}) / (2·${a}) = ${minRoot}`,
  });
  steps.push({
    explanation: 'Второй корень:',
    formula: `x₂ = (-(${bCoeff}) + ${sqrtD}) / (2·${a}) = ${maxRoot}`,
  });
  steps.push({
    explanation: 'Меньший из корней:',
    formula: `x = ${minRoot}`,
  });

  return {
    type: 'quadratic',
    statement,
    answer: String(minRoot),
    steps,
  };
}

function formatQuadratic(a: number, b: number, c: number): string {
  let result = '';

  // ax²
  if (a === 1) result = 'x²';
  else if (a === -1) result = '-x²';
  else result = `${a}x²`;

  // bx
  if (b !== 0) {
    if (b === 1) result += ' + x';
    else if (b === -1) result += ' - x';
    else if (b > 0) result += ` + ${b}x`;
    else result += ` - ${Math.abs(b)}x`;
  }

  // c
  if (c !== 0) {
    if (c > 0) result += ` + ${c}`;
    else result += ` - ${Math.abs(c)}`;
  }

  return result + ' = 0';
}
