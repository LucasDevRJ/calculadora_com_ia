import React, { useState } from 'react';
import { BookMarked, Calculator, Layers, Binary, Copy, Check } from 'lucide-react';

export const PythonCheatSheet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'operadores' | 'tipos' | 'comparadores' | 'funcoes'>('operadores');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  return (
    <section id="cheatsheet" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Material de Apoio</span>
            <span aria-hidden="true">·</span>
            <span>Referência Rápida</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-600 font-semibold">Cheat Sheet Python</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Guia Rápido de Bolso: Sintaxe e Operadores
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Consulte a qualquer momento durante seus estudos. Clique em qualquer linha para copiar o exemplo.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('operadores')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'operadores' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Operadores Aritméticos (7)
          </button>
          <button
            onClick={() => setActiveTab('tipos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'tipos' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tipos de Dados
          </button>
          <button
            onClick={() => setActiveTab('comparadores')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'comparadores' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Comparadores Lógicos
          </button>
          <button
            onClick={() => setActiveTab('funcoes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'funcoes' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Funções Essenciais
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'operadores' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Além das 4 operações elementares (+, -, *, /), o Python possui operadores nativos incríveis para cálculos avançados:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                    <th className="py-2.5 px-3">Operador</th>
                    <th className="py-2.5 px-3">Nome da Operação</th>
                    <th className="py-2.5 px-3">Exemplo em Python</th>
                    <th className="py-2.5 px-3">Resultado</th>
                    <th className="py-2.5 px-3">Para que serve?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-blue-600">+</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Soma / Adição</td>
                    <td className="py-2.5 px-3 text-slate-700">10 + 5</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">15</td>
                    <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Junta valores numéricos</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-blue-600">-</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Subtração</td>
                    <td className="py-2.5 px-3 text-slate-700">10 - 4</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">6</td>
                    <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Diferença entre dois números</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-blue-600">*</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Multiplicação</td>
                    <td className="py-2.5 px-3 text-slate-700">6 * 7</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">42</td>
                    <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Produto matemático</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-blue-600">/</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Divisão Real</td>
                    <td className="py-2.5 px-3 text-slate-700">7 / 2</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">3.5</td>
                    <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Sempre retorna float com decimais</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-blue-50/20">
                    <td className="py-2.5 px-3 font-bold text-purple-600">//</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Divisão Inteira (Piso)</td>
                    <td className="py-2.5 px-3 text-slate-700">7 // 2</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">3</td>
                    <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Descarta a parte decimal</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-blue-50/20">
                    <td className="py-2.5 px-3 font-bold text-purple-600">%</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Módulo (Resto da Divisão)</td>
                    <td className="py-2.5 px-3 text-slate-700">7 % 2</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">1</td>
                    <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Resto da divisão (usado para saber se é par/ímpar)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-blue-50/20">
                    <td className="py-2.5 px-3 font-bold text-purple-600">**</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Potenciação (Exponenciação)</td>
                    <td className="py-2.5 px-3 text-slate-700">2 ** 3</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">8</td>
                    <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px]">Eleva o 1º número à potência do 2º (2³ = 8)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tipos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm text-blue-700">int (Inteiro)</span>
                <span className="text-[11px] text-slate-400">ex: 42, -5, 0</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Números positivos ou negativos sem casas decimais. Ideal para contadores, repetições e quantidades exatas.
              </p>
              <code className="text-xs font-mono bg-white p-2 rounded block border border-slate-200 text-slate-800">
                idade = int(&quot;25&quot;) # vira o número 25
              </code>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm text-blue-700">float (Decimal)</span>
                <span className="text-[11px] text-slate-400">ex: 3.14, 0.5, -12.8</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Números com ponto flutuante. Nota: em Python usamos <strong>ponto (.)</strong> e nunca vírgula para separar decimais.
              </p>
              <code className="text-xs font-mono bg-white p-2 rounded block border border-slate-200 text-slate-800">
                preco = float(&quot;19.90&quot;) # vira 19.9
              </code>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm text-purple-700">str (String / Texto)</span>
                <span className="text-[11px] text-slate-400">ex: &quot;olá&quot;, &quot;+&quot;, &quot;123&quot;</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Cadeia de caracteres delimitada por aspas. O que vem do <code className="font-mono text-purple-600">input()</code> sempre é uma string!
              </p>
              <code className="text-xs font-mono bg-white p-2 rounded block border border-slate-200 text-slate-800">
                texto = str(100) # vira o texto &quot;100&quot;
              </code>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sm text-emerald-700">bool (Booleano)</span>
                <span className="text-[11px] text-slate-400">True ou False</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Representa a verdade lógica. O resultado de qualquer comparação como <code className="font-mono">10 &gt; 5</code> é <code className="font-mono">True</code>.
              </p>
              <code className="text-xs font-mono bg-white p-2 rounded block border border-slate-200 text-slate-800">
                eh_maior = 10 &gt; 2 # True
              </code>
            </div>
          </div>
        )}

        {activeTab === 'comparadores' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Usados dentro dos blocos <code className="font-mono text-blue-600">if</code> e <code className="font-mono text-blue-600">elif</code> para testar condições:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 font-mono text-xs">
                <div className="text-blue-700 font-bold mb-1">== (Igual a)</div>
                <div className="text-slate-600">op == &quot;+&quot;</div>
                <div className="text-[11px] text-slate-400 font-sans mt-1">Verifica se ambos são iguais</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 font-mono text-xs">
                <div className="text-blue-700 font-bold mb-1">!= (Diferente de)</div>
                <div className="text-slate-600">num2 != 0</div>
                <div className="text-[11px] text-slate-400 font-sans mt-1">Verifica se são diferentes</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 font-mono text-xs">
                <div className="text-blue-700 font-bold mb-1">&gt; e &lt; (Maior / Menor)</div>
                <div className="text-slate-600">x &gt; 0 e y &lt; 10</div>
                <div className="text-[11px] text-slate-400 font-sans mt-1">Comparação de grandezas</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 font-mono text-xs">
                <div className="text-purple-700 font-bold mb-1">and (E lógico)</div>
                <div className="text-slate-600">x &gt; 0 and x &lt; 100</div>
                <div className="text-[11px] text-slate-400 font-sans mt-1">Ambas precisam ser verdadeiras</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 font-mono text-xs">
                <div className="text-purple-700 font-bold mb-1">or (OU lógico)</div>
                <div className="text-slate-600">op == &quot;+&quot; or op == &quot;-&quot;</div>
                <div className="text-[11px] text-slate-400 font-sans mt-1">Basta uma ser verdadeira</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 font-mono text-xs">
                <div className="text-purple-700 font-bold mb-1">in (Contido em)</div>
                <div className="text-slate-600">op in [&quot;+&quot;, &quot;-&quot;, &quot;*&quot;, &quot;/&quot;]</div>
                <div className="text-[11px] text-slate-400 font-sans mt-1">Testa se o valor está na lista</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'funcoes' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-blue-700">round(numero, casas)</span>
                <span className="font-sans text-slate-600 ml-2">Arredonda um decimal para N casas.</span>
              </div>
              <code className="text-emerald-600 font-bold">round(3.14159, 2) → 3.14</code>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-blue-700">abs(numero)</span>
                <span className="font-sans text-slate-600 ml-2">Retorna o valor absoluto (sem sinal negativo).</span>
              </div>
              <code className="text-emerald-600 font-bold">abs(-25) → 25</code>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-blue-700">f&quot;&#123;num:.2f&#125;&quot;</span>
                <span className="font-sans text-slate-600 ml-2">Formata um número com exatamente duas casas decimais.</span>
              </div>
              <code className="text-emerald-600 font-bold">f&quot;&#123;10/3:.2f&#125;&quot; → &quot;3.33&quot;</code>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-blue-700">type(objeto)</span>
                <span className="font-sans text-slate-600 ml-2">Revela o tipo de qualquer variável ou valor.</span>
              </div>
              <code className="text-emerald-600 font-bold">type(15.5) → &lt;class &apos;float&apos;&gt;</code>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
