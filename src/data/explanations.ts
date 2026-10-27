import { ConceptItem } from '../types';

export const CONCEPTS_DATA: ConceptItem[] = [
  {
    id: 'input-float',
    title: 'Entrada de Dados e Conversão (input + float)',
    pythonSyntax: 'num = float(input("Digite um número: "))',
    summary: 'Como o Python conversa com o usuário pelo teclado e transforma texto em números que podem ser calculados.',
    details: 'A função input() pausa o programa e espera que você digite algo no teclado e aperte Enter. Toda informação capturada pelo input() chega ao Python como texto (String). Se você somar "5" + "5" sem converter, o resultado será "55" (junção de texto)! Por isso, envolvemos com float(), transformando texto em número decimal.',
    example: `# Sem float: junta textos (concatenação)
a = "10"
b = "5"
print(a + b) # Imprime "105"

# Com float: realiza a soma matemática
a = float("10")
b = float("5")
print(a + b) # Imprime 15.0`,
    whyItMatters: 'Sem converter a entrada, nenhuma operação matemática (+, -, *, /) funcionará corretamente.',
    commonMistake: 'Esquecer de fechar o segundo parêntese ao final: float(input("...")).',
    relatedLines: [10, 12],
  },
  {
    id: 'if-elif-else',
    title: 'Tomada de Decisão (if / elif / else)',
    pythonSyntax: 'if operacao == "+": ... elif operacao == "-": ... else: ...',
    summary: 'A inteligência lógica da calculadora: analisa o símbolo escolhido e executa apenas a conta correspondente.',
    details: 'O if ("se") avalia se uma condição é verdadeira ou falsa. O elif ("senão se") só é testado se o if anterior foi falso. Por fim, o else ("caso contrário") roda se nenhuma das opções anteriores foi atendida (por exemplo, se o usuário digitou uma letra qualquer em vez de um sinal).',
    example: `op = "+"
if op == "+":
    print("Você escolheu soma")
elif op == "-":
    print("Você escolheu subtração")
else:
    print("Opção desconhecida")`,
    whyItMatters: 'Permite que um único programa faça coisas diferentes dependendo da vontade do usuário.',
    commonMistake: 'Confundir "=" (atribuição de valor) com "==" (teste de igualdade). Para comparar se dois valores são iguais, use sempre ==.',
    relatedLines: [15, 19, 23, 27, 34],
  },
  {
    id: 'f-strings',
    title: 'Formatação Moderna de Texto (f-strings)',
    pythonSyntax: 'print(f"Resultado: {num1} + {num2} = {resultado}")',
    summary: 'A forma mais limpa, moderna e elegante de misturar texto e variáveis em Python.',
    details: 'Introduzidas no Python 3.6, as f-strings são criadas adicionando a letra "f" minúscula antes da primeira aspa. Dentro do texto, qualquer variável ou expressão matemática colocada entre chaves { } será automaticamente calculada e convertida em texto legível.',
    example: `nome = "Ana"
idade = 20
print(f"Olá, {nome}! No ano que vem você fará {idade + 1} anos.")`,
    whyItMatters: 'Evita concatenações confusas e propensas a erros como "Resultado: " + str(num1) + " + " + str(num2).',
    commonMistake: 'Esquecer de colocar a letra f antes das aspas (ex: "{resultado}" vira apenas o texto literal "{resultado}").',
    relatedLines: [17, 21, 25, 32],
  },
  {
    id: 'divisao-por-zero',
    title: 'O Mistério da Divisão por Zero',
    pythonSyntax: 'if num2 == 0: print("Erro!") else: ...',
    summary: 'Por que o computador quebra se você tentar dividir por 0 e como evitar esse crash.',
    details: 'Na matemática elementar, a divisão por zero é indefinida (tente dividir 10 balas entre 0 pessoas: não faz sentido lógico). Em Python, executar 10 / 0 dispara imediatamente um erro fatal chamado ZeroDivisionError, encerrando o programa de forma abrupta. Verificar antes if num2 == 0 é uma regra de ouro para qualquer desenvolvedor.',
    example: `divisor = 0
if divisor == 0:
    print("Aviso: o divisor não pode ser zero!")
else:
    print(10 / divisor)`,
    whyItMatters: 'Todo bom programador prevê cenários inesperados para que o aplicativo nunca feche sozinho na cara do usuário.',
    commonMistake: 'Fazer o cálculo antes da checagem, por exemplo: resultado = n1 / n2 e só depois testar if n2 == 0.',
    relatedLines: [28, 29, 30, 31],
  },
  {
    id: 'funcoes-def',
    title: 'Modularização com Funções (def)',
    pythonSyntax: 'def somar(a, b): return a + b',
    summary: 'Como criar blocos de código independentes, organizados e fáceis de reutilizar.',
    details: 'Uma função é como uma pequena receita ou máquina especializada. Ela pode receber ingredientes (parâmetros como a e b), processá-los e devolver um prato pronto através da instrução return. Isso evita repetir as mesmas fórmulas em vários lugares do sistema.',
    example: `def multiplicar(x, y):
    return x * y

# Chamando a função várias vezes
conta1 = multiplicar(4, 5)   # 20
conta2 = multiplicar(10, 3)  # 30`,
    whyItMatters: 'É o pilar do desenvolvimento profissional (princípio DRY - Don\'t Repeat Yourself).',
    commonMistake: 'Esquecer o return dentro da função (a função executará, mas devolverá None).',
    relatedLines: [6, 7, 8],
  },
  {
    id: 'sete-operadores',
    title: 'Os 7 Operadores Matemáticos do Python',
    pythonSyntax: 'a + b, a - b, a * b, a / b, a ** b, a // b, a % b',
    summary: 'Além das 4 contas básicas, o Python possui operadores nativos para potência, divisão inteira e resto.',
    details: 'No Python, a potenciação é feita com ** (ex: 2 ** 3 = 8). A barra dupla // descarta as casas decimais (7 // 2 = 3). O operador de porcentagem % calcula o resto da divisão inteira (7 % 2 = 1), sendo o truque clássico de programação para saber se um número é par (n % 2 == 0) ou ímpar (n % 2 != 0).',
    example: `print(2 ** 4)   # 16 (2 elevado a 4)
print(10 // 3)  # 3 (descarta o .333...)
print(10 % 3)   # 1 (resto da divisão de 10 por 3)`,
    whyItMatters: 'Permite resolver problemas complexos como cálculos geométricos, juros compostos e algoritmos de paridade sem precisar de bibliotecas externas.',
    commonMistake: 'Confundir "^" com potência. No Python, o acento circunflexo "^" é um operador binário XOR e NÃO faz potenciação!',
    relatedLines: [10, 11, 12],
  },
  {
    id: 'historico-listas',
    title: 'Listas e Histórico de Cálculos (list + append)',
    pythonSyntax: 'historico = [] \n historico.append("10 + 5 = 15")',
    summary: 'A primeira estrutura de dados de todo programador: como guardar múltiplos registros em ordem na memória.',
    details: 'Uma lista em Python é criada usando colchetes []. Ela funciona como uma gaveta que pode guardar infinitos itens. Com o método .append(valor), você insere novos elementos no final da lista. Para ler tudo o que foi guardado, usamos o loop "for conta in historico: print(conta)".',
    example: `historico = []
historico.append("5 + 5 = 10")
historico.append("2 * 8 = 16")

print(f"Total de contas salvas: {len(historico)}")
for conta in historico:
    print(f"• {conta}")`,
    whyItMatters: 'É o primeiro passo para criar sistemas reais que armazenam histórico, listas de usuários, carrinhos de compras e bancos de dados em memória.',
    commonMistake: 'Recriar a lista dentro do loop (historico = []), o que apagaria todo o histórico anterior a cada nova rodada.',
    relatedLines: [6, 22, 38],
  },
];
