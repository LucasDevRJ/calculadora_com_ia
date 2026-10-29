import React, { useState } from 'react';
import { Cpu, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

export const VisualCalculatorSync: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [num1, setNum1] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [result, setResult] = useState<number | string | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleDigit = (digit: string) => {
    if (isCalculated) {
      setDisplay(digit);
      setNum1(null);
      setOperator(null);
      setNum2(null);
      setResult(null);
      setIsCalculated(false);
      return;
    }

    if (display === '0' && digit !== '.') {
      setDisplay(digit);
    } else {
      if (digit === '.' && display.includes('.')) return;
      setDisplay((prev) => prev + digit);
    }
  };

  const handleOperator = (op: string) => {
    const currentVal = parseFloat(display);
    setNum1(currentVal);
    setOperator(op);
    setDisplay('0');
    setIsCalculated(false);
    setResult(null);
  };

  const handleCalculate = () => {
    if (num1 === null || operator === null) return;
    const secondNum = parseFloat(display);
    setNum2(secondNum);

    let res: number | string = 0;
    if (operator === '+') res = num1 + secondNum;
    else if (operator === '-') res = num1 - secondNum;
    else if (operator === '*') res = num1 * secondNum;
    else if (operator === '/') {
      if (secondNum === 0) {
        res = 'Erro: Divisão por Zero!';
      } else {
        const val = num1 / secondNum;
        res = Number.isInteger(val) ? val : parseFloat(val.toFixed(4));
      }
    } else if (operator === '**') {
      res = Math.pow(num1, secondNum);
      res = Number.isInteger(res) ? res : parseFloat(res.toFixed(4));
    } else if (operator === '//') {
      if (secondNum === 0) {
        res = 'Erro: Divisão Inteira por 0!';
      } else {
        res = Math.floor(num1 / secondNum);
      }
    } else if (operator === '%') {
      if (secondNum === 0) {
        res = 'Erro: Módulo por 0!';
      } else {
        res = num1 % secondNum;
      }
    } else if (operator === 'porc') {
      const valPorc = (num1 / 100) * secondNum;
      res = Number.isInteger(valPorc) ? valPorc : parseFloat(valPorc.toFixed(4));
    }

    setResult(res);
    setDisplay(typeof res === 'number' ? res.toString() : 'Erro');
    setIsCalculated(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setNum1(null);
    setOperator(null);
    setNum2(null);
    setResult(null);
    setIsCalculated(false);
  };

  return (
    <section id="visual" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Ponte Conceitual</span>
          <span aria-hidden="true">·</span>
          <span>Do Visual para o Código</span>
          <span aria-hidden="true">·</span>
          <span className="text-purple-600 font-semibold">Sincronização em Tempo Real</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Calculadora Gráfica vs. Lógica em Python
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Clique nos botões da calculadora e observe exatamente quais instruções Python equivalentes são disparadas nos bastidores.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Side: Physical/Visual Calculator Keypad (5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col items-center justify-center bg-slate-50">
          <div className="w-full max-w-[290px] bg-slate-900 p-4 rounded-3xl shadow-lg border border-slate-800">
            {/* Calculator Display Screen */}
            <div className="bg-slate-950 p-4 rounded-2xl mb-4 text-right border border-slate-800/80">
              <div className="text-[11px] text-slate-500 h-4 font-mono">
                {num1 !== null && (operator === 'porc'
                  ? `${num1}% de ${isCalculated && num2 !== null ? num2 : ''}`
                  : `${num1} ${operator || ''} ${isCalculated && num2 !== null ? num2 : ''}`)}
              </div>
              <div className="text-2xl font-mono font-bold text-white tracking-wider truncate">
                {display}
              </div>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleOperator('porc')}
                className={`col-span-2 py-2 rounded-xl font-mono text-xs transition-colors active:scale-95 ${
                  operator === 'porc' && !isCalculated
                    ? 'bg-emerald-500 text-white font-bold'
                    : 'bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-300 border border-emerald-700/50'
                }`}
                title="Calcular X% de Y: (num1 / 100) * num2"
              >
                % de (Porcentagem)
              </button>
              <button
                onClick={() => handleOperator('/')}
                className={`py-2 rounded-xl font-bold text-sm transition-colors active:scale-95 ${
                  operator === '/' && !isCalculated
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
                title="Divisão Real (/)"
              >
                ÷
              </button>
              <button
                onClick={handleClear}
                className="py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold rounded-xl text-xs transition-colors active:scale-95"
              >
                C (Limpar)
              </button>

              <button
                onClick={() => handleOperator('**')}
                className={`py-2 rounded-xl font-mono text-xs transition-colors active:scale-95 ${
                  operator === '**' && !isCalculated
                    ? 'bg-purple-500 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-purple-300'
                }`}
                title="Potenciação (**)"
              >
                xʸ (**)
              </button>
              <button
                onClick={() => handleOperator('//')}
                className={`py-2 rounded-xl font-mono text-xs transition-colors active:scale-95 ${
                  operator === '//' && !isCalculated
                    ? 'bg-purple-500 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-purple-300'
                }`}
                title="Divisão Inteira (//)"
              >
                // (div)
              </button>
              <button
                onClick={() => handleOperator('%')}
                className={`col-span-2 py-2 rounded-xl font-mono text-xs transition-colors active:scale-95 ${
                  operator === '%' && !isCalculated
                    ? 'bg-purple-500 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-purple-300'
                }`}
                title="Módulo ou Resto da Divisão (%)"
              >
                % (resto / módulo)
              </button>

              <button
                onClick={() => handleDigit('7')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                7
              </button>
              <button
                onClick={() => handleDigit('8')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                8
              </button>
              <button
                onClick={() => handleDigit('9')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                9
              </button>
              <button
                onClick={() => handleOperator('*')}
                className={`py-3 rounded-xl font-bold text-sm transition-colors active:scale-95 ${
                  operator === '*' && !isCalculated
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                ×
              </button>

              <button
                onClick={() => handleDigit('4')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                4
              </button>
              <button
                onClick={() => handleDigit('5')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                5
              </button>
              <button
                onClick={() => handleDigit('6')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                6
              </button>
              <button
                onClick={() => handleOperator('-')}
                className={`py-3 rounded-xl font-bold text-sm transition-colors active:scale-95 ${
                  operator === '-' && !isCalculated
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                −
              </button>

              <button
                onClick={() => handleDigit('1')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                1
              </button>
              <button
                onClick={() => handleDigit('2')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                2
              </button>
              <button
                onClick={() => handleDigit('3')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                3
              </button>
              <button
                onClick={() => handleOperator('+')}
                className={`py-3 rounded-xl font-bold text-sm transition-colors active:scale-95 ${
                  operator === '+' && !isCalculated
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                +
              </button>

              <button
                onClick={() => handleDigit('0')}
                className="col-span-2 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                0
              </button>
              <button
                onClick={() => handleDigit('.')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95"
              >
                .
              </button>
              <button
                onClick={handleCalculate}
                className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors active:scale-95 shadow-md flex items-center justify-center"
              >
                =
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Python Mental Model & Execution Trace (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-600" />
                <span>Tradução para Código Python</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">fluxo_execucao</span>
            </div>

            <div className="space-y-3">
              {/* Step 1: num1 assignment */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                num1 !== null ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-400">Passo 1: Captura do 1º Número</span>
                  <span className="text-[11px] font-mono">input() + float()</span>
                </div>
                <code className="font-mono text-xs block">
                  num1 = float(&quot;{num1 !== null ? num1 : '...'}&quot;)
                  {num1 !== null && <span className="text-emerald-400 font-normal"> # Valor na memória: {num1} (float)</span>}
                </code>
              </div>

              {/* Step 2: operacao assignment */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                operator !== null ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-400">Passo 2: Escolha da Operação</span>
                  <span className="text-[11px] font-mono">input()</span>
                </div>
                <code className="font-mono text-xs block">
                  operacao = &quot;{operator || '...'}&quot;
                  {operator && <span className="text-purple-400 font-normal"> # {operator === 'porc' ? 'Cálculo de Porcentagem ((num1 / 100) * num2)' : 'String com o operador escolhido'}</span>}
                </code>
              </div>

              {/* Step 3: num2 assignment */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                num2 !== null ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-400">Passo 3: Captura do 2º Número</span>
                  <span className="text-[11px] font-mono">input() + float()</span>
                </div>
                <code className="font-mono text-xs block">
                  num2 = float(&quot;{num2 !== null ? num2 : (operator ? display : '...')}&quot;)
                  {num2 !== null && <span className="text-emerald-400 font-normal"> # Valor na memória: {num2} (float)</span>}
                </code>
              </div>

              {/* Step 4: Decision Tree */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                isCalculated ? 'bg-blue-950 border-blue-900 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-blue-300">Passo 4: Avaliação da Condicional</span>
                  <span className="text-[11px] font-mono">if / elif / else</span>
                </div>

                {isCalculated && operator && num1 !== null && num2 !== null ? (
                  <div className="font-mono text-xs space-y-1">
                    <span className="text-purple-300">
                      {operator === '+' && 'if operacao == "+":'}
                      {operator === '-' && 'elif operacao == "-":'}
                      {operator === '*' && 'elif operacao == "*":'}
                      {operator === '/' && 'elif operacao == "/":'}
                      {operator === '**' && 'elif operacao == "**":'}
                      {operator === '//' && 'elif operacao == "//":'}
                      {operator === '%' && 'elif operacao == "%":'}
                      {operator === 'porc' && 'elif operacao == "porc":'}
                    </span>
                    <div className="pl-4 text-emerald-300">
                      {operator === '/' && num2 === 0 ? (
                        <span className="text-rose-400">
                          if num2 == 0: print(&quot;Erro: Não é possível dividir por zero!&quot;)
                        </span>
                      ) : operator === 'porc' ? (
                        <span>
                          resultado = ({num1} / 100) * {num2}
                          <span className="text-slate-400"> # = {result} ({num1}% de {num2})</span>
                        </span>
                      ) : (
                        <span>
                          resultado = {num1} {operator} {num2}
                          <span className="text-slate-400"> # = {result}</span>
                        </span>
                      )}
                    </div>
                    <div className="text-cyan-300 text-[11px] pt-1">
                      {operator === 'porc'
                        ? 'print(f"Resultado: {num1}% de {num2} = {resultado}")'
                        : 'print(f"Resultado: {num1} {operacao} {num2} = {resultado}")'}
                    </div>
                  </div>
                ) : (
                  <code className="font-mono text-xs text-slate-400">
                    Aguardando você clicar em &apos;=&apos; para processar a condicional...
                  </code>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Experimente testar <strong>15 → % de → 200 → =</strong> (Porcentagem) ou <strong>17 → % (resto) → 3 → =</strong>!</span>
          </div>
        </div>
      </div>
    </section>
  );
};
