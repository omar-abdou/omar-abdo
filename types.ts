
export enum AppState {
  SELECT_AGE = 'SELECT_AGE',
  TAKING_TEST = 'TAKING_TEST',
  SHOWING_RESULTS = 'SHOWING_RESULTS',
}

export enum AgeGroup {
  CHILD = '6-10 سنوات',
  TEEN = '11-16 سنة',
  ADULT = '17+ سنة',
}

export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface UserAnswer {
  questionId: number;
  selectedOptionIndex: number;
}

export interface AnalysisCategory {
  name: string;
  score: number;
  comment: string;
}

export interface TestResult {
  estimatedIQ: number;
  summary: string;
  analysis: AnalysisCategory[];
  recommendations: string[];
}
