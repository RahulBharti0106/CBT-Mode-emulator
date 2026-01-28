import React, { useState } from 'react';
import { parsePdfToExam } from '../services/geminiService';
import { Exam } from '../types';

interface Props {
  onExamLoaded: (exam: Exam) => void;
  onCancel: () => void;
}

const AdminUpload: React.FC<Props> = ({ onExamLoaded, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError("Please select a valid PDF file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = (reader.result as string).split(',')[1];
        try {
          const exam = await parsePdfToExam(base64String);
          onExamLoaded(exam);
        } catch (err: any) {
          setError(err.message || "Failed to parse PDF.");
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setError("Error reading file.");
        setLoading(false);
      };
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Exam PDF</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Select a JEE Main question paper PDF. The system will use AI to extract questions, options, and sections automatically.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 animate-pulse">Analyzing PDF and extracting questions...</p>
            <p className="text-xs text-gray-400 mt-2">This may take up to 30-60 seconds.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block">
              <span className="sr-only">Choose PDF</span>
              <input 
                type="file" 
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                "
              />
            </label>
            
            <div className="flex justify-end pt-4 border-t mt-4">
              <button 
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUpload;