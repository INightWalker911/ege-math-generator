export type Difficulty = 'easy' | 'medium' | 'hard';

export type ProblemType = 'linear' | 'quadratic' | 'exponential' | 'logarithmic' | 'irrational';

export type NumberRange = 'small' | 'medium' | 'large';

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

export const NUMBER_RANGE_LABELS: Record<NumberRange, string> = {
  small: 'Маленькие',
  medium: 'Средние',
  large: 'Большие',
};

/** Какие подтемы доступны на каждом уровне сложности */
export const SUBTOPICS_BY_DIFFICULTY: Record<Difficulty, ProblemType[]> = {
  easy: ['linear', 'exponential'],
  medium: ['quadratic', 'irrational', 'exponential'],
  hard: ['logarithmic'],
};

/** Множитель для диапазонов чисел */
export const RANGE_MULTIPLIERS: Record<NumberRange, number> = {
  small: 0.5,
  medium: 1,
  large: 2,
};
