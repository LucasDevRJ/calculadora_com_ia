import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const allAnswered = QUIZ_QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  const correctCount = QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <section id="quiz" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Fixação de Conteúdo</span>
            <span aria-hidden="true">·</span>
            <span>4 Questões Rápidas</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 font-semibold">Autoavaliação</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Quiz: Você Dominou os Fundamentos?
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Responda e veja se você já está pronto para programar sua própria calculadora sem colar!
          </p>
        </div>

        {showResults && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
              Acertos: {correctCount} de {QUIZ_QUESTIONS.length}
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Quiz</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-200 bg-rose-50/30'
                  : 'border-slate-200 bg-slate-50/40'
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2 ml-9">
                {q.options.map((opt, optIndex) => {
                  const isThisSelected = userAnswer === optIndex;
                  const isThisCorrect = optIndex === q.correctIndex;

                  let optionStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';

                  if (showResults) {
                    if (isThisCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-100/70 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle = 'border-rose-400 bg-rose-100 text-rose-900';
                    } else {
                      optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-70';
                    }
                  } else if (isThisSelected) {
                    optionStyle = 'border-blue-600 bg-blue-50/60 text-blue-900 font-medium ring-1 ring-blue-600';
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => !showResults && handleSelectOption(q.id, optIndex)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between transition-colors ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {showResults && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {showResults && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after checking */}
              {showResults && (
                <div className="mt-4 ml-9 p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold block text-slate-900 mb-1">
                    Explicação:
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Action */}
        {!showResults && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setShowResults(true)}
              disabled={!allAnswered}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                allAnswered
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {allAnswered ? 'Verificar Respostas' : `Responda todas as perguntas (${Object.keys(selectedAnswers).length}/${QUIZ_QUESTIONS.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
