'use client';

import {
  Difficulty,
  ProblemType,
  NumberRange,
  DIFFICULTY_LABELS,
  PROBLEM_TYPE_LABELS,
  NUMBER_RANGE_LABELS,
  SUBTOPICS_BY_DIFFICULTY,
} from '@/lib/generators';

interface GeneratorFormProps {
  difficulty: Difficulty;
  subtopic: ProblemType | 'all';
  numberRange: NumberRange;
  count: number;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onSubtopicChange: (subtopic: ProblemType | 'all') => void;
  onNumberRangeChange: (range: NumberRange) => void;
  onCountChange: (count: number) => void;
  onGenerate: () => void;
}

const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  easy: 'Линейные и простые показательные уравнения',
  medium: 'Квадратные, иррациональные и показательные уравнения',
  hard: 'Логарифмические уравнения',
};

export default function GeneratorForm({
  difficulty,
  subtopic,
  numberRange,
  count,
  onDifficultyChange,
  onSubtopicChange,
  onNumberRangeChange,
  onCountChange,
  onGenerate,
}: GeneratorFormProps) {
  const availableSubtopics = SUBTOPICS_BY_DIFFICULTY[difficulty];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
      {/* Сложность */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Уровень сложности
        </label>
        <div className="flex gap-2">
          {(Object.entries(DIFFICULTY_LABELS) as [Difficulty, string][]).map(
            ([value, label]) => (
              <button
                key={value}
                onClick={() => {
                  onDifficultyChange(value);
                  onSubtopicChange('all');
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  difficulty === value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {DIFFICULTY_DESCRIPTIONS[difficulty]}
        </p>
      </div>

      {/* Подтема */}
      {availableSubtopics.length > 1 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Подтема
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onSubtopicChange('all')}
              className={`py-1.5 px-3 rounded-lg text-sm font-medium transition ${
                subtopic === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Все
            </button>
            {availableSubtopics.map((type) => (
              <button
                key={type}
                onClick={() => onSubtopicChange(type)}
                className={`py-1.5 px-3 rounded-lg text-sm font-medium transition ${
                  subtopic === type
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {PROBLEM_TYPE_LABELS[type].replace(' уравнение', '')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Диапазон чисел */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Диапазон чисел
        </label>
        <div className="flex gap-2">
          {(Object.entries(NUMBER_RANGE_LABELS) as [NumberRange, string][]).map(
            ([value, label]) => (
              <button
                key={value}
                onClick={() => onNumberRangeChange(value)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  numberRange === value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Количество задач */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Количество задач: {count}
        </label>
        <input
          type="range"
          min={1}
          max={20}
          value={count}
          onChange={(e) => onCountChange(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1</span>
          <span>10</span>
          <span>20</span>
        </div>
      </div>

      {/* Кнопка */}
      <button
        onClick={onGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition shadow-sm active:scale-[0.98]"
      >
        Сгенерировать задачи
      </button>
    </div>
  );
}
