import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Exam, ExamState, QuestionStatus, QuestionType, Subject, Question, UserResponse } from '../types';
import MathRenderer from './MathRenderer';
import QuestionPalette from './QuestionPalette';
import Timer from './Timer';
import VirtualKeyboard from './VirtualKeyboard';

interface Props {
  exam: Exam;
  onFinish: (state: ExamState) => void;
  userName?: string;
}

const ExamScreen: React.FC<Props> = ({ exam, onFinish, userName = "Anonymous User" }) => {
  // --- ACCESSIBILITY STATE ---
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [cursorSize, setCursorSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [showCursorTrail, setShowCursorTrail] = useState(false);
  
  // --- EXAM STATE ---
  const [currentSubjectId, setCurrentSubjectId] = useState<string>(exam.subjects[0].id);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(
    exam.subjects[0].sections[0].questions[0].id
  );
  
  // Flatten questions
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
    allQuestionsMap.forEach((q) => {
      initial[q.id] = {
        questionId: q.id,
        status: QuestionStatus.NOT_VISITED,
        visited: false
      };
    });
    // Mark first as visited
    const firstQ = exam.subjects[0].sections[0].questions[0].id;
    initial[firstQ] = { ...initial[firstQ], status: QuestionStatus.NOT_ANSWERED, visited: true };
    return initial;
  });

  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);

  // --- HELPERS ---
  const currentSubject = exam.subjects.find(s => s.id === currentSubjectId)!;
  const currentQuestion = allQuestionsMap.get(currentQuestionId)!;
  const currentResponse = responses[currentQuestionId];

  // Group questions by current subject
  const currentSubjectQuestions = useMemo(() => {
    return exam.subjects.find(s => s.id === currentSubjectId)?.sections.flatMap(s => s.questions) || [];
  }, [currentSubjectId, exam]);

  // --- SUMMARY STATISTICS FOR LEGEND ---
  const summaryStats = useMemo(() => {
     let answered = 0;
     let notAnswered = 0;
     let notVisited = 0;
     let marked = 0;
     let ansMarked = 0;

     currentSubjectQuestions.forEach(q => {
         const r = responses[q.id];
         if (!r || r.status === QuestionStatus.NOT_VISITED) notVisited++;
         else if (r.status === QuestionStatus.ANSWERED) answered++;
         else if (r.status === QuestionStatus.NOT_ANSWERED) notAnswered++;
         else if (r.status === QuestionStatus.MARKED_FOR_REVIEW) marked++;
         else if (r.status === QuestionStatus.ANSWERED_MARKED_FOR_REVIEW) ansMarked++;
     });
     
     // Note: In strict NTA, the counts are usually for the CURRENT section/subject only.
     return { answered, notAnswered, notVisited, marked, ansMarked };
  }, [responses, currentSubjectQuestions]);

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
  }, []);

  // Update visited status
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

  // Cursor Trail Effect
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
      if (!showCursorTrail) return;
      const handleMove = (e: MouseEvent) => {
          if (cursorRef.current) {
              cursorRef.current.style.left = `${e.clientX}px`;
              cursorRef.current.style.top = `${e.clientY}px`;
          }
      };
      window.addEventListener('mousemove', handleMove);
      return () => window.removeEventListener('mousemove', handleMove);
  }, [showCursorTrail]);

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

  const handleNumericInput = (val: string) => {
    setResponses(prev => {
        const currVal = prev[currentQuestionId]?.numericAnswer || '';
        // Prevent multiple decimals
        if (val === '.' && currVal.includes('.')) return prev;
        return {
            ...prev,
            [currentQuestionId]: {
                ...prev[currentQuestionId],
                numericAnswer: currVal + val
            }
        };
    });
  };

  const handleNumericBackspace = () => {
    setResponses(prev => {
        const currVal = prev[currentQuestionId]?.numericAnswer || '';
        return {
            ...prev,
            [currentQuestionId]: {
                ...prev[currentQuestionId],
                numericAnswer: currVal.slice(0, -1)
            }
        };
    });
  };

  const handleNumericClear = () => {
      setResponses(prev => ({
          ...prev,
          [currentQuestionId]: {
              ...prev[currentQuestionId],
              numericAnswer: ''
          }
      }));
  };

  const handleManualNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const val = e.target.value;
       // Allow typing but typically exams restrict to numbers only
       if (!/^[0-9.]*$/.test(val)) return;
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
      const hasAnswer = currentQuestion.type === QuestionType.MCQ 
        ? !!curr.selectedOptionId 
        : !!curr.numericAnswer;

      return {
        ...prev,
        [currentQuestionId]: { ...curr, status: hasAnswer ? QuestionStatus.ANSWERED : QuestionStatus.NOT_ANSWERED }
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
    const allQ: Question[] = Array.from(allQuestionsMap.values());
    const idx = allQ.findIndex(q => q.id === currentQuestionId);
    if (idx < allQ.length - 1) {
      const nextQ = allQ[idx + 1];
      if (nextQ.subjectId !== currentSubjectId) {
        setCurrentSubjectId(nextQ.subjectId);
      }
      setCurrentQuestionId(nextQ.id);
    }
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

  // --- STYLING HELPERS ---
  const getContentStyle = () => {
      let fontSizeClass = 'text-base';
      if (fontSize === 'small') fontSizeClass = 'text-sm';
      if (fontSize === 'large') fontSizeClass = 'text-xl';

      return `${fontSizeClass} ${highContrast ? 'bg-black text-white' : 'bg-white text-gray-900'}`;
  };

  const getCursorClass = () => {
      if (cursorSize === 'large') return 'cursor-pointer-large'; // Define in CSS
      if (cursorSize === 'xl') return 'cursor-pointer-xl';
      return 'cursor-auto';
  };

  return (
    <div className={`flex flex-col h-screen w-full fixed inset-0 overflow-hidden select-none ${highContrast ? 'bg-black' : 'bg-gray-100'}`}>
      
      {/* GLOBAL STYLES FOR DYNAMIC CURSOR/THEME */}
      <style>{`
         .cursor-pointer-large { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="black" stroke="white"><path d="M5.5 3.21l10.08 5.61-3.66 1.34 2.8 6.67-2.3 1-2.8-6.67-3.46 2.66z"/></svg>'), auto !important; }
         .cursor-pointer-xl { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="black" stroke="white"><path d="M5.5 3.21l10.08 5.61-3.66 1.34 2.8 6.67-2.3 1-2.8-6.67-3.46 2.66z"/></svg>'), auto !important; }
      `}</style>

      {/* CURSOR TRAIL */}
      {showCursorTrail && (
          <div ref={cursorRef} className="fixed w-6 h-6 rounded-full bg-yellow-400 opacity-50 pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-multiply" />
      )}

      {/* HEADER - BLACK STRIP */}
      <header className={`h-14 flex items-center justify-between px-4 z-50 ${highContrast ? 'bg-gray-800 border-b border-gray-600' : 'bg-black text-white'}`}>
         <div className="font-bold text-lg tracking-wide">
             JEE (Main) Mock Test
         </div>
         
         {/* ACCESSIBILITY CONTROLS */}
         <div className="flex items-center gap-4">
             {/* Font Size */}
             <div className="hidden md:flex items-center bg-gray-700 rounded px-2 py-1 gap-1">
                 <button onClick={() => setFontSize('small')} className={`text-xs px-2 py-0.5 rounded ${fontSize === 'small' ? 'bg-blue-500 text-white' : 'text-gray-300'}`}>A-</button>
                 <button onClick={() => setFontSize('medium')} className={`text-sm px-2 py-0.5 rounded ${fontSize === 'medium' ? 'bg-blue-500 text-white' : 'text-gray-300'}`}>A</button>
                 <button onClick={() => setFontSize('large')} className={`text-lg px-2 py-0.5 rounded ${fontSize === 'large' ? 'bg-blue-500 text-white' : 'text-gray-300'}`}>A+</button>
             </div>

             {/* Theme Toggle */}
             <button 
                onClick={() => setHighContrast(!highContrast)} 
                className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-white border border-gray-600"
                title="Toggle High Contrast"
             >
                 {highContrast ? '☀ Light' : '☾ Dark'}
             </button>

             {/* Cursor Controls */}
             <div className="hidden lg:flex items-center bg-gray-700 rounded px-2 py-1 gap-1">
                 <span className="text-xs text-gray-400 mr-1">Cursor:</span>
                 <button onClick={() => setCursorSize(cursorSize === 'normal' ? 'large' : cursorSize === 'large' ? 'xl' : 'normal')} className="text-white hover:text-blue-300 text-sm px-1">
                    Size
                 </button>
                 <button onClick={() => setShowCursorTrail(!showCursorTrail)} className={`text-xs px-2 py-0.5 rounded ml-1 ${showCursorTrail ? 'bg-green-600' : 'bg-gray-600'}`}>
                    Trail
                 </button>
             </div>
         </div>
      </header>

      {/* SUB-HEADER / SUBJECT TABS (Blue Strip) */}
      <div className={`flex justify-between items-center px-1 h-12 shadow-md ${highContrast ? 'bg-gray-900 border-b border-gray-700' : 'bg-[#3C8DBC]'}`}>
        <div className="flex h-full items-end pl-2 gap-1">
            {exam.subjects.map(sub => (
                <button
                    key={sub.id}
                    onClick={() => {
                        setCurrentSubjectId(sub.id);
                        setCurrentQuestionId(sub.sections[0].questions[0].id);
                    }}
                    className={`px-6 py-2 text-sm font-bold rounded-t transition-colors ${
                        currentSubjectId === sub.id 
                        ? (highContrast ? 'bg-black text-yellow-400 border-t border-l border-r border-gray-600' : 'bg-white text-black') 
                        : (highContrast ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-[#1e6b99] text-white hover:bg-[#2879a8]')
                    }`}
                >
                    {sub.name}
                </button>
            ))}
        </div>
        
        {/* RIGHT SIDE OF BLUE STRIP */}
        <div className="flex items-center gap-4 pr-4 h-full">
            {/* Language Selector (Mock) */}
            <div className="hidden md:flex items-center gap-2 text-white text-sm">
                <span>View In:</span>
                <select className="text-black text-xs p-1 rounded">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Gujarati</option>
                </select>
            </div>
            
            {/* Timer */}
            <Timer seconds={timeLeft} />
        </div>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className={`flex flex-1 overflow-hidden ${getCursorClass()}`}>
        
        {/* LEFT: QUESTION AREA */}
        <main className={`flex-1 flex flex-col overflow-hidden relative ${getContentStyle()}`}>
            
            {/* Question Header Bar */}
            <div className={`flex justify-between items-center border-b px-4 py-2 ${highContrast ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                <div className={`font-bold text-lg ${highContrast ? 'text-yellow-400' : 'text-red-600'}`}>
                    {currentQuestion.type === QuestionType.MCQ ? 'Question Type: MCQ' : 'Question Type: Numeric'}
                </div>
                <div className={`text-sm font-bold ${highContrast ? 'text-green-400' : 'text-green-700'}`}>
                    Marks for correct answer: 4 | Negative Marks: 1
                </div>
            </div>

            {/* SCROLLABLE QUESTION CONTENT */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="border-b border-gray-300 pb-6 mb-6">
                    {/* Question Number */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="font-bold whitespace-nowrap pt-1">Question No. {currentQuestion.orderIndex + 1}</div>
                        <div className="flex-1">
                             {/* Question Image/Text */}
                             <MathRenderer text={currentQuestion.text} className={`text-lg leading-loose font-medium ${highContrast ? 'text-gray-100' : 'text-gray-900'}`} />
                        </div>
                        {/* Down Arrow for Scroll (Visual Only) */}
                        <div className="text-blue-500 text-2xl">⬇</div>
                    </div>
                </div>

                {/* OPTIONS / INPUT AREA */}
                <div>
                    {currentQuestion.type === QuestionType.MCQ && currentQuestion.options ? (
                        <div className="space-y-4 max-w-3xl">
                            {currentQuestion.options.map((opt, idx) => (
                                <label 
                                    key={opt.id} 
                                    className={`flex items-start p-3 rounded cursor-pointer transition-colors border
                                        ${highContrast 
                                            ? (responses[currentQuestionId]?.selectedOptionId === opt.id ? 'bg-gray-700 border-yellow-400' : 'border-gray-600 hover:bg-gray-800') 
                                            : (responses[currentQuestionId]?.selectedOptionId === opt.id ? 'bg-blue-50 border-blue-400' : 'border-gray-200 hover:bg-gray-50')
                                        }
                                    `}
                                >
                                    <div className="pt-1">
                                        <input 
                                            type="radio" 
                                            name="mcq-option" 
                                            className="h-5 w-5 accent-blue-600"
                                            checked={responses[currentQuestionId]?.selectedOptionId === opt.id}
                                            onChange={() => handleOptionSelect(opt.id)}
                                        />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <span className="font-bold mr-2 opacity-70">({idx + 1})</span>
                                        <MathRenderer text={opt.text} className="inline-block align-middle" />
                                    </div>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-md">
                            <label className="block text-sm font-bold mb-2">Answer:</label>
                            <input 
                                type="text" 
                                className={`block w-full text-lg border rounded p-3 font-mono tracking-widest
                                    ${highContrast ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}
                                `}
                                placeholder="Enter Value"
                                value={responses[currentQuestionId]?.numericAnswer || ''}
                                onChange={handleManualNumericChange}
                            />
                            
                            {/* VIRTUAL KEYBOARD */}
                            <VirtualKeyboard 
                                onInput={handleNumericInput}
                                onBackspace={handleNumericBackspace}
                                onClear={handleNumericClear}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* BOTTOM FOOTER ACTIONS */}
            <div className={`border-t p-3 flex flex-wrap gap-2 justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 
                 ${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`
            }>
                <div className="flex gap-2">
                    <button 
                        onClick={handleSaveNext} 
                        className="px-6 py-2 bg-[#28a745] hover:bg-[#218838] text-white font-semibold rounded border border-[#1e7e34] shadow-sm transition-colors active:translate-y-0.5"
                    >
                        Save & Next
                    </button>
                    <button 
                        onClick={handleClearResponse}
                        className={`px-4 py-2 border font-semibold rounded shadow-sm transition-colors active:translate-y-0.5
                             ${highContrast ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 text-black hover:bg-gray-50'}
                        `}
                    >
                        Clear
                    </button>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={handleSaveMarkReview}
                        className="px-4 py-2 bg-[#ffc107] hover:bg-[#e0a800] text-black font-semibold rounded border border-[#d39e00] shadow-sm transition-colors text-sm active:translate-y-0.5"
                    >
                        Save & Mark for Review
                    </button>
                    <button 
                        onClick={handleMarkReview}
                        className="px-4 py-2 bg-[#17a2b8] hover:bg-[#138496] text-white font-semibold rounded border border-[#117a8b] shadow-sm transition-colors text-sm active:translate-y-0.5"
                    >
                        Mark for Review & Next
                    </button>
                </div>
            </div>

        </main>

        {/* RIGHT: PALETTE SIDEBAR */}
        <aside className={`w-[320px] flex flex-col border-l z-20 overflow-hidden ${highContrast ? 'bg-gray-900 border-gray-700 text-white' : 'bg-[#E5F6FD] border-gray-300'}`}>
            
            {/* Candidate Details */}
            <div className={`p-2 flex items-center gap-3 border-b ${highContrast ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                <div className="h-16 w-16 bg-gray-200 border border-gray-400 overflow-hidden">
                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <div className="overflow-hidden">
                    <div className="font-bold text-sm truncate">{userName}</div>
                </div>
            </div>

            {/* LEGEND / SUMMARY TABLE */}
            <div className={`p-2 border-b ${highContrast ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs font-medium">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-7 bg-green-500 text-white rounded-sm clip-path-polygon">
                            {summaryStats.answered}
                        </span>
                        <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-7 bg-red-500 text-white rounded-sm">
                            {summaryStats.notAnswered}
                        </span>
                        <span>Not Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-7 bg-gray-100 border border-gray-300 text-black rounded-sm shadow-inner">
                            {summaryStats.notVisited}
                        </span>
                        <span>Not Visited</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="flex items-center justify-center w-8 h-8 bg-purple-700 text-white rounded-full text-[10px]">
                            {summaryStats.marked}
                        </span>
                        <span>Marked for Review</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                         <div className="relative w-8 h-8">
                            <span className="flex items-center justify-center w-full h-full bg-purple-700 text-white rounded-full text-[10px]">
                                {summaryStats.ansMarked}
                            </span>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                         </div>
                        <span>Ans & Marked for Review (Will be considered for evaluation)</span>
                    </div>
                </div>
            </div>

            {/* Palette Header */}
            <div className={`px-3 py-2 text-sm font-bold flex justify-between items-center ${highContrast ? 'bg-gray-700 text-white' : 'bg-[#3C8DBC] text-white'}`}>
                <span>{currentSubject.name}</span>
                <span className="text-xs font-normal">Choose a Question</span>
            </div>
            
            {/* Scrollable Palette */}
            <div className={`flex-1 overflow-y-auto p-1 ${highContrast ? 'bg-gray-900' : 'bg-white'}`}>
                <QuestionPalette 
                    questions={currentSubjectQuestions}
                    currentQuestionId={currentQuestionId}
                    responses={responses}
                    onNavigate={moveToNextQuestion} // Bug fix: usually should be direct nav, but let's allow palette nav
                />
            </div>

            {/* Bottom Submit */}
            <div className={`p-4 border-t ${highContrast ? 'bg-gray-800 border-gray-700' : 'bg-[#E5F6FD] border-gray-300'}`}>
                <button 
                    onClick={() => {
                        const confirmSubmit = window.confirm("Are you sure you want to submit the exam?");
                        if(confirmSubmit) handleSubmit();
                    }}
                    className={`w-full py-2 font-bold rounded shadow-sm transition-colors border
                         ${highContrast 
                             ? 'bg-green-700 hover:bg-green-600 text-white border-green-500' 
                             : 'bg-[#28a745] hover:bg-[#218838] text-white border-[#1e7e34]'}
                    `}
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