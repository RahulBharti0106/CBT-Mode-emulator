import React, { useState, useEffect, useMemo } from 'react';
import { Exam, ExamState, QuestionStatus, QuestionType, Subject, Question, UserResponse } from '../types';
import MathRenderer from './MathRenderer';
import QuestionPalette from './QuestionPalette';
import Timer from './Timer';

interface Props {
  exam: Exam;
  onFinish: (state: ExamState) => void;
}

const ExamScreen: React.FC<Props> = ({ exam, onFinish }) => {
  // --- STATE ---
  const [currentSubjectId, setCurrentSubjectId] = useState<string>(exam.subjects[0].id);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(
    exam.subjects[0].sections[0].questions[0].id
  );
  
  // Flatten questions for easier navigation
  const allQuestionsMap = useMemo(() => {
    const map = new Map<string, Question>();
    exam.subjects.forEach(s => 
      s.sections.forEach(sec => 
        sec.questions.forEach(q => map.set(q.id, q))
      )
    );
    return map;
  }, [exam]);

  const [responses, setResponses] = useState<Record<string, UserResponse>>(() => {
    const initial: Record<string, UserResponse> = {};
    // Initialize all as NOT_VISITED
    allQuestionsMap.forEach((q) => {
      initial[q.id] = {
        questionId: q.id,
        status: QuestionStatus.NOT_VISITED,
        visited: false
      };
    });
    // Mark first as visited/not answered immediately
    const firstQ = exam.subjects[0].sections[0].questions[0].id;
    initial[firstQ] = { ...initial[firstQ], status: QuestionStatus.NOT_ANSWERED, visited: true };
    return initial;
  });

  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);

  // --- HELPERS ---
  const currentSubject = exam.subjects.find(s => s.id === currentSubjectId)!;
  const currentQuestion = allQuestionsMap.get(currentQuestionId)!;
  const currentResponse = responses[currentQuestionId];

  // --- EFFECTS ---
  
  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update visited status when changing questions
  useEffect(() => {
    setResponses(prev => {
      const existing = prev[currentQuestionId];
      if (existing.status === QuestionStatus.NOT_VISITED) {
        return {
          ...prev,
          [currentQuestionId]: { ...existing, status: QuestionStatus.NOT_ANSWERED, visited: true }
        };
      }
      return prev;
    });
  }, [currentQuestionId]);

  // --- HANDLERS ---

  const handleOptionSelect = (optId: string) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionId]: {
        ...prev[currentQuestionId],
        selectedOptionId: optId
      }
    }));
  };

  const handleNumericChange = (val: string) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionId]: {
        ...prev[currentQuestionId],
        numericAnswer: val
      }
    }));
  };

  const handleSaveNext = () => {
    setResponses(prev => {
      const curr = prev[currentQuestionId];
      let newStatus = curr.status;
      
      const hasAnswer = currentQuestion.type === QuestionType.MCQ 
        ? !!curr.selectedOptionId 
        : !!curr.numericAnswer;

      if (hasAnswer) {
        newStatus = QuestionStatus.ANSWERED;
      } else {
        newStatus = QuestionStatus.NOT_ANSWERED;
      }

      return {
        ...prev,
        [currentQuestionId]: { ...curr, status: newStatus }
      };
    });
    moveToNextQuestion();
  };

  const handleSaveMarkReview = () => {
    setResponses(prev => {
      const curr = prev[currentQuestionId];
      const hasAnswer = currentQuestion.type === QuestionType.MCQ 
        ? !!curr.selectedOptionId 
        : !!curr.numericAnswer;

      return {
        ...prev,
        [currentQuestionId]: { 
          ...curr, 
          status: hasAnswer ? QuestionStatus.ANSWERED_MARKED_FOR_REVIEW : QuestionStatus.MARKED_FOR_REVIEW 
        }
      };
    });
    moveToNextQuestion();
  };

  const handleMarkReview = () => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionId]: { ...prev[currentQuestionId], status: QuestionStatus.MARKED_FOR_REVIEW }
    }));
    moveToNextQuestion();
  };

  const handleClearResponse = () => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionId]: { 
        ...prev[currentQuestionId], 
        selectedOptionId: undefined, 
        numericAnswer: '',
        status: QuestionStatus.NOT_ANSWERED 
      }
    }));
  };

  const moveToNextQuestion = () => {
    // Find flattened index
    const allQ = Array.from(allQuestionsMap.values());
    const idx = allQ.findIndex(q => q.id === currentQuestionId);
    if (idx < allQ.length - 1) {
      const nextQ = allQ[idx + 1];
      // Switch subject if needed
      if (nextQ.subjectId !== currentSubjectId) {
        setCurrentSubjectId(nextQ.subjectId);
      }
      setCurrentQuestionId(nextQ.id);
    }
  };

  const handleNavigate = (qId: string) => {
    const targetQ = allQuestionsMap.get(qId)!;
    if (targetQ.subjectId !== currentSubjectId) {
      setCurrentSubjectId(targetQ.subjectId);
    }
    setCurrentQuestionId(qId);
  };

  const handleSubmit = () => {
    onFinish({
      currentSubjectId,
      currentQuestionId,
      responses,
      timeLeftSeconds: timeLeft,
      isSubmitModalOpen: false,
      examStatus: 'SUBMITTED'
    });
  };

  // --- RENDER HELPERS ---
  const getCurrentSectionName = () => {
    const sec = exam.subjects
      .flatMap(s => s.sections)
      .find(s => s.id === currentQuestion.sectionId);
    return sec?.name || '';
  };

  // Group questions by current subject for palette
  const currentSubjectQuestions = useMemo(() => {
    return exam.subjects.find(s => s.id === currentSubjectId)?.sections.flatMap(s => s.questions) || [];
  }, [currentSubjectId, exam]);


  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-black text-white h-16 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="font-bold text-lg">JEE (Main) Mock Test</div>
        <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
                <div className="text-sm text-gray-300">Candidate Name</div>
                <div className="font-bold">Anonymous User</div>
            </div>
            <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center">
                User
            </div>
        </div>
      </header>

      {/* SUB-HEADER / SUBJECT TABS */}
      <div className="bg-blue-600 text-white flex justify-between items-center px-2 h-12 shadow-md">
        <div className="flex space-x-1 h-full items-end">
            {exam.subjects.map(sub => (
                <button
                    key={sub.id}
                    onClick={() => {
                        setCurrentSubjectId(sub.id);
                        // Jump to first question of subject
                        setCurrentQuestionId(sub.sections[0].questions[0].id);
                    }}
                    className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${
                        currentSubjectId === sub.id 
                        ? 'bg-white text-blue-600' 
                        : 'bg-blue-500 hover:bg-blue-400 text-white'
                    }`}
                >
                    {sub.name}
                </button>
            ))}
        </div>
        <Timer seconds={timeLeft} />
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT: QUESTION AREA */}
        <main className="flex-1 flex flex-col overflow-auto bg-white relative">
            
            {/* Question Info Bar */}
            <div className="flex justify-between items-center border-b px-4 py-2 bg-gray-50">
                <div className="font-bold text-gray-700">
                    {getCurrentSectionName()}
                </div>
                <div className="text-sm text-gray-500">
                    Marks: <span className="text-green-600 font-bold">+4</span> / <span className="text-red-600 font-bold">-1</span>
                </div>
            </div>

            {/* Question Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="border-b pb-4 mb-4">
                    <div className="text-gray-500 text-sm mb-2 font-mono">Question No. {currentQuestion.orderIndex + 1}</div>
                    <MathRenderer text={currentQuestion.text} className="text-lg leading-relaxed text-gray-900 font-medium" />
                </div>

                {/* Options / Input */}
                <div className="mt-6">
                    {currentQuestion.type === QuestionType.MCQ && currentQuestion.options ? (
                        <div className="space-y-3">
                            {currentQuestion.options.map((opt, idx) => (
                                <label 
                                    key={opt.id} 
                                    className={`flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                                        ${currentResponse?.selectedOptionId === opt.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-300'}
                                    `}
                                >
                                    <input 
                                        type="radio" 
                                        name="mcq-option" 
                                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        checked={currentResponse?.selectedOptionId === opt.id}
                                        onChange={() => handleOptionSelect(opt.id)}
                                    />
                                    <div className="ml-3">
                                        <span className="font-bold text-gray-500 mr-2">{idx + 1}.</span>
                                        <MathRenderer text={opt.text} className="inline-block" />
                                    </div>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-xs">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer:</label>
                            <input 
                                type="text" 
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                placeholder="Enter numeric value"
                                value={currentResponse?.numericAnswer || ''}
                                onChange={(e) => handleNumericChange(e.target.value)}
                            />
                            <p className="mt-2 text-xs text-gray-500">Enter the precise numerical value.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="border-t bg-gray-50 p-3 flex flex-wrap gap-2 justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex gap-2">
                    <button 
                        onClick={handleSaveNext} 
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow transition-colors"
                    >
                        Save & Next
                    </button>
                    <button 
                        onClick={handleClearResponse}
                        className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded shadow-sm transition-colors"
                    >
                        Clear Response
                    </button>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={handleSaveMarkReview}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded shadow transition-colors text-sm"
                    >
                        Save & Mark for Review
                    </button>
                    <button 
                        onClick={handleMarkReview}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded shadow transition-colors text-sm"
                    >
                        Mark for Review & Next
                    </button>
                </div>
            </div>

        </main>

        {/* RIGHT: PALETTE SIDEBAR */}
        <aside className="w-80 bg-blue-50 border-l border-gray-300 flex flex-col hidden lg:flex">
            
            {/* User Details Mini */}
            <div className="p-4 bg-white border-b flex items-center gap-3">
                <div className="h-12 w-12 bg-gray-200 rounded-full flex-shrink-0" />
                <div className="overflow-hidden">
                    <div className="font-bold truncate">Anonymous User</div>
                    <div className="text-xs text-gray-500">Language: English</div>
                </div>
            </div>

            {/* Legend */}
            <div className="p-2 grid grid-cols-2 gap-2 text-xs border-b bg-white">
                <div className="flex items-center gap-1"><span className="w-4 h-4 bg-white border"></span> Not Visited</div>
                <div className="flex items-center gap-1"><span className="w-4 h-4 bg-red-500 text-white rounded-sm text-[8px] flex justify-center items-center"></span> Not Answered</div>
                <div className="flex items-center gap-1"><span className="w-4 h-4 bg-green-500 text-white rounded-sm"></span> Answered</div>
                <div className="flex items-center gap-1"><span className="w-4 h-4 bg-purple-600 text-white rounded-full"></span> Marked for Review</div>
                <div className="col-span-2 flex items-center gap-1"><span className="w-4 h-4 bg-purple-600 text-white rounded-sm relative"><div className="absolute bottom-0 right-0 w-1 h-1 bg-green-400 rounded-full"></div></span> Ans & Marked for Review</div>
            </div>

            {/* Section Palette */}
            <div className="bg-blue-600 text-white px-3 py-2 text-sm font-bold">
                {currentSubject.name} - {getCurrentSectionName()}
            </div>
            
            <div className="flex-1 overflow-auto bg-gray-100">
                <QuestionPalette 
                    questions={currentSubjectQuestions}
                    currentQuestionId={currentQuestionId}
                    responses={responses}
                    onNavigate={handleNavigate}
                />
            </div>

            {/* Bottom Submit */}
            <div className="p-4 bg-white border-t">
                <button 
                    onClick={() => {
                        const confirmSubmit = window.confirm("Are you sure you want to submit the exam?");
                        if(confirmSubmit) handleSubmit();
                    }}
                    className="w-full py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold rounded border border-blue-300 transition-colors"
                >
                    SUBMIT
                </button>
            </div>

        </aside>
      </div>
    </div>
  );
};

export default ExamScreen;