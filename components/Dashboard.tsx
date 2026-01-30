import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Exam } from '../types';

interface DashboardProps {
  onStartExam: () => void;
  onViewAnalysis: (attempt: any) => void;
  onAdminUpload: () => void;
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartExam, onViewAnalysis, onAdminUpload, user }) => {
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttempts(data || []);
    } catch (err) {
      console.error('Error fetching attempts:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-gray-900">{user.user_metadata?.full_name || user.email}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <div className="h-10 w-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                    {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-gray-500 text-sm font-bold uppercase">Tests Attempted</div>
                <div className="text-3xl font-extrabold text-blue-600 mt-2">{attempts.length}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-gray-500 text-sm font-bold uppercase">Average Score</div>
                <div className="text-3xl font-extrabold text-gray-800 mt-2">
                    {attempts.length > 0 
                        ? Math.round(attempts.reduce((acc, cur) => acc + cur.score, 0) / attempts.length) 
                        : 0}
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-3 justify-center">
                <button 
                    onClick={onStartExam}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                >
                    <span>Take New Test</span>
                    <span className="text-xl">→</span>
                </button>
                <button 
                    onClick={onAdminUpload}
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg border border-gray-300 transition-colors text-sm"
                >
                    Digitize New Exam (Admin)
                </button>
            </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-gray-800">Exam History</h2>
                <button onClick={fetchAttempts} className="text-blue-600 text-sm font-medium hover:underline">Refresh</button>
            </div>
            
            {loading ? (
                <div className="p-8 text-center text-gray-500">Loading your history...</div>
            ) : attempts.length === 0 ? (
                <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>You haven't attempted any exams yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Exam Name</th>
                                <th className="px-6 py-3 text-center">Score</th>
                                <th className="px-6 py-3 text-center">Correct/Incorrect</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {attempts.map((attempt) => (
                                <tr key={attempt.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(attempt.created_at)}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{attempt.exam_name}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-block px-3 py-1 rounded-full font-bold ${
                                            attempt.score > 100 ? 'bg-green-100 text-green-800' : 'bg-blue-50 text-blue-800'
                                        }`}>
                                            {attempt.score}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-green-600 font-bold">{attempt.correct_answers}</span>
                                        <span className="mx-1">/</span>
                                        <span className="text-red-600 font-bold">{attempt.incorrect_answers}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => onViewAnalysis(attempt)}
                                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                        >
                                            View Scorecard
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;