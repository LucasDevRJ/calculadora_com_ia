import React, { useState } from 'react';
import { Bug, CheckCircle2, Wrench, AlertOctagon, ArrowRight } from 'lucide-react';

interface ErrorScenario {
  id: string;
  errorName: string;
  category: 'Execução' | 'Sintaxe' | 'Tipagem';
  scenarioTitle: string;
  problemDescription: string;
  brokenCode: string;
  traceback: string;
  fixedCode: string;
  whyItHappened: string;
  howToAvoid: string;
}

const ERROR_SCENARIOS: ErrorScenario[] = [
  {
    id: 'value_error',
    errorName: 'ValueError',
    category: 'Execução',
    scenarioTitle: 'Digitar uma letra onde se espera um número',
    problemDescription: 'O usuário digita "dez" em vez de "10", e a função float() não sabe converter texto em números.',
    brokenCode: `numero = float(input("Digite um número: "))
# Se o usuário digitar "abc", o Python quebra aqui!`,
    traceback: `Traceback (most recent call last):
  File "calculadora.py", line 1, in <module>
    numero = float(input("Digite um número: "))
ValueError: could not convert string to float: 'abc'`,
    fixedCode: `try:
    numero = float(input("Digite um número: "))
except ValueError:
    print("Erro: Por favor, digite apenas números válidos (ex: 10 ou 4.5).")`,
    whyItHappened: 'A função float() só entende dígitos numéricos ("10", "3.14", "-5"). Ao receber caracteres alfabéticos como "abc", o Python aborta o programa.',
    howToAvoid: 'Use um bloco try / except ValueError ou valide a entrada antes de tentar calcular.',
  },
  {
    id: 'zero_division',
    errorName: 'ZeroDivisionError',
    category: 'Execução',
    scenarioTitle: 'Dividir qualquer número por 0',
    problemDescription: 'Tentar realizar num1 / 0 viola as regras matemáticas e o Python recusa-se a calcular.',
    brokenCode: `num1 = 15
num2 = 0
resultado = num1 / num2  # Trava o programa!`,
    traceback: `Traceback (most recent call last):
  File "calculadora.py", line 3, in <module>
    resultado = num1 / num2
ZeroDivisionError: float division by zero`,
    fixedCode: `if num2 == 0:
    print("Aviso: Na matemática não é possível dividir por zero!")
else:
    resultado = num1 / num2
    print(f"Resultado: {resultado}")`,
    whyItHappened: 'Na matemática elementar, a divisão por zero não possui valor definido.',
    howToAvoid: 'Sempre faça a checagem if num2 == 0 antes da linha onde ocorre a barra de divisão (/).',
  },
  {
    id: 'indentation_error',
    errorName: 'IndentationError',
    category: 'Sintaxe',
    scenarioTitle: 'Esquecer o recuo de 4 espaços dentro do if',
    problemDescription: 'O Python usa o alinhamento de espaços para saber o que pertence ao bloco condicional.',
    brokenCode: `if operacao == "+":
resultado = num1 + num2 # Faltou o espaço de recuo!`,
    traceback: `Traceback (most recent call last):
  File "calculadora.py", line 2
    resultado = num1 + num2
    ^
IndentationError: expected an indented block after 'if' statement on line 1`,
    fixedCode: `if operacao == "+":
    resultado = num1 + num2  # 4 espaços (ou tecla Tab)`,
    whyItHappened: 'Outras linguagens usam chaves { }, mas o Python é rigoroso com os espaços de indentação.',
    howToAvoid: 'Configure seu editor (VS Code / PyCharm) para inserir 4 espaços automaticamente ao apertar Tab.',
  },
  {
    id: 'type_error',
    errorName: 'TypeError',
    category: 'Tipagem',
    scenarioTitle: 'Tentar somar número com texto esquecendo o float()',
    problemDescription: 'Sem conversão, o input() é do tipo str (string) e tentar somar com um float gera conflito de tipos.',
    brokenCode: `num1 = input("Digite o 1º número: ")  # tipo 'str'
num2 = 5.0                             # tipo 'float'
resultado = num1 + num2                # Não se soma texto com número!`,
    traceback: `Traceback (most recent call last):
  File "calculadora.py", line 3, in <module>
    resultado = num1 + num2
TypeError: can only concatenate str (not "float") to str`,
    fixedCode: `num1 = float(input("Digite o 1º número: "))  # Converte para float!
num2 = 5.0
resultado = num1 + num2`,
    whyItHappened: 'O Python é fortemente tipado: ele não converte automaticamente um texto em número em operações matemáticas.',
    howToAvoid: 'Sempre converta dados obtidos via input() usando float() ou int() antes de calcular.',
  },
  {
    id: 'syntax_colon',
    errorName: 'SyntaxError',
    category: 'Sintaxe',
    scenarioTitle: 'Esquecer os dois pontos (:) no final do if ou def',
    problemDescription: 'No Python, todo comando de cabeçalho (if, elif, else, def, while) exige dois pontos : no final da linha.',
    brokenCode: `if operacao == "+"   # Faltou o sinal de dois pontos no final!
    resultado = num1 + num2`,
    traceback: `Traceback (most recent call last):
  File "calculadora.py", line 1
    if operacao == "+"
                      ^
SyntaxError: expected ':'`,
    fixedCode: `if operacao == "+":  # Os dois pontos avisam que o bloco começou
    resultado = num1 + num2`,
    whyItHappened: 'O caractere : indica ao compilador do Python que a linha seguinte dará início a um novo bloco recuado.',
    howToAvoid: 'Crie o hábito mental: "escreveu if, def ou while? Termina com dois pontos :".',
  },
];

