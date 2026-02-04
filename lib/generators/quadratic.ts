import { Problem, Step } from './types';
import { randInt, pick } from '../utils';

/**
 * Генератор квадратных уравнений (средний уровень).
 * @param scale — множитель для диапазонов чисел
 */
export function generateQuadratic(scale = 1): Problem {
  const maxRoot = Math.max(3, Math.round(8 * scale));
  const a = pick([1, 1, 1, 2]);
  const x1 = randInt(-maxRoot, maxRoot);
  const x2 = randInt(-maxRoot, maxRoot);

  const bCoeff = -a * (x1 + x2);
  const cCoeff = a * x1 * x2;

  const statement = `Решите уравнение: ${formatQuadratic(a, bCoeff, cCoeff)}. Если уравнение имеет более одного корня, в ответе запишите меньший из корней.`;

  const steps: Step[] = [];

  if (x1 === x2) {
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
  const maxRootVal = Math.max(x1, x2);

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
    formula: `x₂ = (-(${bCoeff}) + ${sqrtD}) / (2·${a}) = ${maxRootVal}`,
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

  if (a === 1) result = 'x²';
  else if (a === -1) result = '-x²';
  else result = `${a}x²`;

  if (b !== 0) {
    if (b === 1) result += ' + x';
    else if (b === -1) result += ' - x';
    else if (b > 0) result += ` + ${b}x`;
    else result += ` - ${Math.abs(b)}x`;
  }

  if (c !== 0) {
    if (c > 0) result += ` + ${c}`;
    else result += ` - ${Math.abs(c)}`;
  }

  return result + ' = 0';
}
