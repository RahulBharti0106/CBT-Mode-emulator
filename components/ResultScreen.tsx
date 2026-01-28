import React, { useState, useMemo } from 'react';
import { Exam, ExamState, QuestionType, QuestionStatus } from '../types';
import MathRenderer from './MathRenderer';

interface Props {
  exam: Exam;
  result: ExamState;
  saveStatus: 'idle' | 'success' | 'error';
  onBack: () => void;
}

const ResultScreen: React.FC<Props> = ({ exam, result, saveStatus, onBack }) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // --- STATISTICS CALCULATION ---
  const stats = useMemo(() => {
    let total = 0;
    let attempted = 0;
    let markedForReview = 0; // Marked but NOT saved (purple circle)
    let correct = 0;
    let incorrect = 0;
    let score = 0;

    const analysisData: any[] = [];

    exam.subjects.forEach(subject => {
      subject.sections.forEach(section => {
        section.questions.forEach(q => {
          total++;
          const response = result.responses[q.id];
          const status = response?.status || QuestionStatus.NOT_VISITED;

          let isCorrect = false;
          let isAttempted = false; // Strictly for scoring
          let userVal = '';

          // 1. Determine User's Selection (Visual)
          if (q.type === QuestionType.MCQ) {
            if (response?.selectedOptionId) {
              userVal = response.selectedOptionId;
            }
          } else {
            if (response?.numericAnswer) {
              userVal = response.numericAnswer;
            }
          }

          // 2. Determine Scoring Status based on NTA Rules
          // Only 'ANSWERED' and 'ANSWERED_MARKED_FOR_REVIEW' are considered attempted/saved.
          if (status === QuestionStatus.ANSWERED || status === QuestionStatus.ANSWERED_MARKED_FOR_REVIEW) {
             isAttempted = true;
          }

          if (status === QuestionStatus.MARKED_FOR_REVIEW) {
             markedForReview++;
          }

          // 3. Calculate Score
          if (isAttempted) {
             attempted++;
             
             if (q.type === QuestionType.MCQ) {
                const correctOpt = q.options?.find(o => o.isCorrect);
                if (correctOpt && correctOpt.id === userVal) {
                   isCorrect = true;
                }
             } else {
                if (parseFloat(userVal) === q.correctValue) {
                   isCorrect = true;
                }
             }

             if (isCorrect) {
               correct++;
               score += 4;
             } else {
               incorrect++;
               score -= 1;
             }
          }

          analysisData.push({
            question: q,
            subjectName: subject.name,
            isCorrect,
            isAttempted, // For scoring
            userVal, // What they actually clicked/typed (even if not saved)
            status
          });
        });
      });
    });

    return { total, attempted, markedForReview, correct, incorrect, score, analysisData };
  }, [exam, result]);

  // --- RENDER HELPERS ---

  const renderSolution = (item: any) => {
    const { question } = item;
    
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
        <div className="mb-2 font-bold text-gray-700 text-sm">Question:</div>
        <MathRenderer text={question.text} className="mb-4 text-gray-800" />
        
        {question.type === QuestionType.MCQ ? (
          <div className="space-y-2">
            {question.options.map((opt: any, idx: number) => {
              const isSelected = item.userVal === opt.id;
              const isCorrectOpt = opt.isCorrect;
              
              let borderClass = "border-gray-200";
              let bgClass = "bg-white";
              let icon = null;

              if (isCorrectOpt) {
                borderClass = "border-green-500";
                bgClass = "bg-green-50";
                icon = <span className="text-green-600 font-bold ml-auto">✓ Correct Answer</span>;
              }
              
              if (isSelected) {
                 if (isCorrectOpt) {
                    icon = <span className="text-green-600 font-bold ml-auto">✓ Your Answer</span>;
                 } else {
                    borderClass = "border-red-500";
                    bgClass = "bg-red-50";
                    icon = <span className="text-red-600 font-bold ml-auto">✗ Your Answer</span>;
                 }
              }

              return (
                <div key={opt.id} className={`p-3 border rounded flex items-center ${borderClass} ${bgClass}`}>
                  <span className="font-mono text-gray-500 mr-3">{idx + 1}.</span>
                  <MathRenderer text={opt.text} />
                  {icon}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-2">
            <div className="flex gap-4">
               <div>
                 <span className="block text-xs text-gray-500">Your Answer</span>
                 <span className={`font-bold ${item.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {item.userVal || 'N/A'}
                 </span>
               </div>
               <div>
                 <span className="block text-xs text-gray-500">Correct Answer</span>
                 <span className="font-bold text-green-600">{question.correctValue}</span>
               </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // --- MAIN VIEW ---

  if (showAnalysis) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow-sm sticky top-0 z-10 px-4 py-3 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Score Analysis</h2>
            <button onClick={() => setShowAnalysis(false)} className="text-blue-600 font-medium hover:underline">
                &larr; Back to Scorecard
            </button>
        </div>

        <div className="max-w-4xl mx-auto w-full p-4 space-y-4">
            {stats.analysisData.map((item, index) => (
                <div key={item.question.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div 
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                        <div className="flex items-start gap-4 flex-1">
                            <span className="text-gray-400 font-mono text-sm mt-1">#{index + 1}</span>
                            <div>
                                <div className="text-xs text-gray-500 uppercase font-bold">{item.subjectName}</div>
                                <div className="text-sm font-medium text-gray-800">
                                   <MathRenderer text={item.question.text.substring(0, 100) + (item.question.text.length > 100 ? '...' : '')} className="line-clamp-2" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[200px]">
                            {/* Status Badge */}
                            {!item.isAttempted ? (
                                item.status === QuestionStatus.MARKED_FOR_REVIEW ? (
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-bold whitespace-nowrap">Marked for Review</span>
                                ) : (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-bold">Unattempted</span>
                                )
                            ) : item.isCorrect ? (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Correct</span>
                            ) : (
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-bold">Incorrect</span>
                            )}

                            <button 
                                onClick={() => setExpandedQuestionId(expandedQuestionId === item.question.id ? null : item.question.id)}
                                className={`text-sm font-bold px-3 py-1 rounded border transition-colors whitespace-nowrap
                                    ${item.isCorrect 
                                        ? 'border-green-200 text-green-600 hover:bg-green-50' 
                                        : 'border-red-200 text-red-600 hover:bg-red-50'}
                                `}
                            >
                                {expandedQuestionId === item.question.id ? 'Hide' : (item.isCorrect ? 'View Question' : 'View Answer')}
                            </button>
                        </div>
                    </div>

                    {expandedQuestionId === item.question.id && (
                        <div className="border-t border-gray-100 p-4">
                            {renderSolution(item)}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    );
  }

  // --- SCORECARD VIEW ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full text-center">
        <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Result Summary</h1>
            <p className="text-gray-500 mt-1">{exam.name}</p>
        </div>

        {/* Database Status Message */}
        <div className="mb-6">
             {saveStatus === 'success' && (
                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    ✓ Result saved to database
                 </div>
             )}
             {saveStatus === 'error' && (
                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                    ! Could not save to database (Check SQL Schema)
                 </div>
             )}
        </div>

        {/* Main Score Block */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 w-full md:w-1/3">
                <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Score</div>
                <div className="text-5xl font-extrabold text-blue-600">{stats.score}</div>
                <div className="text-xs text-gray-400 mt-2">out of {stats.total * 4}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-2/3">
                 <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="text-2xl font-bold text-green-600">{stats.correct}</div>
                    <div className="text-xs text-green-800 font-medium">Correct</div>
                 </div>
                 <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="text-2xl font-bold text-red-600">{stats.incorrect}</div>
                    <div className="text-xs text-red-800 font-medium">Incorrect</div>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-2xl font-bold text-gray-700">{stats.attempted}</div>
                    <div className="text-xs text-gray-600 font-medium">Attempted</div>
                 </div>
                 <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="text-2xl font-bold text-purple-600">{stats.markedForReview}</div>
                    <div className="text-xs text-purple-800 font-medium">Marked for Review <br/><span className="text-[10px] opacity-75">(Not Saved)</span></div>
                 </div>
            </div>
        </div>

        <div className="flex flex-col gap-3">
            <button 
                onClick={() => setShowAnalysis(true)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all active:scale-[0.98]"
            >
                View Full Scorecard & Solutions
            </button>
            <button 
                onClick={onBack}
                className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-colors"
            >
                Back to Home
            </button>
        </div>

      </div>
    </div>
  );
};

export default ResultScreen;