import React, { useState, useEffect, useRef } from 'react';
import { parsePdfToExam } from '../services/geminiService';
import { Exam, Question } from '../types';

// Using global PDF.js from CDN script in index.html to avoid worker issues
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

interface Props {
  onExamLoaded: (exam: Exam) => void;
  onCancel: () => void;
}

const AdminUpload: React.FC<Props> = ({ onExamLoaded, onCancel }) => {
  const [step, setStep] = useState<'UPLOAD' | 'EDIT'>('UPLOAD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // PDF State
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [examData, setExamData] = useState<Exam | null>(null);
  
  // Cropper State
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError("Please select a valid PDF file.");
      return;
    }
    
    // Check if PDF.js is loaded
    if (!window.pdfjsLib) {
      setError("PDF Processor library failed to load. Please refresh the page.");
      return;
    }

    setPdfFile(file);
    setLoading(true);
    setError(null);

    try {
      // Load PDF Document for rendering later
      const arrayBuffer = await file.arrayBuffer();
      const loadedPdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfDoc(loadedPdf);

      // Convert to Base64 for AI Extraction
      const base64String = await toBase64(file);
      const extractedExam = await parsePdfToExam(base64String);
      setExamData(extractedExam);
      setStep('EDIT');
    } catch (err: any) {
      setError(err.message || "Failed to parse PDF.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  // --- EXPORT FUNCTIONALITY ---
  const handleExportJson = () => {
    if (!examData) return;
    const jsonString = JSON.stringify(examData, null, 2);
    
    // Create a blob and download
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `exam-data-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("JSON Exported! You can now copy this data into your codebase.");
  };

  // --- PDF RENDERING & CROPPER ---

  useEffect(() => {
    if (step === 'EDIT' && pdfDoc && canvasRef.current) {
      renderPage(currentPage);
    }
  }, [step, pdfDoc, currentPage]);

  const renderPage = async (pageNum: number) => {
    if (!pdfDoc) return;
    const page = await pdfDoc.getPage(pageNum);
    
    const viewport = page.getViewport({ scale: 1.5 }); // Good scale for quality
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context!,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
  };

  const getCanvasCoordinates = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedQuestionId) return;
    setIsDrawing(true);
    const pos = getCanvasCoordinates(e);
    setStartPos(pos);
    setCurrentPos(pos);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    setCurrentPos(getCanvasCoordinates(e));
  };

  const handleMouseUp = async () => {
    if (!isDrawing || !selectedQuestionId || !examData) return;
    setIsDrawing(false);

    // 1. Capture Crop
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = currentPos.x - startPos.x;
    const height = currentPos.y - startPos.y;

    if (Math.abs(width) < 10 || Math.abs(height) < 10) return; // Too small

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = Math.abs(width);
    tempCanvas.height = Math.abs(height);
    const ctx = tempCanvas.getContext('2d');
    
    if (ctx) {
        ctx.drawImage(
            canvas,
            Math.min(startPos.x, currentPos.x),
            Math.min(startPos.y, currentPos.y),
            Math.abs(width),
            Math.abs(height),
            0,
            0,
            Math.abs(width),
            Math.abs(height)
        );

        // 2. Convert to Base64 Data URL (Bypass Supabase Storage RLS)
        // This embeds the image directly in the data structure, avoiding cloud storage permission issues.
        const imageUrl = tempCanvas.toDataURL('image/png');

        // 3. Update Question Data
        const updatedSubjects = examData.subjects.map(sub => ({
            ...sub,
            sections: sub.sections.map(sec => ({
                ...sec,
                questions: sec.questions.map(q => 
                    q.id === selectedQuestionId ? { ...q, image: imageUrl } : q
                )
            }))
        }));
        
        setExamData({ ...examData, subjects: updatedSubjects });
        setSelectedQuestionId(null); // Deselect after upload
    }
  };

  // Overlay for crop selection
  const renderCropOverlay = () => {
    if (!isDrawing) return null;
    const width = currentPos.x - startPos.x;
    const height = currentPos.y - startPos.y;
    return (
        <div 
            style={{
                position: 'absolute',
                left: Math.min(startPos.x, currentPos.x),
                top: Math.min(startPos.y, currentPos.y),
                width: Math.abs(width),
                height: Math.abs(height),
                border: '2px solid red',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                pointerEvents: 'none'
            }}
        />
    );
  };

  if (step === 'UPLOAD') {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Exam PDF</h2>
            <p className="text-gray-600 mb-6 text-sm">
            Select a JEE Main question paper PDF. The system will use Artificial Intelligence to extract questions.
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
  }

  // --- EDIT STEP ---
  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col">
        {/* Toolbar */}
        <div className="h-16 border-b px-4 flex items-center justify-between bg-gray-50 shrink-0">
            <h2 className="font-bold text-lg">Exam Editor</h2>
            <div className="flex gap-4">
                <span className="text-sm text-gray-500 self-center hidden md:block">
                    {selectedQuestionId ? 'Draw a box on the PDF to crop diagram.' : 'Select a question to add diagram.'}
                </span>
                <button 
                    onClick={handleExportJson}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded font-bold hover:bg-blue-50"
                >
                    Export JSON
                </button>
                <button onClick={onCancel} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                <button 
                    onClick={() => examData && onExamLoaded(examData)}
                    className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700"
                >
                    Take Test
                </button>
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Left: Question List */}
            <div className="w-1/3 overflow-y-auto border-r p-4 bg-gray-50">
                {examData?.subjects.map(sub => (
                    <div key={sub.id} className="mb-6">
                        <h3 className="font-bold text-blue-800 mb-2 sticky top-0 bg-gray-50 py-2 border-b">{sub.name}</h3>
                        {sub.sections.map(sec => (
                            <div key={sec.id}>
                                {sec.questions.map(q => (
                                    <div 
                                        key={q.id} 
                                        onClick={() => setSelectedQuestionId(q.id)}
                                        className={`p-3 mb-2 rounded border cursor-pointer transition-all ${
                                            selectedQuestionId === q.id ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300' : 'bg-white border-gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-xs text-gray-500">Q{q.orderIndex + 1} ({q.type})</span>
                                            {q.image && <span className="text-xs text-green-600 font-bold">✓ Has Image</span>}
                                        </div>
                                        <p className="text-sm text-gray-800 line-clamp-3">{q.text}</p>
                                        {selectedQuestionId === q.id && (
                                            <div className="mt-2 text-xs text-blue-600 animate-pulse font-semibold">
                                                &rarr; Draw on PDF to add diagram
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Right: PDF Viewer & Cropper */}
            <div className="flex-1 bg-gray-200 overflow-auto flex flex-col items-center p-8 relative">
                {/* Page Controls */}
                <div className="sticky top-0 z-20 bg-white p-2 rounded shadow mb-4 flex items-center gap-4">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                        className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="font-bold">Page {currentPage} / {pdfDoc?.numPages || '?'}</span>
                    <button 
                        onClick={() => setCurrentPage(p => Math.min(pdfDoc?.numPages || 1, p + 1))}
                        disabled={currentPage >= (pdfDoc?.numPages || 1)}
                        className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                {/* Canvas Wrapper */}
                <div className="relative shadow-lg border border-gray-400 bg-white cursor-crosshair">
                    <canvas 
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp} // Cancel/Finish drag if leaves canvas
                    />
                    {renderCropOverlay()}
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminUpload;