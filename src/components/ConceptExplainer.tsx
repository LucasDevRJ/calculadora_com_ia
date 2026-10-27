import React, { useState } from 'react';
import { CONCEPTS_DATA } from '../data/explanations';
import { BookOpen, CheckCircle, AlertCircle, Code, Lightbulb } from 'lucide-react';

export const ConceptExplainer: React.FC = () => {
  const [activeConceptId, setActiveConceptId] = useState(CONCEPTS_DATA[0].id);

  const activeConcept =
    CONCEPTS_DATA.find((c) => c.id === activeConceptId) || CONCEPTS_DATA[0];

  return (
    <section id="conceitos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Guia Teórico & Prático</span>
          <span aria-hidden="true">·</span>
          <span>Para Iniciantes</span>
          <span aria-hidden="true">·</span>
          <span className="text-blue-600 font-semibold">Os 5 Pilares do Código</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Explicação Detalhada dos Componentes
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Entenda a fundo cada comando utilizado na construção da calculadora em Python e evite erros clássicos de quem está começando.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Navigation / Concept List (4 cols) */}
        <div className="lg:col-span-4 p-4 bg-slate-50/50 space-y-1.5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            Selecione um Conceito
          </p>
          {CONCEPTS_DATA.map((concept) => {
            const isSelected = concept.id === activeConceptId;
            return (
              <button
                key={concept.id}
                onClick={() => setActiveConceptId(concept.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-white shadow-xs border border-slate-200 ring-1 ring-blue-500/20'
                    : 'hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                    {concept.title}
                  </span>
                </div>
                <code className="text-[11px] font-mono text-slate-500 block truncate">
                  {concept.pythonSyntax}
                </code>
              </button>
            );
          })}
        </div>

        {/* Detailed Concept View (8 cols) */}
        <div className="lg:col-span-8 p-6 lg:p-8 bg-white flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 font-mono text-xs font-medium rounded-md mb-2">
                {activeConcept.pythonSyntax}
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {activeConcept.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {activeConcept.details}
              </p>
            </div>

            {/* Code Example Box */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-blue-400" />
                <span>Exemplo Prático</span>
              </div>
              <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-slate-200">
                {activeConcept.example}
              </pre>
            </div>

            {/* Why It Matters & Common Mistake Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
                  <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Por que isso é essencial?</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {activeConcept.whyItMatters}
                </p>
              </div>

              <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Pegadinha / Erro Comum</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {activeConcept.commonMistake}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Dica: Treine modificando pequenos pedaços desse código para ver a reação do Python!</span>
          </div>
        </div>
      </div>
    </section>
  );
};
