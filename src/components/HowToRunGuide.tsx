import React from 'react';
import { Terminal, Laptop, Globe, Check, AlertCircle } from 'lucide-react';

export const HowToRunGuide: React.FC = () => {
  return (
    <section id="como-rodar" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Próximos Passos</span>
          <span aria-hidden="true">·</span>
          <span>Prática no Mundo Real</span>
          <span aria-hidden="true">·</span>
          <span className="text-blue-600 font-semibold">Sem Complicações</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Como Rodar Este Código no Seu Computador
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Três formas simples e testadas para você colocar o script para rodar hoje mesmo.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Method 1: Local Terminal */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Método 1: Terminal Local (CMD / Bash)
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Ideal para quem já tem ou deseja instalar o Python em sua máquina Windows, Mac ou Linux.
            </p>

            <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside">
              <li>
                Baixe o Python em <strong className="text-slate-900">python.org</strong> (marque a opção <em>&quot;Add python.exe to PATH&quot;</em>).
              </li>
              <li>
                Crie um arquivo chamado <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">calculadora.py</code> e cole o código.
              </li>
              <li>
                Abra o terminal na pasta do arquivo e digite:
                <pre className="mt-1.5 p-2 bg-slate-900 text-emerald-400 rounded-md font-mono text-[11px]">
                  python calculadora.py
                </pre>
              </li>
            </ol>
          </div>
        </div>

        {/* Method 2: Google Colab */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Método 2: Google Colab (Online)
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Não precisa instalar nada! Funciona 100% no seu navegador com sua conta Google.
            </p>

            <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside">
              <li>
                Acesse <strong className="text-slate-900">colab.research.google.com</strong>.
              </li>
              <li>
                Clique em <em>&quot;Novo notebook&quot;</em>.
              </li>
              <li>
                Cole o código na primeira célula de código.
              </li>
              <li>
                Aperte o botão de <strong className="text-slate-900">Play (▶)</strong> ou o atalho <kbd className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">Shift + Enter</kbd> para rodar e interagir!
              </li>
            </ol>
          </div>
        </div>

        {/* Method 3: VS Code */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Método 3: Visual Studio Code
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              O editor de código preferido da comunidade de desenvolvedores profissionais.
            </p>

            <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside">
              <li>
                Abra o VS Code e instale a extensão oficial de <strong className="text-slate-900">Python (Microsoft)</strong>.
              </li>
              <li>
                Crie seu arquivo <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">calculadora.py</code>.
              </li>
              <li>
                Clique no botão de <strong className="text-slate-900">Run Python File</strong> no canto superior direito.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Golden Rules for Beginners */}
      <div className="px-6 pb-6">
        <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                Regra de Ouro do Python: A Indentação
              </h4>
              <p className="text-xs text-blue-900 mt-0.5 leading-relaxed">
                Ao contrário de linguagens como C ou JavaScript que usam chaves <code className="bg-blue-100 px-1 rounded font-mono">&#123; &#125;</code>, o Python usa o recuo de <strong>4 espaços (ou tecla Tab)</strong> para saber o que está dentro do <em>if</em> ou da função <em>def</em>. Mantenha os alinhamentos impecáveis!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
