import React, { useState } from 'react';
import ExamScreen from './components/ExamScreen';
import AdminUpload from './components/AdminUpload';
import { MOCK_EXAM } from './services/mockData';
import { ExamState, Exam } from './types';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [result, setResult] = useState<ExamState | null>(null);
  
  // State to manage the active exam (default mock or uploaded)
  const [activeExam, setActiveExam] = useState<Exam>(MOCK_EXAM);
  const [showUpload, setShowUpload] = useState(false);

  const handleExamLoaded = (newExam: Exam) => {
    setActiveExam(newExam);
    setShowUpload(false);
    alert(`Successfully loaded ${newExam.subjects.flatMap(s => s.sections.flatMap(sec => sec.questions)).length} questions from PDF.`);
  };

  if (result) {
    const attempted = Object.values(result.responses).filter(r => r.status === 'ANSWERED' || r.status === 'ANSWERED_MARKED_FOR_REVIEW').length;
    
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Exam Submitted</h1>
          <div className="mb-6 text-gray-600">
            Thank you for taking the JEE (Main) mock test.
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
             <div className="bg-gray-100 p-3 rounded">
                <div className="text-xs text-gray-500">Status</div>
                <div className="font-bold text-green-600">Submitted</div>
             </div>
             <div className="bg-gray-100 p-3 rounded">
                <div className="text-xs text-gray-500">Attempted</div>
                <div className="font-bold">{attempted}</div>
             </div>
          </div>

          <p className="text-sm text-gray-500 italic mb-6">
            Detailed solutions and score analysis would be displayed here by fetching from Supabase 'responses' table.
          </p>

          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-white flex flex-col relative">
         {showUpload && (
           <AdminUpload 
             onExamLoaded={handleExamLoaded} 
             onCancel={() => setShowUpload(false)} 
           />
         )}

         <header className="bg-blue-900 text-white p-4">
            <h1 className="text-xl font-bold">NTA Mock Test Simulator</h1>
         </header>
         <main className="flex-1 max-w-4xl mx-auto p-8 w-full">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Instructions</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 rounded text-sm text-yellow-800">
               <strong>Current Exam:</strong> {activeExam.name} <br/>
               Questions: {activeExam.subjects.reduce((acc, s) => acc + s.sections.reduce((a, sec) => a + sec.questions.length, 0), 0)} loaded.
            </div>

            <div className="prose prose-sm text-gray-700 mb-8 max-h-[60vh] overflow-y-auto border p-4 rounded bg-gray-50">
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

            <div className="flex items-center gap-2 mb-6">
                <input type="checkbox" id="confirm" className="h-5 w-5 text-blue-600" />
                <label htmlFor="confirm" className="text-sm text-gray-700">I have read and understood the instructions. I agree that I am not carrying any prohibited material.</label>
            </div>

            <div className="flex justify-between items-center">
                <button 
                    onClick={() => setShowUpload(true)}
                    className="text-gray-500 hover:text-blue-600 text-sm font-medium underline"
                >
                    Admin: Upload Question Paper (PDF)
                </button>

                <button 
                    onClick={() => setHasStarted(true)}
                    className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 shadow-lg w-full md:w-auto"
                >
                    I am ready to begin
                </button>
            </div>
         </main>
      </div>
    );
  }

  return <ExamScreen key={activeExam.id} exam={activeExam} onFinish={(state) => setResult(state)} />;
}

export default App;