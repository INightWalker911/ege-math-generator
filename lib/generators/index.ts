import { Difficulty, Problem } from './types';
import { generateLinear } from './linear';
import { generateQuadratic } from './quadratic';
import { generateExpSimple, generateExpAdvanced } from './exponential';
import { generateLogarithmic } from './logarithmic';
import { generateIrrational } from './irrational';

/**
 * Сложность определяет, какие типы уравнений генерируются:
 * - easy:   линейные + простые показательные
 * - medium: квадратные + иррациональные + показательные (посложнее)
 * - hard:   логарифмические
 */
const DIFFICULTY_GENERATORS: Record<Difficulty, (() => Problem)[]> = {
  easy: [generateLinear, generateExpSimple],
  medium: [generateQuadratic, generateIrrational, generateExpAdvanced],
  hard: [generateLogarithmic],
};

export function generateProblems(
  difficulty: Difficulty,
  count: number
): Problem[] {
  const gens = DIFFICULTY_GENERATORS[difficulty];
  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    const gen = gens[i % gens.length];
    problems.push(gen());
  }
  return problems;
}

export { type Problem, type ProblemType, type Difficulty } from './types';
export { DIFFICULTY_LABELS, PROBLEM_TYPE_LABELS } from './types';
