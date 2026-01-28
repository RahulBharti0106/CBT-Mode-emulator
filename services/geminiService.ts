import { GoogleGenAI, Type } from "@google/genai";
import { Exam, QuestionType, Subject, Section, Question } from "../types";
import { v4 as uuidv4 } from 'uuid';

// We use the 2.5 flash model for efficient multimodal document parsing
const MODEL_NAME = "gemini-2.5-flash-latest";

// Helper to safely get environment variables
const getEnv = (key: string) => {
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    return import.meta.env[key] || import.meta.env[`VITE_${key}`];
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return '';
};

export async function parsePdfToExam(base64Pdf: string): Promise<Exam> {
  const apiKey = getEnv('API_KEY');
  
  if (!apiKey) {
    throw new Error("API_KEY is missing in environment variables.");
  }

  // 1. Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: apiKey });

  // 2. Define Schema for strict JSON output
  // We ask for a flat list of questions with metadata, then restructure in code to match Exam interface
  // This is often more reliable than asking for deeply nested huge objects
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        subject: { type: Type.STRING, description: "Physics, Chemistry, or Mathematics" },
        sectionType: { type: Type.STRING, description: "A (MCQ) or B (Numeric)" },
        questionText: { type: Type.STRING, description: "The full question text. Keep LaTeX math expressions in $...$ format." },
        options: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "List of 4 options for MCQs. Empty for Numeric."
        },
        correctAnswer: { type: Type.STRING, description: "The correct option text or numeric value if available in the PDF." },
        solutionText: { type: Type.STRING, description: "Detailed solution if available." }
      },
      required: ["subject", "sectionType", "questionText"]
    }
  };

  // 3. Construct Prompt
  const prompt = `
    You are an expert exam digitizer for JEE Main. 
    Analyze the attached PDF question paper.
    Extract ALL questions from it.
    
    CRITICAL RULES:
    1. **Math formatting**: ALL mathematical expressions MUST be converted to LaTeX enclosed in single dollar signs ($...$). Do not use plain text for math.
    2. **Subjects**: Categorize into Physics, Chemistry, Mathematics.
    3. **Sections**: Identify Section A (MCQs) and Section B (Numeric Value Questions).
    4. **Text**: Extract the question text exactly.
    5. **Options**: For MCQs, extract all 4 options.
    6. **Accuracy**: Do not halluncinate questions. If a question is unreadable, skip it.
  `;

  // 4. Call API
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { mimeType: "application/pdf", data: base64Pdf } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const rawQuestions = JSON.parse(response.text || "[]");
    return convertToExamStructure(rawQuestions);

  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    throw new Error("Failed to extract questions from PDF. Please ensure the PDF is clear and contains a valid JEE paper.");
  }
}

// Helper to convert flat JSON from AI to our strict structured Exam type
function convertToExamStructure(rawQuestions: any[]): Exam {
  const subjectsMap: Record<string, Subject> = {
    'Physics': { id: 'sub-phy', name: 'Physics', sections: [] },
    'Chemistry': { id: 'sub-chem', name: 'Chemistry', sections: [] },
    'Mathematics': { id: 'sub-math', name: 'Mathematics', sections: [] }
  };

  // Helper to get or create section
  const getSection = (subjectName: string, sectionType: string): Section => {
    // Normalize Subject Name
    let subKey = 'Physics';
    if (subjectName.toLowerCase().includes('chem')) subKey = 'Chemistry';
    if (subjectName.toLowerCase().includes('math')) subKey = 'Mathematics';

    const subject = subjectsMap[subKey];
    
    // Normalize Section Name
    const isSecA = sectionType.toUpperCase().includes('A') || sectionType.toUpperCase().includes('MCQ');
    const secId = isSecA ? `sec-${subKey.toLowerCase()}-a` : `sec-${subKey.toLowerCase()}-b`;
    
    let section = subject.sections.find(s => s.id === secId);
    if (!section) {
      section = {
        id: secId,
        name: isSecA ? 'Section A' : 'Section B',
        type: isSecA ? QuestionType.MCQ : QuestionType.NUMERIC,
        subjectId: subject.id,
        questions: []
      };
      subject.sections.push(section);
    }
    return section;
  };

  rawQuestions.forEach((rawQ: any, index: number) => {
    const section = getSection(rawQ.subject, rawQ.sectionType);
    
    const question: Question = {
      id: `q-${index}-${uuidv4()}`,
      text: rawQ.questionText,
      type: section.type,
      sectionId: section.id,
      subjectId: section.subjectId,
      orderIndex: section.questions.length,
      correctValue: section.type === QuestionType.NUMERIC ? parseFloat(rawQ.correctAnswer) : undefined,
      options: section.type === QuestionType.MCQ ? rawQ.options?.map((optText: string, idx: number) => ({
        id: `opt-${index}-${idx}`,
        text: optText,
        isCorrect: rawQ.correctAnswer && optText.includes(rawQ.correctAnswer) // Simple check, might need manual correction
      })) : undefined
    };

    section.questions.push(question);
  });

  // Ensure strict order of subjects
  const sortedSubjects = [subjectsMap['Physics'], subjectsMap['Chemistry'], subjectsMap['Mathematics']];

  // Ensure strict order of sections (A then B)
  sortedSubjects.forEach(sub => {
    sub.sections.sort((a, b) => a.name.localeCompare(b.name));
  });

  return {
    id: `exam-${Date.now()}`,
    name: 'Imported JEE (Main) Exam',
    durationMinutes: 180,
    subjects: sortedSubjects
  };
}
