'use client';

import { useState } from 'react';
import GeneratorForm from '@/components/GeneratorForm';
import ProblemCard from '@/components/ProblemCard';
import { generateProblems, Problem, ProblemType, Difficulty, NumberRange } from '@/lib/generators';

export default function Home() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [subtopic, setSubtopic] = useState<ProblemType | 'all'>('all');
  const [numberRange, setNumberRange] = useState<NumberRange>('medium');
  const [count, setCount] = useState(5);
  const [problems, setProblems] = useState<Problem[]>([]);

  const handleGenerate = () => {
    setProblems(generateProblems(difficulty, count, subtopic, numberRange));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 print:border-none">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Генератор задач ЕГЭ
          </h1>
          <p className="text-gray-500 mt-1">
            Задание 17 — Решение уравнений (базовый уровень)
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Форма настроек */}
        <div className="print:hidden">
          <GeneratorForm
            difficulty={difficulty}
            subtopic={subtopic}
            numberRange={numberRange}
            count={count}
            onDifficultyChange={setDifficulty}
            onSubtopicChange={setSubtopic}
            onNumberRangeChange={setNumberRange}
            onCountChange={setCount}
            onGenerate={handleGenerate}
          />
        </div>

        {/* Список задач */}
        {problems.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between print:hidden">
              <h2 className="text-lg font-semibold text-gray-900">
                Задачи ({problems.length})
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  Распечатать
                </button>
                <button
                  onClick={handleGenerate}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Сгенерировать заново
                </button>
              </div>
            </div>
            {problems.map((problem, i) => (
              <ProblemCard key={i} problem={problem} index={i} />
            ))}
          </div>
        )}

        {/* Пустое состояние */}
        {problems.length === 0 && (
          <div className="text-center py-16 print:hidden">
            <div className="text-gray-400 text-5xl mb-4">&plusmn;</div>
            <p className="text-gray-500">
              Выберите настройки и нажмите &laquo;Сгенерировать задачи&raquo;
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          Генератор задач ЕГЭ по математике. Задание 17 — Уравнения.
          <br />
          Все задачи генерируются алгоритмически и математически корректны.
        </div>
      </footer>
    </div>
  );
}
