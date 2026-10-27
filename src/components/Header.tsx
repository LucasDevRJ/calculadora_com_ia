import React from 'react';
import { Download, Code2, Terminal, Cpu, BookOpen, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onDownloadCode: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownloadCode, activeSection, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand wordmark (single text element) */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            Py
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Calculadora Python
          </span>
        </div>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('codigo')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeSection === 'codigo' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Código & Versões
          </button>
          <button
            onClick={() => onNavigate('terminal')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeSection === 'terminal' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Simulador Python
          </button>
          <button
            onClick={() => onNavigate('visual')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeSection === 'visual' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Calculadora Visual
          </button>
          <button
            onClick={() => onNavigate('conceitos')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeSection === 'conceitos' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Explicação dos Componentes
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeSection === 'quiz' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Quiz de Fixação
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDownloadCode}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs active:scale-[0.98]"
            title="Baixar arquivo calculadora.py pronto para rodar"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar calculadora.py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
