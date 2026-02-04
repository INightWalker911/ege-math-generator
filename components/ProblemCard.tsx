'use client';

import { useState } from 'react';
import { Problem, PROBLEM_TYPE_LABELS } from '@/lib/generators';

interface ProblemCardProps {
  problem: Problem;
  index: number;
}

export default function ProblemCard({ problem, index }: ProblemCardProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="problem-card bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Заголовок */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">
            {index + 1}
          </span>
          <span className="text-sm text-gray-500">
            {PROBLEM_TYPE_LABELS[problem.type]}
          </span>
        </div>
      </div>

      {/* Условие */}
      <div className="px-6 py-5">
        <p className="text-lg text-gray-900 leading-relaxed">{problem.statement}</p>
      </div>

      {/* Кнопки */}
      <div className="px-6 pb-4 flex gap-3 print:hidden">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            showAnswer
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {showAnswer ? 'Скрыть ответ' : 'Показать ответ'}
        </button>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            showSolution
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {showSolution ? 'Скрыть решение' : 'Показать решение'}
        </button>
      </div>

      {/* Ответ */}
      <div className={`${showAnswer ? '' : 'hidden'} print:block px-6 pb-4`}>
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <span className="text-sm font-medium text-green-700">Ответ: </span>
          <span className="text-lg font-bold text-green-800">{problem.answer}</span>
        </div>
      </div>

      {/* Пошаговое решение */}
      <div className={`${showSolution ? '' : 'hidden'} print:block px-6 pb-5`}>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            Пошаговое решение:
          </h4>
          {problem.steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-sm text-blue-700">{step.explanation}</p>
                <p className="text-base font-mono text-blue-900 mt-1">
                  {step.formula}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
