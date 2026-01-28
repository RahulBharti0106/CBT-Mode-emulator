import React from 'react';
import { Question, UserResponse, QuestionStatus } from '../types';

interface PaletteProps {
  questions: Question[];
  currentQuestionId: string;
  responses: Record<string, UserResponse>;
  onNavigate: (qId: string) => void;
}

const QuestionPalette: React.FC<PaletteProps> = ({ questions, currentQuestionId, responses, onNavigate }) => {
  
  const getStatusClass = (qId: string) => {
    const response = responses[qId];
    
    // If current question, usually highlighted with a border, but status color persists behind
    const isCurrent = qId === currentQuestionId;
    
    if (!response || response.status === QuestionStatus.NOT_VISITED) {
      // NTA: White box, curved corners
      return "bg-white border-gray-300 text-black";
    }
    
    switch (response.status) {
      case QuestionStatus.ANSWERED:
        return "bg-green-500 text-white border-green-600";
      case QuestionStatus.NOT_ANSWERED:
        return "bg-red-500 text-white border-red-600";
      case QuestionStatus.MARKED_FOR_REVIEW:
        return "bg-purple-600 text-white border-purple-700 rounded-full"; // NTA is circle often
      case QuestionStatus.ANSWERED_MARKED_FOR_REVIEW:
        return "bg-purple-600 text-white border-purple-700 relative"; // Needs green tick indicator
      default:
        return "bg-white border-gray-300 text-black";
    }
  };

  const renderStatusIcon = (qId: string) => {
    const response = responses[qId];
    if (response?.status === QuestionStatus.ANSWERED_MARKED_FOR_REVIEW) {
      // Little green dot overlay
      return <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white"></div>;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-2 max-h-[400px] overflow-y-auto">
      {questions.map((q, idx) => (
        <button
          key={q.id}
          onClick={() => onNavigate(q.id)}
          className={`
            h-10 w-10 flex items-center justify-center text-sm font-semibold border shadow-sm relative
            ${getStatusClass(q.id)}
            ${q.id === currentQuestionId ? 'ring-2 ring-blue-500 z-10' : ''}
          `}
          style={{ clipPath: responses[q.id]?.status.includes('MARKED') ? 'circle(50%)' : 'none' }}
        >
          {idx + 1}
          {renderStatusIcon(q.id)}
        </button>
      ))}
    </div>
  );
};

export default QuestionPalette;