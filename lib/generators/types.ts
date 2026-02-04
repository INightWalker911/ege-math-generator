export type Difficulty = 'easy' | 'medium' | 'hard';

export type ProblemType = 'linear' | 'quadratic' | 'exponential' | 'logarithmic' | 'irrational';

export interface Step {
  explanation: string;
  formula: string;
}

export interface Problem {
  type: ProblemType;
  statement: string;
  answer: string;
  steps: Step[];
}

export const PROBLEM_TYPE_LABELS: Record<ProblemType, string> = {
  linear: 'Линейное уравнение',
  quadratic: 'Квадратное уравнение',
  exponential: 'Показательное уравнение',
  logarithmic: 'Логарифмическое уравнение',
  irrational: 'Иррациональное уравнение',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
};
