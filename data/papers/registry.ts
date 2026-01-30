import { ExamMetadata } from '../types';

export const EXAM_REGISTRY: ExamMetadata[] = [
  {
    id: 'jee-main-2025-jan-23-s1',
    title: 'JEE Main 2025 (23 Jan Shift 1)',
    type: 'JEE',
    year: 2025,
    date: '23 Jan',
    shift: 'Shift 1',
    status: 'AVAILABLE',
    description: 'Past year paper (Memory Based)'
  },
  {
    id: 'jee-main-2025-jan-22-s2',
    title: 'JEE Main 2025 (22 Jan Shift 2)',
    type: 'JEE',
    year: 2025,
    date: '22 Jan',
    shift: 'Shift 2',
    status: 'AVAILABLE',
    description: 'Past year paper (Memory Based)'
  },
  {
    id: 'jee-main-2025-jan-22-s1',
    title: 'JEE Main 2025 (22 Jan Shift 1)',
    type: 'JEE',
    year: 2025,
    date: '22 Jan',
    shift: 'Shift 1',
    status: 'AVAILABLE',
    description: 'Past year paper (Memory Based)'
  },
  {
    id: 'jee-main-2024-jan-27-s1',
    title: 'JEE Main 2024 (Session 1)',
    type: 'JEE',
    year: 2024,
    date: '27 Jan',
    shift: 'Shift 1',
    status: 'COMING_SOON',
    description: 'Past year paper.'
  },
  {
    id: 'neet-ug-2024',
    title: 'NEET UG 2024',
    type: 'NEET',
    year: 2024,
    date: '05 May',
    status: 'COMING_SOON',
    description: 'Full syllabus biology, physics, and chemistry.'
  }
];

export async function loadExamData(examId: string) {
  switch (examId) {
    case 'jee-main-2025-jan-22-s1':
      return (await import('./jee-main-2025-jan-22-s1')).EXAM_DATA;
    case 'jee-main-2025-jan-23-s1':
      return (await import('./jee-main-2025-jan-23-s1')).EXAM_DATA;
    case 'jee-main-2025-jan-22-s2':
      return (await import('./jee-main-2025-jan-22-s2')).EXAM_DATA;
    default:
      throw new Error(`Exam data not found for ${examId}`);
  }
}