import React from 'react';
import { Question, UserResponse, QuestionStatus } from '../types';

interface PaletteProps {
  questions: Question[];
  currentQuestionId: string;
  responses: Record<string, UserResponse>;
  onNavigate: (qId: string) => void;
}

const QuestionPalette: React.FC<PaletteProps> = ({ questions, currentQuestionId, responses, onNavigate }) => {
  
  const getButtonStyles = (qId: string) => {
    const response = responses[qId];
    const status = response?.status || QuestionStatus.NOT_VISITED;
    
    // NTA LOGIC:
    // Not Visited: White Box (Rectangle)
    // Not Answered: Red Box (Rectangle, top rounded sometimes, but NTA is typically fully boxy or slightly rounded)
    // Answered: Green Box (Rectangle)
    // Marked for Review: Purple Circle
    // Ans & Marked for Review: Purple Circle with Green Dot

    let baseClasses = "h-9 w-10 flex items-center justify-center text-sm font-medium border shadow-sm transition-all ";
    
    // Shape logic
    if (status === QuestionStatus.MARKED_FOR_REVIEW || status === QuestionStatus.ANSWERED_MARKED_FOR_REVIEW) {
        baseClasses += "rounded-full "; // Circle
    } else {
        baseClasses += "rounded-sm "; // Rectangle
    }

    // Color logic
    switch (status) {
      case QuestionStatus.ANSWERED:
        return baseClasses + "bg-green-500 text-white border-green-600 hover:bg-green-600";
      case QuestionStatus.NOT_ANSWERED:
        return baseClasses + "bg-red-500 text-white border-red-600 hover:bg-red-600";
      case QuestionStatus.MARKED_FOR_REVIEW:
        return baseClasses + "bg-purple-700 text-white border-purple-800 hover:bg-purple-800";
      case QuestionStatus.ANSWERED_MARKED_FOR_REVIEW:
        return baseClasses + "bg-purple-700 text-white border-purple-800 hover:bg-purple-800 relative";
      case QuestionStatus.NOT_VISITED:
      default:
        return baseClasses + "bg-white text-black border-gray-300 hover:bg-gray-100";
    }
  };

  const renderStatusOverlay = (qId: string) => {
    const response = responses[qId];
    if (response?.status === QuestionStatus.ANSWERED_MARKED_FOR_REVIEW) {
      // Small green check/dot at bottom right, positioned to overlap tightly
      return (
        <div className="absolute bottom-0 right-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500 bg-white rounded-full border border-gray-100 fill-current">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/>
            </svg>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-4 gap-3 p-3">
      {questions.map((q, idx) => (
        <div key={q.id} className="relative w-10 h-9 mx-auto">
            <button
            onClick={() => onNavigate(q.id)}
            className={`
                ${getButtonStyles(q.id)}
                ${q.id === currentQuestionId ? 'ring-2 ring-blue-400 ring-offset-1' : ''}
            `}
            >
            {idx + 1}
            </button>
            {renderStatusOverlay(q.id)}
        </div>
      ))}
    </div>
  );
};

export default QuestionPalette;