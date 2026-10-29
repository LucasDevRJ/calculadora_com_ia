import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Por que precisamos usar float(input(...)) em vez de apenas input(...) para pegar os números da calculadora?',
    options: [
      'Porque a função input() retorna texto (String), e precisamos de números para fazer cálculos.',
      'Porque o Python não aceita guardar números diretamente em variáveis.',
      'Porque float() faz o programa rodar duas vezes mais rápido.',
      'Porque o input() só funciona se estiver dentro de um float().'
    ],
    correctIndex: 0,
    explanation: 'Exatamente! O input() sempre lê dados do teclado em formato de texto (string). Sem a conversão com float() ou int(), ao tentar fazer "10" + "5", o Python juntaria os textos resultando em "105" em vez de calcular 15.'
  },
  {
    id: 2,
    question: 'Qual é a diferença fundamental entre "=" e "==" em Python?',
    options: [
      '"=" é usado apenas para números e "==" apenas para textos.',
      '"=" atribui valor a uma variável, enquanto "==" compara se dois valores são iguais.',
      'Não há diferença, ambos fazem a mesma coisa.',
      '"==" cria uma variável vazia e "=" apaga a variável.'
    ],
    correctIndex: 1,
    explanation: 'Perfeito! Um único igual (=) é atribuição: num = 10 (guarde 10 em num). Dois iguais (==) é comparação lógica: if operacao == "+" (verifique se operacao tem o valor "+").'
  },
  {
    id: 3,
    question: 'O que acontece no Python se o usuário tentar dividir 15 por 0 sem uma checagem prévia?',
    options: [
      'O Python retorna o valor infinito (inf) sem problemas.',
      'O programa é interrompido com o erro ZeroDivisionError.',
      'O Python automaticamente transforma o resultado em 0.',
      'O computador reinicia para proteger a memória.'
    ],
    correctIndex: 1,
    explanation: 'Correto! A divisão por zero não é permitida matematicamente e gera a exceção ZeroDivisionError, travando o script se não for evitada com um if ou tratada com try/except.'
  },
  {
    id: 4,
    question: 'Como a instrução f"O resultado é {resultado}" funciona no Python?',
    options: [
      'Ela força o texto a ficar em caixa alta.',
      'Ela substitui a expressão entre chaves {resultado} pelo valor real da variável.',
      'Ela procura um arquivo chamado "resultado.txt" no disco.',
      'Ela serve apenas para comentar código sem que o Python execute.'
    ],
    correctIndex: 1,
    explanation: 'Muito bem! Trata-se de uma f-string (format string), um dos recursos mais práticos do Python moderno para mesclar textos e variáveis dinamicamente.'
  },
  {
    id: 5,
    question: 'Em Python, como calculamos quanto é 15% de 200? E o que faz o operador "%" sozinho (ex: 15 % 2)?',
    options: [
      'Usamos (15 * 200) / 100 para porcentagem; já o operador % sozinho calcula o resto da divisão inteira (módulo).',
      'Basta escrever 15 % 200 que o Python calcula 15 por cento de 200 automaticamente.',
      'O Python não consegue calcular porcentagens sem importar uma biblioteca externa.',
      'O operador % calcula porcentagem e // calcula o resto da divisão.'
    ],
    correctIndex: 0,
    explanation: 'Excelente! Em Python, o símbolo % é o operador de Módulo (resto da divisão: 15 % 2 = 1). Para calcular porcentagem real, dividimos a taxa por 100 e multiplicamos pelo valor total: (15 / 100) * 200 = 30.0.'
  }
];
