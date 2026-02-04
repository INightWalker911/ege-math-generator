'use client';

import { useState } from 'react';
import GeneratorForm from '@/components/GeneratorForm';
import ProblemCard from '@/components/ProblemCard';
import { generateProblems, Problem, ProblemType, Difficulty } from '@/lib/generators';

export default function Home() {
  const [type, setType] = useState<ProblemType | 'all'>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [count, setCount] = useState(5);
  const [problems, setProblems] = useState<Problem[]>([]);

  const handleGenerate = () => {
    setProblems(generateProblems(type, difficulty, count));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Генератор задач ЕГЭ
          </h1>
          <p className="text-gray-500 mt-1">
            Задание 6 — Решение уравнений (базовый уровень)
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Форма настроек */}
        <GeneratorForm
          type={type}
          difficulty={difficulty}
          count={count}
          onTypeChange={setType}
          onDifficultyChange={setDifficulty}
          onCountChange={setCount}
          onGenerate={handleGenerate}
        />

        {/* Список задач */}
        {problems.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Задачи ({problems.length})
              </h2>
              <button
                onClick={handleGenerate}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Сгенерировать заново
              </button>
            </div>
            {problems.map((problem, i) => (
              <ProblemCard key={i} problem={problem} index={i} />
            ))}
          </div>
        )}

        {/* Пустое состояние */}
        {problems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-5xl mb-4">&plusmn;</div>
            <p className="text-gray-500">
              Выберите настройки и нажмите &laquo;Сгенерировать задачи&raquo;
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          Генератор задач ЕГЭ по математике. Задание 6 — Уравнения.
          <br />
          Все задачи генерируются алгоритмически и математически корректны.
        </div>
      </footer>
    </div>
  );
}
