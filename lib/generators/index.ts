import { Difficulty, Problem, ProblemType } from './types';
import { generateLinear } from './linear';
import { generateQuadratic } from './quadratic';
import { generateExponential } from './exponential';
import { generateLogarithmic } from './logarithmic';
import { generateIrrational } from './irrational';

const generators: Record<ProblemType, (d: Difficulty) => Problem> = {
  linear: generateLinear,
  quadratic: generateQuadratic,
  exponential: generateExponential,
  logarithmic: generateLogarithmic,
  irrational: generateIrrational,
};

const ALL_TYPES: ProblemType[] = ['linear', 'quadratic', 'exponential', 'logarithmic', 'irrational'];

export function generateProblem(type: ProblemType, difficulty: Difficulty): Problem {
  return generators[type](difficulty);
}

export function generateProblems(
  type: ProblemType | 'all',
  difficulty: Difficulty,
  count: number
): Problem[] {
  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    const t = type === 'all' ? ALL_TYPES[i % ALL_TYPES.length] : type;
    problems.push(generateProblem(t, difficulty));
  }
  return problems;
}

export { type Problem, type ProblemType, type Difficulty } from './types';
export { PROBLEM_TYPE_LABELS, DIFFICULTY_LABELS } from './types';
