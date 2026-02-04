import { Difficulty, Problem, ProblemType, NumberRange, RANGE_MULTIPLIERS, SUBTOPICS_BY_DIFFICULTY } from './types';
import { generateLinear } from './linear';
import { generateQuadratic } from './quadratic';
import { generateExpSimple, generateExpAdvanced } from './exponential';
import { generateLogarithmic } from './logarithmic';
import { generateIrrational } from './irrational';

type Generator = (scale: number) => Problem;

const GENERATOR_MAP: Record<string, Generator> = {
  'easy:linear': generateLinear,
  'easy:exponential': generateExpSimple,
  'medium:quadratic': generateQuadratic,
  'medium:irrational': generateIrrational,
  'medium:exponential': generateExpAdvanced,
  'hard:logarithmic': generateLogarithmic,
};

export function generateProblems(
  difficulty: Difficulty,
  count: number,
  subtopic: ProblemType | 'all' = 'all',
  numberRange: NumberRange = 'medium',
): Problem[] {
  const scale = RANGE_MULTIPLIERS[numberRange];
  const availableTypes = SUBTOPICS_BY_DIFFICULTY[difficulty];

  // Если выбрана подтема и она доступна на этом уровне — используем только её
  const types = subtopic !== 'all' && availableTypes.includes(subtopic)
    ? [subtopic]
    : availableTypes;

  const gens = types.map((t) => GENERATOR_MAP[`${difficulty}:${t}`]).filter(Boolean);

  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    const gen = gens[i % gens.length];
    problems.push(gen(scale));
  }
  return problems;
}

export { type Problem, type ProblemType, type Difficulty, type NumberRange } from './types';
export { DIFFICULTY_LABELS, PROBLEM_TYPE_LABELS, NUMBER_RANGE_LABELS, SUBTOPICS_BY_DIFFICULTY } from './types';
