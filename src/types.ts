export type CodeLevel = 'basico' | 'funcoes' | 'loop' | 'try_except' | 'sete_operadores' | 'historico';

export interface CodeLineAnnotation {
  lineNumber: number;
  code: string;
  conceptTitle: string;
  explanation: string;
  tags: string[];
}

export interface PythonCodeVersion {
  id: CodeLevel;
  title: string;
  badge: string;
  difficulty: 'Iniciante' | 'Intermediário';
  description: string;
  code: string;
  annotations: CodeLineAnnotation[];
  keyHighlights: string[];
}

export interface ConceptItem {
  id: string;
  title: string;
  pythonSyntax: string;
  summary: string;
  details: string;
  example: string;
  whyItMatters: string;
  commonMistake: string;
  relatedLines: number[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
