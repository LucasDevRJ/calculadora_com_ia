import { PythonCodeVersion } from '../types';

export const PYTHON_VERSIONS: PythonCodeVersion[] = [
  {
    id: 'basico',
    title: '1. Código Essencial (Mais Simples)',
    badge: 'Recomendado para o 1º dia',
    difficulty: 'Iniciante',
    description: 'Código direto e limpo. Lê dois números, pergunta a operação matemática e calcula usando if/elif/else.',
    keyHighlights: [
      'Entrada de dados com input()',
      'Conversão de tipo com float()',
      'Estruturas de decisão if / elif / else',
      'Impressão formatada com f-string',
    ],
    code: `# ========================================================
# CALCULADORA SIMPLES EM PYTHON - AS 4 OPERAÇÕES BÁSICAS
# ========================================================

print("=== CALCULADORA SIMPLES ===")
print("Operações disponíveis: + (Soma), - (Subtração), * (Multiplicação), / (Divisão)")

# 1. Coleta os números digitados pelo usuário
# Usamos float() para permitir tanto números inteiros (5) quanto decimais (4.5)
num1 = float(input("Digite o primeiro número: "))
operacao = input("Digite a operação desejada (+, -, *, /): ")
num2 = float(input("Digite o segundo número: "))

# 2. Verifica qual operação foi escolhida e calcula o resultado
if operacao == "+":
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # Regra matemática: não é possível dividir nenhum número por zero!
    if num2 == 0:
        print("Erro: Não é possível dividir por zero!")
    else:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")

else:
    print("Operação inválida! Por favor, escolha +, -, * ou /.")`,
    annotations: [
      {
        lineNumber: 5,
        code: 'print("=== CALCULADORA SIMPLES ===")',
        conceptTitle: 'A função print()',
        explanation: 'Mostra textos ou variáveis na tela do terminal. Tudo dentro das aspas (" ") é exibido como texto literal.',
        tags: ['saída', 'texto', 'básico'],
      },
      {
        lineNumber: 10,
        code: 'num1 = float(input("Digite o primeiro número: "))',
        conceptTitle: 'input() e conversão float()',
        explanation: 'A função input() lê o que o usuário digitou no teclado. Porém, ela SEMPRE retorna texto (string). Por isso usamos float(...) por fora, convertendo "10" em número decimal 10.0 para poder calcular.',
        tags: ['entrada', 'tipos', 'conversão'],
      },
      {
        lineNumber: 11,
        code: 'operacao = input("Digite a operação desejada (+, -, *, /): ")',
        conceptTitle: 'Variável de texto (String)',
        explanation: 'Aqui guardamos o símbolo matemático digitado (+, -, * ou /). Como é um caractere e não um cálculo, mantemos como texto (sem converter para float).',
        tags: ['variáveis', 'string'],
      },
      {
        lineNumber: 15,
        code: 'if operacao == "+":',
        conceptTitle: 'Estrutura condicional if (Se)',
        explanation: 'O if faz uma pergunta lógica: "A variável operacao é igual a \'+\'?". Note o uso de == (dois sinais de igual) para comparar igualdade (um único = é para atribuir valor).',
        tags: ['condicionais', 'operador de comparação'],
      },
      {
        lineNumber: 17,
        code: 'print(f"Resultado: {num1} + {num2} = {resultado}")',
        conceptTitle: 'Formatação f-string',
        explanation: 'Ao colocar a letra f antes das aspas (f"..."), você pode inserir variáveis dentro de chaves {num1}. O Python substitui automaticamente pelos seus valores reais.',
        tags: ['f-strings', 'interpolação'],
      },
      {
        lineNumber: 19,
        code: 'elif operacao == "-":',
        conceptTitle: 'O comando elif (Senão Se)',
        explanation: 'Abreviação de "else if". É testado apenas se a condição anterior (o if) tiver sido falsa. Permite testar várias alternativas em cadeia.',
        tags: ['condicionais', 'controle de fluxo'],
      },
      {
        lineNumber: 28,
        code: 'if num2 == 0:',
        conceptTitle: 'Proteção contra Divisão por Zero',
        explanation: 'Na matemática, a divisão por zero não é definida. Se tentarmos num1 / 0, o Python trava com o erro ZeroDivisionError. Esse if impede que o programa quebre.',
        tags: ['matemática', 'boas práticas', 'prevenção'],
      },
      {
        lineNumber: 34,
        code: 'else:',
        conceptTitle: 'O comando else (Senão)',
        explanation: 'Executado caso nenhuma das opções anteriores (+, -, *, /) tenha sido verdadeira. Excelente para avisar o usuário que ele digitou uma opção inválida.',
        tags: ['condicionais', 'fallback'],
      },
    ],
  },
  {
    id: 'funcoes',
    title: '2. Modular com Funções (def)',
    badge: 'Boas Práticas',
    difficulty: 'Iniciante',
    description: 'Organiza cada operação matemática em sua própria função reutilizável usando a palavra-chave def.',
    keyHighlights: [
      'Declaração de funções com def',
      'Passagem de parâmetros e retorno com return',
      'Código modular, testável e reutilizável',
    ],
    code: `# ========================================================
# CALCULADORA MODULAR COM FUNÇÕES (def)
# ========================================================

# 1. Definindo as funções para cada operação
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a diferença entre dois números."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão ou uma mensagem de erro se b for zero."""
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# 2. Programa principal
print("=== CALCULADORA COM FUNÇÕES ===")
n1 = float(input("Digite o 1º número: "))
n2 = float(input("Digite o 2º número: "))
op = input("Escolha a operação (+, -, *, /): ")

# 3. Chamando a função adequada
if op == "+":
    res = somar(n1, n2)
elif op == "-":
    res = subtrair(n1, n2)
elif op == "*":
    res = multiplicar(n1, n2)
elif op == "/":
    res = dividir(n1, n2)
else:
    res = "Operação inválida!"

print(f"Resultado final: {res}")`,
    annotations: [
      {
        lineNumber: 6,
        code: 'def somar(a, b):',
        conceptTitle: 'Definição de Função (def)',
        explanation: 'A palavra-chave def ensina uma nova habilidade ao Python. A função somar aceita dois valores (a e b) e pode ser chamada quantas vezes você quiser no programa.',
        tags: ['funções', 'modularização'],
      },
      {
        lineNumber: 8,
        code: 'return a + b',
        conceptTitle: 'Instrução return',
        explanation: 'O return devolve o resultado do cálculo para quem chamou a função, permitindo guardar esse valor em uma variável ou exibi-lo.',
        tags: ['funções', 'retorno'],
      },
      {
        lineNumber: 29,
        code: 'res = somar(n1, n2)',
        conceptTitle: 'Chamada de Função',
        explanation: 'Aqui enviamos os valores digitados (n1 e n2) para dentro da função somar. O valor devolvido é guardado na variável res.',
        tags: ['funções', 'execução'],
      },
    ],
  },
  {
    id: 'loop',
    title: '3. Calculadora Contínua (while True)',
    badge: 'Interativa',
    difficulty: 'Iniciante',
    description: 'Calculadora com menu que não fecha após uma única conta: o usuário pode fazer várias operações até digitar "sair".',
    keyHighlights: [
      'Loop infinito controlado com while True',
      'Interrupção segura com o comando break',
      'Menu amigável de opções',
    ],
    code: `# ========================================================
# CALCULADORA COM LOOP INTERATIVO (while True)
# ========================================================

while True:
    print("\\n" + "=" * 30)
    print("      MENU DA CALCULADORA")
    print("=" * 30)
    print("1. Soma (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("0. Sair do programa")
    print("-" * 30)
    
    opcao = input("Escolha uma opção (0 a 4): ")
    
    # Se o usuário escolher '0', encerramos o loop
    if opcao == "0":
        print("Encerrando a calculadora. Até mais!")
        break
        
    if opcao not in ["1", "2", "3", "4"]:
        print("Opção inválida! Escolha um número de 0 a 4.")
        continue  # Volta para o início do menu
        
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))
    
    if opcao == "1":
        print(f"Resultado: {num1} + {num2} = {num1 + num2}")
    elif opcao == "2":
        print(f"Resultado: {num1} - {num2} = {num1 - num2}")
    elif opcao == "3":
        print(f"Resultado: {num1} * {num2} = {num1 * num2}")
    elif opcao == "4":
        if num2 == 0:
            print("Erro: Impossível dividir por zero!")
        else:
            print(f"Resultado: {num1} / {num2} = {num1 / num2}")`,
    annotations: [
      {
        lineNumber: 5,
        code: 'while True:',
        conceptTitle: 'Laço de Repetição while True',
        explanation: 'Cria uma repetição que roda indefinidamente até encontrar a palavra break. Muito comum em jogos e programas com menus.',
        tags: ['loops', 'iteração', 'menus'],
      },
      {
        lineNumber: 20,
        code: 'break',
        conceptTitle: 'O comando break',
        explanation: 'Interrompe e sai imediatamente do bloco de repetição while. O programa segue em frente após o loop.',
        tags: ['loops', 'controle'],
      },
      {
        lineNumber: 24,
        code: 'continue',
        conceptTitle: 'O comando continue',
        explanation: 'Pula o restante do loop atual e volta direto para o início da repetição, pedindo a opção novamente.',
        tags: ['loops', 'validação'],
      },
    ],
  },
  {
    id: 'try_except',
    title: '4. Robusta com Tratamento de Erros',
    badge: 'Nível Profissional',
    difficulty: 'Intermediário',
    description: 'Evita que o programa feche abruptamente caso o usuário digite letras no lugar de números ou tente dividir por zero.',
    keyHighlights: [
      'Tratamento com blocos try e except',
      'Captura de ValueError (quando texto é digitado)',
      'Captura de ZeroDivisionError nativo do Python',
    ],
    code: `# ========================================================
# CALCULADORA PROFISSIONAL COM TRATAMENTO DE ERROS
# ========================================================

def calcular():
    print("=== CALCULADORA BLINDADA CONTRA ERROS ===")
    
    try:
        # Tenta converter as entradas para float
        n1 = float(input("Digite o primeiro número: "))
        op = input("Operação (+, -, *, /): ").strip()
        n2 = float(input("Digite o segundo número: "))
        
        if op == "+":
            res = n1 + n2
        elif op == "-":
            res = n1 - n2
        elif op == "*":
            res = n1 * n2
        elif op == "/":
            try:
                res = n1 / n2
            except ZeroDivisionError:
                return "Erro matemático: Não existe divisão por zero."
        else:
            return f"Operação '{op}' desconhecida! Use +, -, * ou /."
            
        return f"Resultado com sucesso: {n1} {op} {n2} = {res}"

    except ValueError:
        # Acionado se o usuário digitar "abc" ou algo que não seja número
        return "Erro de digitação: Você deve digitar números válidos!"

# Executa o cálculo e exibe a mensagem
mensagem = calcular()
print(mensagem)`,
    annotations: [
      {
        lineNumber: 8,
        code: 'try:',
        conceptTitle: 'O bloco try (Tente)',
        explanation: 'O Python "tenta" executar as linhas dentro desse bloco. Se acontecer qualquer falha prevista, ele pula para o bloco except sem travar o computador.',
        tags: ['exceções', 'segurança', 'robustez'],
      },
      {
        lineNumber: 22,
        code: 'except ZeroDivisionError:',
        conceptTitle: 'Exceção ZeroDivisionError',
        explanation: 'Captura especificamente a tentativa de dividir um número por 0, permitindo exibir uma mensagem elegante ao usuário.',
        tags: ['exceções', 'matemática'],
      },
      {
        lineNumber: 28,
        code: 'except ValueError:',
        conceptTitle: 'Exceção ValueError',
        explanation: 'Se alguém digitar "olá" quando o programa espera um float(), o Python gera um ValueError. O except o intercepta amigavelmente.',
        tags: ['exceções', 'validação de entrada'],
      },
    ],
  },
  {
    id: 'sete_operadores',
    title: '5. Os 7 Operadores Nativos do Python',
    badge: 'Poder Matemático',
    difficulty: 'Iniciante',
    description: 'Inclui as 4 básicas mais Potência (**), Divisão Inteira (//) e Módulo/Resto da divisão (%).',
    keyHighlights: [
      'Potenciação com ** (ex: 2 ** 3 = 8)',
      'Divisão inteira com // (descarta os decimais)',
      'Resto da divisão com % (muito útil para par/ímpar)',
    ],
    code: `# ========================================================
# CALCULADORA COMPLETA: OS 7 OPERADORES NATIVOS DO PYTHON
# ========================================================

print("=== CALCULADORA DE 7 OPERAÇÕES ===")
print("+  : Soma")
print("-  : Subtração")
print("*  : Multiplicação")
print("/  : Divisão Real (retorna decimal)")
print("// : Divisão Inteira (retorna só a parte inteira)")
print("%  : Módulo (resto da divisão)")
print("** : Potenciação (exponenciação)")

n1 = float(input("\\nDigite o primeiro número: "))
op = input("Escolha o operador (+, -, *, /, //, %, **): ").strip()
n2 = float(input("Digite o segundo número: "))

if op == "+":
    res = n1 + n2
elif op == "-":
    res = n1 - n2
elif op == "*":
    res = n1 * n2
elif op == "/":
    if n2 == 0:
        res = "Erro: Não é possível dividir por zero!"
    else:
        res = n1 / n2
elif op == "//":
    if n2 == 0:
        res = "Erro: Divisão inteira por zero é inválida!"
    else:
        res = n1 // n2
elif op == "%":
    if n2 == 0:
        res = "Erro: Módulo por zero é inválido!"
    else:
        res = n1 % n2
elif op == "**":
    res = n1 ** n2
else:
    res = "Operador desconhecido!"

print(f"\\nResultado: {n1} {op} {n2} = {res}")`,
    annotations: [
      {
        lineNumber: 10,
        code: 'print("// : Divisão Inteira (retorna só a parte inteira)")',
        conceptTitle: 'Divisão Inteira (//)',
        explanation: 'A barra dupla // faz uma divisão matemática e joga fora a parte decimal. Por exemplo: 7 // 2 resulta em 3 (e não 3.5).',
        tags: ['operadores', 'aritmética'],
      },
      {
        lineNumber: 11,
        code: 'print("%  : Módulo (resto da divisão)")',
        conceptTitle: 'Módulo ou Resto (%)',
        explanation: 'O símbolo de porcentagem no Python calcula o que sobra da divisão inteira. Em 7 // 2 sobra 1, logo 7 % 2 é 1. Se n % 2 == 0, o número é par!',
        tags: ['operadores', 'lógica'],
      },
      {
        lineNumber: 12,
        code: 'print("** : Potenciação (exponenciação)")',
        conceptTitle: 'Potenciação (**)',
        explanation: 'Dois asteriscos realizam a potência: 2 ** 3 significa 2 elevado ao cubo (2 * 2 * 2 = 8). Muito mais rápido do que importar bibliotecas.',
        tags: ['operadores', 'potência'],
      },
    ],
  },
  {
    id: 'historico',
    title: '6. Com Histórico de Cálculos (Listas)',
    badge: 'Estruturas de Dados',
    difficulty: 'Intermediário',
    description: 'Apresenta o conceito de Listas (list) e o método .append() para salvar todas as contas realizadas.',
    keyHighlights: [
      'Criação de lista vazia com historico = []',
      'Adição dinâmica de elementos com .append()',
      'Exibição do histórico com laço for item in historico',
    ],
    code: `# ========================================================
# CALCULADORA COM HISTÓRICO DE CÁLCULOS (LISTAS)
# ========================================================

# 1. Criamos uma lista vazia na memória para guardar as contas
historico = []

print("=== CALCULADORA COM MEMÓRIA ===")

while True:
    print("\\nMenu: [1] Fazer Cálculo | [2] Ver Histórico | [0] Sair")
    opcao = input("Escolha uma opção: ").strip()

    if opcao == "0":
        print("Encerrando calculadora. Até a próxima!")
        break

    elif opcao == "2":
        if len(historico) == 0:
            print("Histórico vazio! Nenhuma conta realizada ainda.")
        else:
            print("=== SEU HISTÓRICO DE CONTAS ===")
            for i, registro in enumerate(historico, 1):
                print(f"{i}. {registro}")

    elif opcao == "1":
        n1 = float(input("Digite o 1º número: "))
        op = input("Operação (+, -, *, /): ")
        n2 = float(input("Digite o 2º número: "))

        if op == "+": res = n1 + n2
        elif op == "-": res = n1 - n2
        elif op == "*": res = n1 * n2
        elif op == "/": res = n1 / n2 if n2 != 0 else "Erro: Divisão por 0"
        else: res = "Inválido"

        linha_resumo = f"{n1} {op} {n2} = {res}"
        print(f"Resultado: {linha_resumo}")

        # 2. Guardamos a conta dentro da lista usando .append()
        historico.append(linha_resumo)`,
    annotations: [
      {
        lineNumber: 6,
        code: 'historico = []',
        conceptTitle: 'Listas em Python ([])',
        explanation: 'Os colchetes [] criam uma lista (estrutura de dados). Uma lista é como uma gaveta onde você pode guardar vários dados em ordem.',
        tags: ['listas', 'estruturas de dados'],
      },
      {
        lineNumber: 22,
        code: 'for i, registro in enumerate(historico, 1):',
        conceptTitle: 'Laço for com enumerate',
        explanation: 'O loop for percorre cada elemento guardado na lista. O enumerate gera automaticamente o número da linha (1, 2, 3...).',
        tags: ['loops', 'iteração', 'listas'],
      },
      {
        lineNumber: 38,
        code: 'historico.append(linha_resumo)',
        conceptTitle: 'O método .append()',
        explanation: 'O append("...") adiciona um novo item ao final da lista. É assim que programas mantêm históricos, carrinhos de compras e logs!',
        tags: ['listas', 'métodos'],
      },
    ],
  },
];
