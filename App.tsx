import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ExamScreen from './components/ExamScreen';
import ResultScreen from './components/ResultScreen';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import { MOCK_EXAM } from './services/mockData';
import { ExamState, Exam, QuestionType } from './types';
import { supabase } from './services/supabase';

type ViewState = 'AUTH' | 'DASHBOARD' | 'LANDING' | 'INSTRUCTIONS' | 'EXAM' | 'RESULT';

function App() {
  const [session, setSession] = useState<any>(null);
  const [view, setView] = useState<ViewState>('AUTH');
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  
  const [isChecked, setIsChecked] = useState(false);
  const [result, setResult] = useState<ExamState | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setView('LANDING'); // Changed from DASHBOARD to LANDING
      else setView('AUTH');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
         // If coming from login, go to LANDING. But if already in exam/result, stay there.
         setView(prev => prev === 'AUTH' ? 'LANDING' : prev); // Changed from DASHBOARD to LANDING
      } else {
         setView('AUTH');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSelectExam = (examId: string) => {
    if (examId === 'jee-main-2025-jan-22-s1') {
      setActiveExam(MOCK_EXAM);
      setView('INSTRUCTIONS');
      setIsChecked(false); 
    } else {
      alert("This exam content is not yet loaded.");
    }
  };

  const handleFinishExam = (state: ExamState) => {
    setResult(state);
    setView('RESULT');
  };

  const handleBackToDashboard = () => {
    setResult(null);
    setActiveExam(null);
    setSaveStatus('idle');
    setView('DASHBOARD');
  };

  const handleViewAnalysis = (attempt: any) => {
    // Reconstruct ExamState and Exam from the DB record
    // 1. Get Exam Data (Snapshot)
    const examSnapshot = attempt.exam_snapshot as Exam;
    
    // 2. Get Responses
    const responses = attempt.details;

    // 3. Construct ExamState
    const state: ExamState = {
        currentSubjectId: examSnapshot.subjects[0].id,
        currentQuestionId: examSnapshot.subjects[0].sections[0].questions[0].id,
        responses: responses,
        timeLeftSeconds: 0,
        isSubmitModalOpen: false,
        examStatus: 'SUBMITTED'
    };

    setActiveExam(examSnapshot);
    setResult(state);
    setSaveStatus('success'); // It's already saved
    setView('RESULT');
  };

  // Logic to save results to Supabase when exam is finished
  useEffect(() => {
    if (view === 'RESULT' && result && result.examStatus === 'SUBMITTED' && saveStatus === 'idle' && activeExam && session) {
      calculateAndSave(result, activeExam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, result, session]);

  const calculateAndSave = async (examState: ExamState, exam: Exam) => {
    if (!session?.user) return;

    setIsSaving(true);
    
    // 1. Calculate Score for DB
    let correct = 0;
    let incorrect = 0;
    let score = 0;
    
    // Create a map for fast question lookup
    const qMap = new Map();
    exam.subjects.forEach(s => s.sections.forEach(sec => sec.questions.forEach(q => qMap.set(q.id, q))));

    Object.values(examState.responses).forEach(response => {
        const question = qMap.get(response.questionId);
        if (!question) return;

        let isAnswerCorrect = false;
        let isAnswered = false;

        if (question.type === QuestionType.MCQ) {
            if (response.selectedOptionId) {
                isAnswered = true;
                const opt = question.options?.find((o: any) => o.id === response.selectedOptionId);
                if (opt?.isCorrect) isAnswerCorrect = true;
            }
        } else {
            // Numeric
            if (response.numericAnswer) {
                isAnswered = true;
                if (parseFloat(response.numericAnswer) === question.correctValue) isAnswerCorrect = true;
            }
        }

        if (isAnswered) {
            if (isAnswerCorrect) {
                correct++;
                score += 4;
            } else {
                incorrect++;
                score -= 1;
            }
        }
    });

    // 2. Save to Supabase
    try {
        const { error } = await supabase
            .from('exam_results')
            .insert([
                {
                    user_id: session.user.id,
                    exam_id: exam.id,
                    exam_name: exam.name,
                    score: score,
                    correct_answers: correct,
                    incorrect_answers: incorrect,
                    total_questions: qMap.size,
                    details: examState.responses,
                    exam_snapshot: exam, // CRITICAL: Save full exam structure so we can render scorecard later even if files change
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('Supabase save error:', error);
            setSaveStatus('error');
        } else {
            setSaveStatus('success');
        }
    } catch (err) {
        console.error('Save exception:', err);
        setSaveStatus('error');
    } finally {
        setIsSaving(false);
    }
  };

  // --- RENDER VIEWS ---

  if (view === 'AUTH') {
      return <AuthScreen />;
  }

  if (view === 'DASHBOARD' && session) {
      return (
        <Dashboard 
            user={session.user} 
            onStartExam={() => setView('LANDING')} 
            onViewAnalysis={handleViewAnalysis}
        />
      );
  }

  if (view === 'LANDING') {
    return (
        <LandingPage 
            onSelectExam={handleSelectExam} 
            onBackToDashboard={() => setView('DASHBOARD')}
            user={session?.user}
        />
    );
  }

  if (view === 'RESULT' && activeExam && result) {
    return (
      <ResultScreen 
        exam={activeExam}
        result={result}
        saveStatus={saveStatus}
        onBack={handleBackToDashboard}
      />
    );
  }

  // INSTRUCTIONS VIEW
  if (view === 'INSTRUCTIONS' && activeExam) {
    return (
      <div className="h-screen w-full overflow-y-auto bg-white flex flex-col relative">
         <header className="bg-blue-900 text-white p-4 sticky top-0 z-10 shadow-md flex justify-between items-center">
            <h1 className="text-xl font-bold">NTA Mock Test Simulator</h1>
            <button 
              onClick={handleBackToDashboard}
              className="text-xs bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded"
            >
              Cancel
            </button>
         </header>
         
         <main className="flex-1 max-w-4xl mx-auto p-8 w-full">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Instructions</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 rounded text-sm text-yellow-800">
               <strong>Current Exam:</strong> {activeExam.name} <br/>
               Questions: {activeExam.subjects.reduce((acc, s) => acc + s.sections.reduce((a, sec) => a + sec.questions.length, 0), 0)} loaded.
            </div>

            <div className="prose prose-sm text-gray-700 mb-8 border p-4 rounded bg-gray-50">
               <p className="font-bold">Please read the instructions carefully</p>
               <ul className="list-disc pl-5 space-y-2">
                 <li>Total duration of this test is <strong>{activeExam.durationMinutes} minutes</strong>.</li>
                 <li>The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination.</li>
                 <li>The question palette displayed on the right side of screen will show the status of each question using one of the following symbols:
                    <ul className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        <li className="flex items-center gap-2"><span className="w-4 h-4 bg-white border"></span> Not Visited</li>
                        <li className="flex items-center gap-2"><span className="w-4 h-4 bg-red-500 text-white"></span> Not Answered</li>
                        <li className="flex items-center gap-2"><span className="w-4 h-4 bg-green-500 text-white"></span> Answered</li>
                        <li className="flex items-center gap-2"><span className="w-4 h-4 bg-purple-600 text-white rounded-full"></span> Marked for Review</li>
                    </ul>
                 </li>
                 <li>Marking Scheme:
                    <ul className="list-disc pl-5">
                       <li>Correct Answer: <strong>+4</strong></li>
                       <li>Incorrect Answer: <strong>-1</strong></li>
                       <li>Unanswered / Marked for Review: <strong>0</strong></li>
                    </ul>
                 </li>
                 <li>Section A contains MCQs. Section B contains Numeric Value Questions.</li>
               </ul>
            </div>

            <div className="flex items-start gap-3 mb-8 p-4 bg-blue-50 rounded border border-blue-100">
                <input 
                  type="checkbox" 
                  id="confirm" 
                  className="mt-1 h-5 w-5 text-blue-600 cursor-pointer" 
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="confirm" className="text-sm text-gray-800 cursor-pointer font-medium select-none">
                  I have read and understood the instructions. I agree that I am not carrying any prohibited material like mobile phones, bluetooth devices, or notes.
                </label>
            </div>

            <div className="flex justify-end items-center pb-8">
                <button 
                    onClick={() => setView('EXAM')}
                    disabled={!isChecked}
                    className={`
                      px-8 py-3 rounded font-bold shadow-lg w-full md:w-auto transition-all
                      ${isChecked 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                    `}
                >
                    I am ready to begin
                </button>
            </div>
         </main>
      </div>
    );
  }

  if (view === 'EXAM' && activeExam) {
    return (
        <ExamScreen 
            key={activeExam.id} 
            exam={activeExam} 
            onFinish={handleFinishExam}
            userName={session?.user?.user_metadata?.full_name || "Student"} 
        />
    );
  }

  // Fallback
  return null;
}

export default App;