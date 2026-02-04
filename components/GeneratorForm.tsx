'use client';

import { Difficulty, ProblemType, PROBLEM_TYPE_LABELS, DIFFICULTY_LABELS } from '@/lib/generators';

interface GeneratorFormProps {
  type: ProblemType | 'all';
  difficulty: Difficulty;
  count: number;
  onTypeChange: (type: ProblemType | 'all') => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onCountChange: (count: number) => void;
  onGenerate: () => void;
}

export default function GeneratorForm({
  type,
  difficulty,
  count,
  onTypeChange,
  onDifficultyChange,
  onCountChange,
  onGenerate,
}: GeneratorFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
      {/* Тип уравнения */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Тип уравнения
        </label>
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value as ProblemType | 'all')}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="all">Все типы</option>
          {(Object.entries(PROBLEM_TYPE_LABELS) as [ProblemType, string][]).map(
            ([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            )
          )}
        </select>
      </div>

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
                onClick={() => onDifficultyChange(value)}
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
