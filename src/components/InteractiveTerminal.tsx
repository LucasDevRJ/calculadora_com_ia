import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, RotateCcw, Play, CheckCircle2, AlertTriangle, Eye, ArrowRight } from 'lucide-react';

interface TerminalLog {
  id: string;
  type: 'prompt' | 'input' | 'output' | 'system' | 'error';
  text: string;
}

export const InteractiveTerminal: React.FC = () => {
  // Simulator State
  // Step: 'idle' | 'awaiting_num1' | 'awaiting_op' | 'awaiting_num2' | 'completed'
  const [step, setStep] = useState<'idle' | 'awaiting_num1' | 'awaiting_op' | 'awaiting_num2' | 'completed'>('idle');
  const [currentInput, setCurrentInput] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: '1', type: 'system', text: '>>> Python 3.12.0 (Terminal Interativo)' },
    { id: '2', type: 'system', text: 'Pronto para executar: python calculadora.py' },
  ]);

  // Variables Watcher
  const [vars, setVars] = useState<{
    num1: number | string | null;
    operacao: string | null;
    num2: number | string | null;
    resultado: number | string | null;
    status: string;
    ramoExecutado: string | null;
  }>({
    num1: null,
    operacao: null,
    num2: null,
    resultado: null,
    status: 'Aguardando inicialização',
    ramoExecutado: null,
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const startProgram = () => {
    setLogs((prev) => [
      ...prev,
      { id: Date.now().toString(), type: 'system', text: '----------------------------------------' },
      { id: (Date.now() + 1).toString(), type: 'output', text: '=== CALCULADORA SIMPLES EM PYTHON ===' },
      { id: (Date.now() + 2).toString(), type: 'output', text: 'Operações: + (Soma), - (Subtração), * (Multiplicação), / (Divisão)' },
      { id: (Date.now() + 3).toString(), type: 'prompt', text: 'Digite o primeiro número: ' },
    ]);
    setStep('awaiting_num1');
    setVars({
      num1: null,
      operacao: null,
      num2: null,
      resultado: null,
      status: 'Aguardando num1...',
      ramoExecutado: null,
    });
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInputSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 'idle' || step === 'completed') return;

    const val = currentInput.trim();
    if (!val) return;

    // Process according to current step
    if (step === 'awaiting_num1') {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        setLogs((prev) => [
          ...prev,
          { id: Date.now().toString(), type: 'input', text: val },
          { id: (Date.now() + 1).toString(), type: 'error', text: 'ValueError: poderia não ser um número válido! Digite um número (ex: 10 ou 4.5): ' },
        ]);
        setCurrentInput('');
        return;
      }

      setLogs((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'input', text: val },
        { id: (Date.now() + 1).toString(), type: 'prompt', text: 'Digite a operação (+, -, *, /): ' },
      ]);
      setVars((v) => ({ ...v, num1: parsed, status: 'num1 atribuído. Aguardando operação...' }));
      setStep('awaiting_op');
      setCurrentInput('');
    } else if (step === 'awaiting_op') {
      if (!['+', '-', '*', '/'].includes(val)) {
        setLogs((prev) => [
          ...prev,
          { id: Date.now().toString(), type: 'input', text: val },
          { id: (Date.now() + 1).toString(), type: 'error', text: 'Operação inválida! Por favor escolha entre +, -, * ou /: ' },
        ]);
        setCurrentInput('');
        return;
      }

      setLogs((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'input', text: val },
        { id: (Date.now() + 1).toString(), type: 'prompt', text: 'Digite o segundo número: ' },
      ]);
      setVars((v) => ({ ...v, operacao: val, status: 'operacao atribuída. Aguardando num2...' }));
      setStep('awaiting_num2');
      setCurrentInput('');
    } else if (step === 'awaiting_num2') {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        setLogs((prev) => [
          ...prev,
          { id: Date.now().toString(), type: 'input', text: val },
          { id: (Date.now() + 1).toString(), type: 'error', text: 'ValueError: digite um número válido (ex: 5 ou 2.5): ' },
        ]);
        setCurrentInput('');
        return;
      }

      const n1 = vars.num1 as number;
      const op = vars.operacao as string;
      const n2 = parsed;

      let res: number | string = 0;
      let logMsg = '';
      let errorOccurred = false;
      let ramo = '';

      if (op === '+') {
        res = n1 + n2;
        ramo = 'if operacao == "+": resultado = num1 + num2';
        logMsg = `Resultado: ${n1} + ${n2} = ${res}`;
      } else if (op === '-') {
        res = n1 - n2;
        ramo = 'elif operacao == "-": resultado = num1 - num2';
        logMsg = `Resultado: ${n1} - ${n2} = ${res}`;
      } else if (op === '*') {
        res = n1 * n2;
        ramo = 'elif operacao == "*": resultado = num1 * num2';
        logMsg = `Resultado: ${n1} * ${n2} = ${res}`;
      } else if (op === '/') {
        if (n2 === 0) {
          errorOccurred = true;
          res = 'ZeroDivisionError prevenido!';
          ramo = 'elif operacao == "/": if num2 == 0: print("Erro: Não é possível dividir por zero!")';
          logMsg = 'Erro: Não é possível dividir por zero!';
        } else {
          res = n1 / n2;
          // round decimals cleanly for display if long
          res = Number.isInteger(res) ? res : parseFloat(res.toFixed(4));
          ramo = 'elif operacao == "/": resultado = num1 / num2';
          logMsg = `Resultado: ${n1} / ${n2} = ${res}`;
        }
      }

      setLogs((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'input', text: val },
        {
          id: (Date.now() + 1).toString(),
          type: errorOccurred ? 'error' : 'output',
          text: logMsg,
        },
        {
          id: (Date.now() + 2).toString(),
          type: 'system',
          text: '--- Programa finalizado com sucesso ---',
        },
      ]);

      setVars({
        num1: n1,
        operacao: op,
        num2: n2,
        resultado: res,
        status: errorOccurred ? 'Divisão por zero evitada com segurança!' : 'Cálculo finalizado!',
        ramoExecutado: ramo,
      });

      setStep('completed');
      setCurrentInput('');
    }
  };

  const runPreset = (n1: number, op: string, n2: number) => {
    setLogs((prev) => [
      ...prev,
      { id: Date.now().toString(), type: 'system', text: '----------------------------------------' },
      { id: (Date.now() + 1).toString(), type: 'output', text: '=== CALCULADORA SIMPLES EM PYTHON ===' },
      { id: (Date.now() + 2).toString(), type: 'prompt', text: `Digite o primeiro número: ${n1}` },
      { id: (Date.now() + 3).toString(), type: 'prompt', text: `Digite a operação (+, -, *, /): ${op}` },
      { id: (Date.now() + 4).toString(), type: 'prompt', text: `Digite o segundo número: ${n2}` },
    ]);

    let res: number | string = 0;
    let logMsg = '';
    let isError = false;
    let ramo = '';

    if (op === '+') {
      res = n1 + n2;
      ramo = 'if operacao == "+": resultado = num1 + num2';
      logMsg = `Resultado: ${n1} + ${n2} = ${res}`;
    } else if (op === '-') {
      res = n1 - n2;
      ramo = 'elif operacao == "-": resultado = num1 - num2';
      logMsg = `Resultado: ${n1} - ${n2} = ${res}`;
    } else if (op === '*') {
      res = n1 * n2;
      ramo = 'elif operacao == "*": resultado = num1 * num2';
      logMsg = `Resultado: ${n1} * ${n2} = ${res}`;
    } else if (op === '/') {
      if (n2 === 0) {
        isError = true;
        res = 'Impossível dividir por 0';
        ramo = 'if num2 == 0: print("Erro: Não é possível dividir por zero!")';
        logMsg = 'Erro: Não é possível dividir por zero!';
      } else {
        res = n1 / n2;
        res = Number.isInteger(res) ? res : parseFloat(res.toFixed(4));
        ramo = 'elif operacao == "/": resultado = num1 / num2';
        logMsg = `Resultado: ${n1} / ${n2} = ${res}`;
      }
    }

    setLogs((prev) => [
      ...prev,
      { id: (Date.now() + 5).toString(), type: isError ? 'error' : 'output', text: logMsg },
      { id: (Date.now() + 6).toString(), type: 'system', text: '--- Programa finalizado com sucesso ---' },
    ]);

    setVars({
      num1: n1,
      operacao: op,
      num2: n2,
      resultado: res,
      status: isError ? 'Erro prevenido via condicional if num2 == 0' : 'Cálculo realizado com sucesso!',
      ramoExecutado: ramo,
    });

    setStep('completed');
  };

  const clearTerminal = () => {
    setLogs([
      { id: '1', type: 'system', text: '>>> Terminal limpo. Python pronto.' },
    ]);
    setStep('idle');
    setVars({
      num1: null,
      operacao: null,
      num2: null,
      resultado: null,
      status: 'Pronto para novo teste',
      ramoExecutado: null,
    });
  };

  return (
    <section id="terminal" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Ambiente de Execução</span>
            <span aria-hidden="true">·</span>
            <span>Simulador Python 3</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 font-semibold">100% Interativo</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Terminal Python em Tempo Real
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Experimente a calculadora como se estivesse no terminal do seu computador (VS Code, IDLE ou Bash).
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {step === 'idle' || step === 'completed' ? (
            <button
              onClick={startProgram}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{step === 'completed' ? 'Executar Novamente' : 'Iniciar Execução'}</span>
            </button>
          ) : (
            <button
              onClick={startProgram}
              className="flex items-center gap-2 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          )}

          <button
            onClick={clearTerminal}
            className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-colors hover:bg-slate-50"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Preset Fast-Test Bar */}
      <div className="px-6 py-2.5 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">Testes Rápidos:</span>
        <button
          onClick={() => runPreset(15, '+', 25)}
          className="px-2.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded-md text-slate-700 transition-colors"
        >
          Soma (15 + 25)
        </button>
        <button
          onClick={() => runPreset(50, '-', 18)}
          className="px-2.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded-md text-slate-700 transition-colors"
        >
          Subtração (50 - 18)
        </button>
        <button
          onClick={() => runPreset(7, '*', 8)}
          className="px-2.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded-md text-slate-700 transition-colors"
        >
          Multiplicação (7 × 8)
        </button>
        <button
          onClick={() => runPreset(84, '/', 4)}
          className="px-2.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded-md text-slate-700 transition-colors"
        >
          Divisão (84 ÷ 4)
        </button>
        <button
          onClick={() => runPreset(10, '/', 0)}
          className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md text-rose-700 font-medium transition-colors"
        >
          Divisão por Zero (10 ÷ 0)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Terminal Screen (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 p-5 flex flex-col justify-between min-h-[400px]">
          {/* Output lines */}
          <div className="font-mono text-xs sm:text-sm space-y-1.5 overflow-y-auto max-h-[380px] pr-2">
            {logs.map((log) => {
              if (log.type === 'system') {
                return <div key={log.id} className="text-slate-500">{log.text}</div>;
              }
              if (log.type === 'prompt') {
                return <div key={log.id} className="text-blue-300 font-medium">{log.text}</div>;
              }
              if (log.type === 'input') {
                return (
                  <div key={log.id} className="text-emerald-400 font-semibold pl-2 flex items-center gap-1.5">
                    <span className="text-slate-600 text-xs">›</span>
                    <span>{log.text}</span>
                  </div>
                );
              }
              if (log.type === 'error') {
                return (
                  <div key={log.id} className="text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/50 my-1">
                    ⚠️ {log.text}
                  </div>
                );
              }
              // regular output
              return <div key={log.id} className="text-slate-100 font-medium">{log.text}</div>;
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* User Input Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            {step !== 'idle' && step !== 'completed' ? (
              <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono text-sm">›</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={
                    step === 'awaiting_num1'
                      ? 'Digite um número (ex: 15) e aperte Enter...'
                      : step === 'awaiting_op'
                      ? 'Digite +, -, * ou / e aperte Enter...'
                      : 'Digite o segundo número (ex: 3) e aperte Enter...'
                  }
                  className="flex-1 bg-slate-900 text-white font-mono text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <span>Enviar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Clique em <strong>"Iniciar Execução"</strong> ou em um <strong>Teste Rápido</strong> acima.</span>
                <span className="text-slate-500 font-mono">Status: {step === 'completed' ? 'Concluído' : 'Inativo'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Variable Inspector (4 cols) */}
        <div className="lg:col-span-4 p-5 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Memória do Python (Variáveis)
              </h3>
            </div>

            <div className="space-y-3">
              {/* num1 */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-semibold text-slate-700">num1</span>
                  <span className="text-[11px] text-slate-400 font-mono">tipo: float</span>
                </div>
                <div className="font-mono text-sm font-bold text-blue-600">
                  {vars.num1 !== null ? `${vars.num1}` : <span className="text-slate-400 font-normal">None (não definido)</span>}
                </div>
              </div>

              {/* operacao */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-semibold text-slate-700">operacao</span>
                  <span className="text-[11px] text-slate-400 font-mono">tipo: str</span>
                </div>
                <div className="font-mono text-sm font-bold text-purple-600">
                  {vars.operacao !== null ? `"${vars.operacao}"` : <span className="text-slate-400 font-normal">None (não definido)</span>}
                </div>
              </div>

              {/* num2 */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-semibold text-slate-700">num2</span>
                  <span className="text-[11px] text-slate-400 font-mono">tipo: float</span>
                </div>
                <div className="font-mono text-sm font-bold text-blue-600">
                  {vars.num2 !== null ? `${vars.num2}` : <span className="text-slate-400 font-normal">None (não definido)</span>}
                </div>
              </div>

              {/* resultado */}
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-semibold text-blue-900">resultado</span>
                  <span className="text-[11px] text-blue-600 font-mono">
                    {typeof vars.resultado === 'number' ? 'tipo: float' : 'saída'}
                  </span>
                </div>
                <div className="font-mono text-base font-extrabold text-blue-950">
                  {vars.resultado !== null ? `${vars.resultado}` : <span className="text-slate-400 font-normal text-sm">--</span>}
                </div>
              </div>
            </div>

            {/* Ramo if/elif executado */}
            {vars.ramoExecutado && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <div className="font-semibold mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Linha do if executada:</span>
                </div>
                <code className="font-mono block text-[11px] text-emerald-800 break-words">
                  {vars.ramoExecutado}
                </code>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
            <p>
              💡 No Python, cada variável guarda um espaço na memória RAM com seu nome e tipo correspondente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
