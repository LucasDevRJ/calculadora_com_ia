import React, { useState } from 'react';
import { Sliders, Copy, Check, Download, Sparkles, Code2 } from 'lucide-react';

export const CustomCodeGenerator: React.FC = () => {
  const [includeAdvancedOps, setIncludeAdvancedOps] = useState<boolean>(true);
  const [useFunctions, setUseFunctions] = useState<boolean>(false);
  const [useLoop, setUseLoop] = useState<boolean>(true);
  const [useHistory, setUseHistory] = useState<boolean>(true);
  const [useTryExcept, setUseTryExcept] = useState<boolean>(true);
  const [formatDecimals, setFormatDecimals] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate python code dynamically based on active options
  const generateCode = (): string => {
    let code = `# ========================================================\n`;
    code += `# CALCULADORA PYTHON PERSONALIZADA\n`;
    code += `# Gerada sob medida para estudo de lógica de programação\n`;
    code += `# ========================================================\n\n`;

    if (useHistory) {
      code += `# Lista para armazenar o histórico de cálculos realizados\n`;
      code += `historico = []\n\n`;
    }

    if (useFunctions) {
      code += `# --- FUNÇÕES MATEMÁTICAS ---\n`;
      code += `def somar(a, b): return a + b\n`;
      code += `def subtrair(a, b): return a - b\n`;
      code += `def multiplicar(a, b): return a * b\n`;
      code += `def dividir(a, b):\n`;
      code += `    if b == 0:\n`;
      code += `        return "Erro: Divisão por zero!"\n`;
      code += `    return a / b\n`;
      if (includeAdvancedOps) {
        code += `def potencia(a, b): return a ** b\n`;
        code += `def resto(a, b): return a % b\n`;
      }
      code += `\n`;
    }

    const indent = useLoop ? '    ' : '';

    if (useLoop) {
      code += `print("=== BEM-VINDO À CALCULADORA PYTHON ===")\n\n`;
      code += `while True:\n`;
      code += `    print("\\n" + "-" * 35)\n`;
      code += `    print("Operações disponíveis:")\n`;
      code += `    print("+ : Soma | - : Subtração | * : Multiplicação | / : Divisão")\n`;
      if (includeAdvancedOps) {
        code += `    print("** : Potência | % : Resto da divisão")\n`;
      }
      if (useHistory) {
        code += `    print("h : Ver histórico de cálculos")\n`;
      }
      code += `    print("0 : Sair do programa")\n`;
      code += `    print("-" * 35)\n\n`;
      code += `    op = input("Escolha a operação desejada: ").strip()\n\n`;
      code += `    if op == "0":\n`;
      code += `        print("Obrigado por usar a calculadora! Encerrando...")\n`;
      code += `        break\n\n`;

      if (useHistory) {
        code += `    if op.lower() == "h":\n`;
        code += `        if not historico:\n`;
        code += `            print("Histórico vazio! Nenhuma conta feita ainda.")\n`;
        code += `        else:\n`;
        code += `            print("=== HISTÓRICO DE CONTAS ===")\n`;
        code += `            for item in historico:\n`;
        code += `                print(f"• {item}")\n`;
        code += `        continue\n\n`;
      }
    } else {
      code += `print("=== CALCULADORA SIMPLES EM PYTHON ===")\n`;
      code += `op = input("Escolha a operação (+, -, *, /${includeAdvancedOps ? ', **, %' : ''}): ").strip()\n\n`;
    }

    if (useTryExcept) {
      code += `${indent}try:\n`;
      code += `${indent}    n1 = float(input("Digite o 1º número: "))\n`;
      if (!useLoop) {
        // already asked op before, else ask n2
      }
      code += `${indent}    n2 = float(input("Digite o 2º número: "))\n`;
    } else {
      code += `${indent}n1 = float(input("Digite o 1º número: "))\n`;
      code += `${indent}n2 = float(input("Digite o 2º número: "))\n`;
    }

    const innerIndent = useTryExcept ? indent + '    ' : indent;

    code += `\n${innerIndent}# Processando o cálculo\n`;
    if (useFunctions) {
      code += `${innerIndent}if op == "+":\n${innerIndent}    resultado = somar(n1, n2)\n`;
      code += `${innerIndent}elif op == "-":\n${innerIndent}    resultado = subtrair(n1, n2)\n`;
      code += `${innerIndent}elif op == "*":\n${innerIndent}    resultado = multiplicar(n1, n2)\n`;
      code += `${innerIndent}elif op == "/":\n${innerIndent}    resultado = dividir(n1, n2)\n`;
      if (includeAdvancedOps) {
        code += `${innerIndent}elif op == "**":\n${innerIndent}    resultado = potencia(n1, n2)\n`;
        code += `${innerIndent}elif op == "%":\n${innerIndent}    resultado = resto(n1, n2)\n`;
      }
      code += `${innerIndent}else:\n${innerIndent}    resultado = "Operação desconhecida!"\n`;
    } else {
      code += `${innerIndent}if op == "+":\n${innerIndent}    resultado = n1 + n2\n`;
      code += `${innerIndent}elif op == "-":\n${innerIndent}    resultado = n1 - n2\n`;
      code += `${innerIndent}elif op == "*":\n${innerIndent}    resultado = n1 * n2\n`;
      code += `${innerIndent}elif op == "/":\n`;
      code += `${innerIndent}    if n2 == 0:\n${innerIndent}        resultado = "Erro: Divisão por zero!"\n`;
      code += `${innerIndent}    else:\n${innerIndent}        resultado = n1 / n2\n`;
      if (includeAdvancedOps) {
        code += `${innerIndent}elif op == "**":\n${innerIndent}    resultado = n1 ** n2\n`;
        code += `${innerIndent}elif op == "%":\n${innerIndent}    resultado = n1 % n2\n`;
      }
      code += `${innerIndent}else:\n${innerIndent}    resultado = "Operação inválida!"\n`;
    }

    const displayFormat = formatDecimals ? ':.2f' : '';
    code += `\n${innerIndent}# Exibe o resultado formatado\n`;
    code += `${innerIndent}if isinstance(resultado, (int, float)):\n`;
    code += `${innerIndent}    mensagem = f"{n1} {op} {n2} = {resultado${displayFormat}}"\n`;
    code += `${innerIndent}    print(f"Resultado: {mensagem}")\n`;
    if (useHistory) {
      code += `${innerIndent}    historico.append(mensagem)  # Salva na lista\n`;
    }
    code += `${innerIndent}else:\n`;
    code += `${innerIndent}    print(resultado)\n`;

    if (useTryExcept) {
      code += `\n${indent}except ValueError:\n`;
      code += `${indent}    print("Erro: Digite apenas números válidos!")\n`;
    }

    return code;
  };

  const currentCode = generateCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'calculadora_customizada.py');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="gerador" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Construtor Interativo</span>
            <span aria-hidden="true">·</span>
            <span>Gere Seu Próprio Script</span>
            <span aria-hidden="true">·</span>
            <span className="text-purple-600 font-semibold">100% Personalizável</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Gerador de Código: Monte sua Calculadora
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Marque os recursos que você deseja e veja o código Python se adaptar instantaneamente com boas práticas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/50 space-y-5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>Configurações & Recursos</span>
            </h3>

            <div className="space-y-3">
              {/* Option 1: Advanced ops */}
              <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors shadow-2xs">
                <input
                  type="checkbox"
                  checked={includeAdvancedOps}
                  onChange={(e) => setIncludeAdvancedOps(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Adicionar Potência (**) e Resto (%)
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                    Permite calcular potências como 2³ e encontrar restos de divisão.
                  </span>
                </div>
              </label>

              {/* Option 2: Loop while */}
              <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors shadow-2xs">
                <input
                  type="checkbox"
                  checked={useLoop}
                  onChange={(e) => setUseLoop(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Loop Contínuo (while True)
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                    Mantém a calculadora aberta até o usuário digitar &quot;0&quot; para sair.
                  </span>
                </div>
              </label>

              {/* Option 3: History */}
              <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors shadow-2xs">
                <input
                  type="checkbox"
                  checked={useHistory}
                  onChange={(e) => setUseHistory(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Histórico de Cálculos (com lista [])
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                    Salva as contas anteriores na memória usando o método <code className="font-mono text-purple-600">.append()</code>.
                  </span>
                </div>
              </label>

              {/* Option 4: Functions def */}
              <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors shadow-2xs">
                <input
                  type="checkbox"
                  checked={useFunctions}
                  onChange={(e) => setUseFunctions(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Arquitetura Modular com Funções (def)
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                    Separa cada cálculo em <code className="font-mono text-blue-600">def somar(a, b)</code>, etc.
                  </span>
                </div>
              </label>

              {/* Option 5: Try / Except */}
              <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors shadow-2xs">
                <input
                  type="checkbox"
                  checked={useTryExcept}
                  onChange={(e) => setUseTryExcept(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Proteção contra Letras (try / except)
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                    Evita que o programa feche abruptamente caso o usuário digite texto.
                  </span>
                </div>
              </label>

              {/* Option 6: 2 decimal places */}
              <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors shadow-2xs">
                <input
                  type="checkbox"
                  checked={formatDecimals}
                  onChange={(e) => setFormatDecimals(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Arredondar para 2 Casas Decimais (: .2f)
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                    Exibe <code className="font-mono text-emerald-600">3.33</code> em vez de <code className="font-mono text-slate-400">3.3333333333333335</code>.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Code Output Column (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 p-5 flex flex-col justify-between text-slate-100">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs mb-3">
              <span className="text-slate-400 font-mono">calculadora_customizada.py</span>
              <span className="text-emerald-400 font-sans text-[11px] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Atualizado dinamicamente
              </span>
            </div>

            <pre className="font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed max-h-[480px] overflow-y-auto">
              {currentCode}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Você pode salvar esse arquivo e rodar diretamente no seu computador com <code className="text-emerald-400 font-mono">python calculadora_customizada.py</code>.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
