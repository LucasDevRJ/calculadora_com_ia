import React, { useState } from 'react';
import { PythonCodeVersion, CodeLineAnnotation } from '../types';
import { Copy, Check, Terminal, Play, Info, Sparkles } from 'lucide-react';

interface CodeViewerProps {
  versions: PythonCodeVersion[];
  selectedVersion: PythonCodeVersion;
  onSelectVersion: (version: PythonCodeVersion) => void;
  onRunInTerminal: (code: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  versions,
  selectedVersion,
  onSelectVersion,
  onRunInTerminal,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<CodeLineAnnotation | null>(
    selectedVersion.annotations[0] || null
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedVersion.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectVersionChange = (version: PythonCodeVersion) => {
    onSelectVersion(version);
    setActiveAnnotation(version.annotations[0] || null);
  };

  // Basic Python syntax highlighter for the code view
  const lines = selectedVersion.code.split('\n');

  return (
    <section id="codigo" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Bar with Level Selection */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Níveis de Aprendizado</span>
            <span aria-hidden="true">·</span>
            <span>{selectedVersion.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-blue-700">{selectedVersion.badge}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {selectedVersion.title}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            {selectedVersion.description}
          </p>
        </div>

        {/* Level Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
          {versions.map((ver) => {
            const isSelected = ver.id === selectedVersion.id;
            return (
              <button
                key={ver.id}
                onClick={() => handleSelectVersionChange(ver)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {ver.id === 'basico' && '1. Essencial'}
                {ver.id === 'funcoes' && '2. Com Funções'}
                {ver.id === 'loop' && '3. Com Loop'}
                {ver.id === 'try_except' && '4. Tratamento de Erros'}
                {ver.id === 'sete_operadores' && '5. 7 Operadores'}
                {ver.id === 'historico' && '6. Histórico (Listas)'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Code Left, Explanations Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Code Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950 text-slate-100">
          {/* Code Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-slate-400 font-mono ml-2">calculadora_{selectedVersion.id}.py</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                title="Copiar código para a área de transferência"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>

              <button
                onClick={() => onRunInTerminal(selectedVersion.code)}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors font-medium shadow-xs"
                title="Testar este código agora no simulador"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Executar no Terminal</span>
              </button>
            </div>
          </div>

          {/* Interactive Code Container */}
          <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed max-h-[560px] overflow-y-auto">
            <p className="text-[11px] text-slate-400 mb-3 italic font-sans flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              Dica: clique nas linhas marcadas para ver a explicação detalhada de cada comando.
            </p>

            <table className="w-full border-collapse">
              <tbody>
                {lines.map((lineText, index) => {
                  const lineNum = index + 1;
                  const annotation = selectedVersion.annotations.find(
                    (a) => a.lineNumber === lineNum
                  );
                  const isAnnotated = Boolean(annotation);
                  const isCurrentActive = activeAnnotation?.lineNumber === lineNum;

                  return (
                    <tr
                      key={lineNum}
                      onClick={() => annotation && setActiveAnnotation(annotation)}
                      className={`group transition-colors ${
                        isAnnotated ? 'cursor-pointer hover:bg-slate-800/80' : ''
                      } ${isCurrentActive ? 'bg-blue-950/60 ring-1 ring-blue-500/50' : ''}`}
                    >
                      {/* Line Number */}
                      <td className="w-10 pr-3 text-right select-none text-slate-600 group-hover:text-slate-400 font-mono text-xs py-0.5">
                        {lineNum}
                      </td>

                      {/* Code Content */}
                      <td className="pl-2 py-0.5 whitespace-pre">
                        <HighlightPythonLine text={lineText} />
                      </td>

                      {/* Indicator tag */}
                      <td className="w-6 text-center select-none py-0.5">
                        {isAnnotated && (
                          <span
                            className={`inline-block w-2 h-2 rounded-full transition-transform ${
                              isCurrentActive
                                ? 'bg-blue-400 scale-125'
                                : 'bg-slate-500 group-hover:bg-blue-400'
                            }`}
                            title="Clique para ver a explicação desta linha"
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Explanation Column (5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Info className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                Raio-X da Linha Selecionada
              </h3>
            </div>

            {activeAnnotation ? (
              <div className="space-y-4">
                <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-1">
                    Linha {activeAnnotation.lineNumber}:
                  </span>
                  <code>{activeAnnotation.code}</code>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 text-base mb-1">
                    {activeAnnotation.conceptTitle}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeAnnotation.explanation}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeAnnotation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500 italic py-8 text-center">
                Clique em qualquer linha marcada com um ponto azul para ver o que o Python está fazendo.
              </div>
            )}
          </div>

          {/* Quick Concept Highlights for this version */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Conceitos Fundamentais Desta Versão
            </h4>
            <ul className="space-y-2">
              {selectedVersion.keyHighlights.map((hl, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onRunInTerminal(selectedVersion.code)}
              className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Experimentar no Terminal Interativo</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Lightweight Python Syntax Highlighter for Clean Presentation
function HighlightPythonLine({ text }: { text: string }) {
  if (text.trim().startsWith('#')) {
    return <span className="text-slate-500 italic">{text}</span>;
  }

  // Tokens breakdown
  // Keywords
  const keywords = ['def', 'return', 'if', 'elif', 'else', 'while', 'break', 'continue', 'try', 'except', 'in', 'not'];
  const builtins = ['print', 'input', 'float', 'int', 'str', 'len', 'True', 'False', 'None'];

  // Check if line contains a comment at the end
  let codePart = text;
  let commentPart = '';
  const commentIndex = text.indexOf('#');
  if (commentIndex !== -1) {
    codePart = text.substring(0, commentIndex);
    commentPart = text.substring(commentIndex);
  }

  // Render tokens
  return (
    <span>
      {renderTokens(codePart, keywords, builtins)}
      {commentPart && <span className="text-slate-500 italic">{commentPart}</span>}
    </span>
  );
}

function renderTokens(text: string, keywords: string[], builtins: string[]) {
  // Simple regex for string literals and words
  const parts = text.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b\w+\b|[^\w\s"']+)/g);

  return parts.map((part, index) => {
    if (!part) return null;

    // String literals
    if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
      return <span key={index} className="text-emerald-400">{part}</span>;
    }

    // Python Keywords
    if (keywords.includes(part)) {
      return <span key={index} className="text-purple-400 font-semibold">{part}</span>;
    }

    // Builtins
    if (builtins.includes(part)) {
      return <span key={index} className="text-amber-300">{part}</span>;
    }

    // Numbers
    if (/^\d+(\.\d+)?$/.test(part)) {
      return <span key={index} className="text-cyan-400">{part}</span>;
    }

    // Operators
    if (['+', '-', '*', '/', '==', '=', '!=', '<', '>'].includes(part)) {
      return <span key={index} className="text-pink-400 font-medium">{part}</span>;
    }

    return <span key={index} className="text-slate-200">{part}</span>;
  });
}
