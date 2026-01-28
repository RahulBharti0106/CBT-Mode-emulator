export enum QuestionType {
  MCQ = 'MCQ',
  NUMERIC = 'NUMERIC',
}

export enum QuestionStatus {
  NOT_VISITED = 'NOT_VISITED',
  NOT_ANSWERED = 'NOT_ANSWERED',
  ANSWERED = 'ANSWERED',
  MARKED_FOR_REVIEW = 'MARKED_FOR_REVIEW',
  ANSWERED_MARKED_FOR_REVIEW = 'ANSWERED_MARKED_FOR_REVIEW',
}

export interface Option {
  id: string;
  text: string; // Can be MathJax
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[]; // For MCQ
  correctValue?: number; // For Numeric
  sectionId: string;
  subjectId: string;
  orderIndex: number;
}

export interface Section {
  id: string;
  name: string; // "Section A" or "Section B"
  type: QuestionType;
  subjectId: string;
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string; // Physics, Chemistry, Mathematics
  sections: Section[];
}

export interface Exam {
  id: string;
  name: string;
  durationMinutes: number;
  subjects: Subject[];
}

export interface UserResponse {
  questionId: string;
  status: QuestionStatus;
  selectedOptionId?: string; // For MCQ
  numericAnswer?: string; // For Numeric
  visited: boolean;
}

export interface ExamState {
  currentSubjectId: string;
  currentQuestionId: string; // We track exact question for navigation
  responses: Record<string, UserResponse>;
  timeLeftSeconds: number;
  isSubmitModalOpen: boolean;
  examStatus: 'INSTRUCTIONS' | 'ONGOING' | 'SUBMITTED';
}

export type ExamType = 'JEE' | 'NEET' | 'CUET';

export interface ExamMetadata {
  id: string;
  title: string;
  type: ExamType;
  year: number;
  date: string;
  shift?: string;
  status: 'AVAILABLE' | 'COMING_SOON';
  description?: string;
}