export const DebuggingLab: React.FC = () => {
  const [selectedErrorId, setSelectedErrorId] = useState<string>(ERROR_SCENARIOS[0].id);
  const [showFixedCode, setShowFixedCode] = useState<boolean>(false);

  const currentScenario =
    ERROR_SCENARIOS.find((s) => s.id === selectedErrorId) || ERROR_SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    setSelectedErrorId(id);
    setShowFixedCode(false);
  };

  return (
    <section id="debugging" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Diagnóstico & Resolução</span>
            <span aria-hidden="true">·</span>
            <span>Laboratório de Erros</span>
            <span aria-hidden="true">·</span>
            <span className="text-rose-600 font-semibold">Os 5 Erros Mais Comuns de Iniciantes</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Laboratório de Debugging: Aprendendo com os Erros
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            80% de aprender a programar é saber interpretar as mensagens vermelhas do terminal. Veja o erro real, entenda o motivo e veja como consertar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Error Selector Column (4 cols) */}
        <div className="lg:col-span-4 p-4 bg-slate-50/50 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            Selecione uma Falha Típica
          </p>
          {ERROR_SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === selectedErrorId;
            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-white shadow-xs border border-rose-200 ring-1 ring-rose-500/20'
                    : 'hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-rose-600">
                    {scenario.errorName}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    {scenario.category}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-800 line-clamp-1">
                  {scenario.scenarioTitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Scenario Playground (8 cols) */}
        <div className="lg:col-span-8 p-6 lg:p-8 bg-white flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-rose-50 text-rose-700 font-mono text-xs font-bold rounded-md mb-1.5">
                  {currentScenario.errorName}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {currentScenario.scenarioTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {currentScenario.problemDescription}
                </p>
              </div>

              {/* Toggle Broken vs Fixed */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
                <button
                  onClick={() => setShowFixedCode(false)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    !showFixedCode
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    Código com Erro
                  </span>
                </button>
                <button
                  onClick={() => setShowFixedCode(true)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    showFixedCode
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Solução Corrigida
                  </span>
                </button>
              </div>
            </div>

            {/* Code Box Display */}
            {!showFixedCode ? (
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100">
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono text-rose-400 flex items-center gap-2">
                    <Bug className="w-3.5 h-3.5" />
                    <span>Código Problemático</span>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto text-rose-200">
                    {currentScenario.brokenCode}
                  </pre>
                </div>

                <div className="rounded-xl overflow-hidden border border-rose-900/50 bg-rose-950/40 text-rose-200">
                  <div className="px-4 py-1.5 bg-rose-950/80 border-b border-rose-900/40 text-[11px] font-mono font-semibold text-rose-300">
                    Mensagem Real no Terminal do Python (Traceback)
                  </div>
                  <pre className="p-3 text-[11px] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed text-rose-300">
                    {currentScenario.traceback}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-emerald-800 bg-slate-950 text-slate-100">
                  <div className="px-4 py-2 bg-emerald-950/80 border-b border-emerald-800/80 text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Código Corrigido e Seguro</span>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto text-emerald-200">
                    {currentScenario.fixedCode}
                  </pre>
                </div>
              </div>
            )}

            {/* Explanations of Cause and Prevention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>Por que o Python reclamou?</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentScenario.whyItHappened}
                </p>
              </div>

              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <h4 className="text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Como prevenir no dia a dia:</span>
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {currentScenario.howToAvoid}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Dica de ouro: Nunca tenha medo das mensagens vermelhas, elas são mapas exatos do que precisa ser corrigido!</span>
          </div>
        </div>
      </div>
    </section>
  );
};
