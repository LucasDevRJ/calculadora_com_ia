import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { VisualCalculatorSync } from './components/VisualCalculatorSync';
import { ConceptExplainer } from './components/ConceptExplainer';
import { QuizSection } from './components/QuizSection';
import { HowToRunGuide } from './components/HowToRunGuide';
import { PYTHON_VERSIONS } from './data/calculatorCodes';
import { PythonCodeVersion } from './types';
import { Terminal, Code2, Download, ArrowDown, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedVersion, setSelectedVersion] = useState<PythonCodeVersion>(
    PYTHON_VERSIONS[0]
  );
  const [activeSection, setActiveSection] = useState('codigo');

  const handleDownloadCode = () => {
    const filename = `calculadora_${selectedVersion.id}.py`;
    const blob = new Blob([selectedVersion.code], {
      type: 'text/x-python;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRunInTerminal = (_code: string) => {
    setActiveSection('terminal');
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header (Adhering to Top Bar Contract) */}
      <Header
        onDownloadCode={handleDownloadCode}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 2. Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 md:py-12 space-y-12">
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>Guia do Programador Iniciante</span>
            <span aria-hidden="true">·</span>
            <span>Python 3</span>
            <span aria-hidden="true">·</span>
            <span>As 4 Operações Básicas (+, -, *, /)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Aprenda a Criar Sua Primeira Calculadora em Python
          </h1>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Bem-vindo ao mundo da programação! Criar uma calculadora é o rito de passagem clássico:
            você vai aprender na prática a coletar dados do teclado com <code className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono text-xs">input()</code>,
            converter texto para número com <code className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono text-xs">float()</code>,
            tomar decisões com <code className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono text-xs">if/elif/else</code> e exibir resultados com <code className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono text-xs">f-strings</code>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleNavigate('codigo')}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>Ver Código & Explicações</span>
            </button>
            <button
              onClick={() => handleNavigate('terminal')}
              className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Testar no Simulador</span>
            </button>
            <button
              onClick={handleDownloadCode}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Arquivo .py</span>
            </button>
          </div>
        </section>

        {/* 3. Section 1: The Code & Annotations */}
        <CodeViewer
          versions={PYTHON_VERSIONS}
          selectedVersion={selectedVersion}
          onSelectVersion={setSelectedVersion}
          onRunInTerminal={handleRunInTerminal}
        />

        {/* 4. Section 2: Interactive Terminal Simulation */}
        <InteractiveTerminal />

        {/* 5. Section 3: Visual Calculator vs Python Mental Model */}
        <VisualCalculatorSync />

        {/* 6. Section 4: Deep Dive into Code Components */}
        <ConceptExplainer />

        {/* 7. Section 5: Quiz for Knowledge Reinforcement */}
        <QuizSection />

        {/* 8. Section 6: How to Run on PC Guide */}
        <HowToRunGuide />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Calculadora Python</span>
            <span>·</span>
            <span>Material Didático para Iniciantes em Programação</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Python 3.12+</span>
            <span>·</span>
            <span>4 Operações Matemáticas</span>
            <span>·</span>
            <span>Código Aberto</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
