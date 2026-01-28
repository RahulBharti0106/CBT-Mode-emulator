import React, { useState, useMemo } from 'react';
import { supabase } from '../services/supabase';
import { EXAM_REGISTRY } from '../services/mockData';
import { ExamMetadata, ExamType } from '../types';

interface Props {
  onSelectExam: (examId: string) => void;
  onBackToDashboard: () => void;
  user?: any;
}

const LandingPage: React.FC<Props> = ({ onSelectExam, onBackToDashboard, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ExamType | 'ALL'>('ALL');
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');

  const filteredExams = useMemo(() => {
    return EXAM_REGISTRY.filter(exam => {
      const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'ALL' || exam.type === selectedType;
      const matchesYear = selectedYear === 'ALL' || exam.year === selectedYear;
      return matchesSearch && matchesType && matchesYear;
    });
  }, [searchTerm, selectedType, selectedYear]);

  // Unique years for filter
  const years = Array.from(new Set(EXAM_REGISTRY.map(e => e.year))).sort((a, b) => b - a);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBackToDashboard}>
              <span className="text-2xl font-bold tracking-tight">NTA Simulator</span>
              <span className="bg-blue-800 text-xs px-2 py-1 rounded text-blue-200 border border-blue-700">Beta</span>
            </div>
            <div className="flex items-center space-x-6 text-sm font-medium">
              <button onClick={onBackToDashboard} className="hover:text-blue-300 transition">Dashboard</button>
              <a href="#about" className="hidden md:block hover:text-blue-300 transition">About</a>
              {user && (
                  <div className="flex items-center gap-4 border-l border-blue-700 pl-4">
                      <span className="text-blue-200 hidden md:block">Hi, {user.user_metadata?.full_name?.split(' ')[0] || 'Student'}</span>
                      <button onClick={handleSignOut} className="bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded text-xs">Sign Out</button>
                  </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-800 to-blue-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Master Your Entrance Exams</h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          Experience the real NTA computer-based test environment. Practice with past year papers for JEE, NEET, and CUET.
        </p>
      </div>

      {/* Main Content */}
      <main id="exams" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search */}
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text"
                placeholder="Search exams (e.g., JEE 2025)..."
                className="pl-10 block w-full rounded-lg border-gray-300 border py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <select 
              className="block w-full rounded-lg border-gray-300 border py-2 px-3 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
            >
              <option value="ALL">All Exam Types</option>
              <option value="JEE">JEE (Main)</option>
              <option value="NEET">NEET (UG)</option>
              <option value="CUET">CUET (UG)</option>
            </select>

            {/* Year Filter */}
            <select 
              className="block w-full rounded-lg border-gray-300 border py-2 px-3 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'ALL' ? 'ALL' : parseInt(e.target.value))}
            >
              <option value="ALL">All Years</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.length > 0 ? (
            filteredExams.map(exam => (
              <div key={exam.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col overflow-hidden">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wide
                      ${exam.type === 'JEE' ? 'bg-red-100 text-red-800' : 
                        exam.type === 'NEET' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                      {exam.type}
                    </span>
                    {exam.status === 'AVAILABLE' ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Available
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{exam.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                       <span>📅 {exam.date}, {exam.year}</span>
                    </div>
                    {exam.shift && (
                      <div className="flex items-center gap-2">
                         <span>⏰ {exam.shift}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {exam.description || 'Standard mock test pattern.'}
                  </p>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <button 
                    onClick={() => onSelectExam(exam.id)}
                    disabled={exam.status !== 'AVAILABLE'}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm shadow-sm transition-all flex justify-center items-center gap-2
                      ${exam.status === 'AVAILABLE' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    {exam.status === 'AVAILABLE' ? 'Start Test' : 'Not Available'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No exams found matching your criteria.
            </div>
          )}
        </div>

      </main>

      {/* Footer Info Sections (Commented out for easy customization later) */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          
          <div id="about">
             <h4 className="font-bold text-gray-900 mb-3">About Us</h4>
             <p className="text-gray-500">
               The most precise NTA exam simulator available for free. Built to help students achieve their dreams by providing a realistic testing environment.
             </p>
          </div>

          <div id="policies">
             <h4 className="font-bold text-gray-900 mb-3">Policies</h4>
             <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
                <li><a href="#" className="hover:underline">Data Usage</a></li>
             </ul>
          </div>

          <div id="terms">
             <h4 className="font-bold text-gray-900 mb-3">Terms & Conditions</h4>
             <p className="text-gray-500">
                By using this platform, you agree to our terms of service. This is a simulation tool for educational purposes.
             </p>
          </div>

        </div>
        <div className="bg-gray-50 py-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} NTA Mock Simulator. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
