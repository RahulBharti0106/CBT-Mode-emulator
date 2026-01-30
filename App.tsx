import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ExamScreen from './components/ExamScreen';
import ResultScreen from './components/ResultScreen';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import AdminUpload from './components/AdminUpload';
import { ExamState, Exam, QuestionType } from './types';
import { supabase } from './services/supabase';
import { loadExamData } from './data/papers/registry';

type ViewState = 'AUTH' | 'DASHBOARD' | 'LANDING' | 'INSTRUCTIONS' | 'EXAM' | 'RESULT' | 'ADMIN';

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
      if (session) setView('LANDING'); 
      else setView('AUTH');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
         setView(prev => prev === 'AUTH' ? 'LANDING' : prev);
      } else {
         setView('AUTH');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSelectExam = async (examId: string) => {
    try {
      const examData = await loadExamData(examId);
      setActiveExam(examData);
      setView('INSTRUCTIONS');
      setIsChecked(false);
    } catch (error) {
      alert("This exam content is coming soon or failed to load.");
      console.error(error);
    }
  };

  const handleExamUploaded = (exam: Exam) => {
      // When an exam is created/uploaded via Admin tool, we load it directly
      setActiveExam(exam);
      setView('INSTRUCTIONS');
      setIsChecked(false);
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
    const examSnapshot = attempt.exam_snapshot as Exam;
    const responses = attempt.details;
    const state: ExamState = {
        currentSubjectId: examSnapshot.subjects[0].id,
        currentQuestionId: examSnapshot.subjects[0].sections[0].questions[0].id,
        responses: responses,
        timeLeftSeconds: 0,
        subjectTimes: attempt.section_timing || {}, // Retrieve timing
        isSubmitModalOpen: false,
        examStatus: 'SUBMITTED'
    };

    setActiveExam(examSnapshot);
    setResult(state);
    setSaveStatus('success'); 
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
    // 1. Calculate Score
    let correct = 0; let incorrect = 0; let score = 0;
    const qMap = new Map();
    exam.subjects.forEach(s => s.sections.forEach(sec => sec.questions.forEach(q => qMap.set(q.id, q))));

    Object.values(examState.responses).forEach(response => {
        const question = qMap.get(response.questionId);
        if (!question) return;
        let isAnswerCorrect = false; let isAnswered = false;
        if (question.type === QuestionType.MCQ) {
            if (response.selectedOptionId) {
                isAnswered = true;
                const opt = question.options?.find((o: any) => o.id === response.selectedOptionId);
                if (opt?.isCorrect) isAnswerCorrect = true;
            }
        } else {
            if (response.numericAnswer) {
                isAnswered = true;
                if (parseFloat(response.numericAnswer) === question.correctValue) isAnswerCorrect = true;
            }
        }
        if (isAnswered) {
            if (isAnswerCorrect) { correct++; score += 4; } else { incorrect++; score -= 1; }
        }
    });

    try {
        const { error } = await supabase.from('exam_results').insert([
                {
                    user_id: session.user.id,
                    exam_id: exam.id,
                    exam_name: exam.name,
                    score: score,
                    correct_answers: correct,
                    incorrect_answers: incorrect,
                    total_questions: qMap.size,
                    details: examState.responses,
                    section_timing: examState.subjectTimes, // Save timing data
                    exam_snapshot: exam,
                    created_at: new Date().toISOString()
                }
            ]);
        if (error) { console.error('Supabase save error:', error); setSaveStatus('error'); } 
        else { setSaveStatus('success'); }
    } catch (err) { console.error('Save exception:', err); setSaveStatus('error'); } finally { setIsSaving(false); }
  };

  // --- RENDER VIEWS ---

  if (view === 'AUTH') { return <AuthScreen />; }
  
  if (view === 'DASHBOARD' && session) { 
      return (
        <Dashboard 
            user={session.user} 
            onStartExam={() => setView('LANDING')} 
            onViewAnalysis={handleViewAnalysis}
            onAdminUpload={() => setView('ADMIN')}
        />
      ); 
  }
  
  if (view === 'LANDING') { return <LandingPage onSelectExam={handleSelectExam} onBackToDashboard={() => setView('DASHBOARD')} user={session?.user} />; }
  
  if (view === 'RESULT' && activeExam && result) { return <ResultScreen exam={activeExam} result={result} saveStatus={saveStatus} onBack={handleBackToDashboard} />; }

  if (view === 'ADMIN') {
      return <AdminUpload onExamLoaded={handleExamUploaded} onCancel={() => setView('DASHBOARD')} />;
  }

  // --- INSTRUCTIONS VIEW (UPDATED) ---
  if (view === 'INSTRUCTIONS' && activeExam) {
    return (
      <div className="h-screen w-full overflow-hidden flex flex-col bg-white">
         {/* Top Bar NTA Style */}
         <div className="bg-[#3C8DBC] h-12 flex items-center px-4 justify-between text-white shrink-0">
            <div className="font-bold text-lg">General Instructions</div>
            <div className="text-sm">Default Language: English</div>
         </div>
         
         <main className="flex-1 overflow-y-auto p-2 md:p-8 w-full bg-white">
            <h2 className="text-xl font-bold mb-4 text-center underline">Please read the instructions carefully</h2>
            
            <div className="max-w-4xl mx-auto space-y-6 text-sm text-gray-800 leading-relaxed">
               
               <div className="space-y-2">
                   <h3 className="font-bold text-base underline">General Instructions:</h3>
                   <ol className="list-decimal pl-5 space-y-1">
                       <li>Total duration of JEE-Main - {activeExam.durationMinutes} min.</li>
                       <li>The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
                       <li>The Questions Palette displayed on the right side of screen will show the status of each question using one of the following symbols:</li>
                   </ol>
               </div>

               {/* LEGEND TABLE REPLICA */}
               <div className="ml-5 my-4">
                   <table className="border-collapse">
                       <tbody>
                           <tr>
                               <td className="p-2 align-middle"><div className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-sm"></div></td>
                               <td className="p-2 align-middle">You have not visited the question yet.</td>
                           </tr>
                           <tr>
                               <td className="p-2 align-middle"><div className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-sm">2</div></td>
                               <td className="p-2 align-middle">You have not answered the question.</td>
                           </tr>
                           <tr>
                               <td className="p-2 align-middle"><div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-sm">3</div></td>
                               <td className="p-2 align-middle">You have answered the question.</td>
                           </tr>
                           <tr>
                               <td className="p-2 align-middle"><div className="w-8 h-8 bg-purple-700 text-white flex items-center justify-center rounded-full">4</div></td>
                               <td className="p-2 align-middle">You have NOT answered the question, but have marked the question for review.</td>
                           </tr>
                           <tr>
                               <td className="p-2 align-middle">
                                   <div className="relative w-8 h-8">
                                       <div className="w-full h-full bg-purple-700 text-white flex items-center justify-center rounded-full">5</div>
                                       <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                                   </div>
                               </td>
                               <td className="p-2 align-middle">The question(s) "Answered and Marked for Review" will be considered for evaluation.</td>
                           </tr>
                       </tbody>
                   </table>
               </div>

               <div className="space-y-2">
                   <h3 className="font-bold text-base underline">Navigating to a Question:</h3>
                   <ol className="list-decimal pl-5 space-y-1" start={4}>
                       <li>To answer a question, do the following:
                           <ol className="list-[lower-alpha] pl-5 mt-1 space-y-1">
                               <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
                               <li>Click on <strong>Save & Next</strong> to save your answer for the current question and then go to the next question.</li>
                               <li>Click on <strong>Mark for Review & Next</strong> to save your answer for the current question, mark it for review, and then go to the next question.</li>
                           </ol>
                       </li>
                   </ol>
               </div>
               
               <div className="p-4 bg-yellow-50 text-red-600 font-bold border border-yellow-200 mt-6">
                   Please note all questions will appear in your default language. This language can be changed for a particular question later on.
               </div>

            </div>
         </main>

         {/* FOOTER CONFIRMATION */}
         <footer className="shrink-0 border-t border-gray-300 p-2 bg-white">
             <div className="max-w-6xl mx-auto">
                <div className="flex items-start gap-3 mb-4">
                    <input 
                    type="checkbox" 
                    id="confirm" 
                    className="mt-1 h-5 w-5 text-blue-600 cursor-pointer" 
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label htmlFor="confirm" className="text-sm text-gray-800 cursor-pointer font-medium select-none">
                    I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. /any prohibited material with me into the Examination Hall. I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include ban from future Tests / Examinations.
                    </label>
                </div>
                
                <div className="flex justify-center">
                    <button 
                        onClick={() => setView('EXAM')}
                        disabled={!isChecked}
                        className={`
                        w-1/2 py-3 font-bold text-white shadow transition-all border
                        ${isChecked 
                            ? 'bg-[#28a745] hover:bg-[#218838] border-[#1e7e34] cursor-pointer' 
                            : 'bg-gray-300 border-gray-400 cursor-not-allowed'}
                        `}
                    >
                        PROCEED
                    </button>
                </div>
             </div>
         </footer>
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