import { Exam, QuestionType, Subject, Section, Question } from "../types";
// @ts-ignore
import { v4 as uuidv4 } from 'https://esm.sh/uuid@^13.0.0';
import { GoogleGenAI } from "@google/genai";

// Use Gemini 3 Pro Preview for both digitization and tutoring for best results
const MODEL_NAME = "gemini-3-pro-preview";

/**
 * FEATURE 1: DIGITIZE EXAM
 * Parses a PDF Base64 string into a structured Exam object
 */
export async function parsePdfToExam(base64Pdf: string): Promise<Exam> {
  // Guidelines: API Key from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert exam digitizer for JEE Main. 
    Analyze the attached PDF question paper.
    Extract ALL questions from it into a valid JSON array.
    
    CRITICAL RULES:
    1. **Math formatting**: ALL mathematical expressions MUST be converted to LaTeX enclosed in single dollar signs ($...$). Do not use plain text for math.
    2. **Subjects**: Categorize into Physics, Chemistry, Mathematics.
    3. **Sections**: Identify Section A (MCQs) and Section B (Numeric Value Questions).
    4. **Text**: Extract the question text exactly.
    5. **Options**: For MCQs, extract all 4 options. Mark the correct one if indicated in the PDF.
    6. **Accuracy**: Do not hallucinate questions. If a question is unreadable, skip it.
    
    JSON STRUCTURE:
    [
      {
        "subject": "Physics",
        "sectionType": "A", 
        "questionText": "What is $E=mc^2$?",
        "options": ["Opt1", "Opt2", "Opt3", "Opt4"],
        "correctAnswer": "Opt1",
        "solutionText": "Explanation here"
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'application/pdf',
              data: base64Pdf
            }
          }
        ]
      },
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    const rawQuestions = JSON.parse(text);
    
    // Handle if the AI wrapped it in a key like { "questions": [...] }
    const questionsArray = Array.isArray(rawQuestions) ? rawQuestions : (rawQuestions.questions || rawQuestions.data || []);
    
    return convertToExamStructure(questionsArray);

  } catch (error) {
    console.error("AI Extraction Error:", error);
    throw new Error("Failed to extract questions. Please check your API Key.");
  }
}

/**
 * FEATURE 2: AI TUTOR
 * Explains a specific question
 */
export async function explainQuestionWithAI(question: Question, userAnswer: string | undefined): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are a friendly and expert JEE Main tutor (Physics, Chemistry, Math).
    
    QUESTION:
    ${question.text}
    
    OPTIONS (if applicable):
    ${question.options?.map((o, i) => `${i+1}. ${o.text}`).join('\n') || 'Numeric Question'}
    
    CORRECT ANSWER: ${question.type === QuestionType.MCQ ? 'See logic' : question.correctValue}
    STUDENT'S ANSWER: ${userAnswer || "Not Attempted"}
    
    Task:
    1. Explain the concept behind this question briefly.
    2. Show the step-by-step solution using LaTeX for math ($...$).
    3. If the student was wrong, explain why their likely approach might have been incorrect.
    4. Keep it concise (under 200 words).
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 2048 }
      }
    });
    return response.text || "No explanation generated.";
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn't connect to the AI Tutor right now. Please check your internet connection.";
  }
}

// --- HELPER: DATA TRANSFORMATION ---

function convertToExamStructure(rawQuestions: any[]): Exam {
  const subjectsMap: Record<string, Subject> = {
    'Physics': { id: 'sub-phy', name: 'Physics', sections: [] },
    'Chemistry': { id: 'sub-chem', name: 'Chemistry', sections: [] },
    'Mathematics': { id: 'sub-math', name: 'Mathematics', sections: [] }
  };

  const getSection = (subjectName: string, sectionType: string): Section => {
    let subKey = 'Physics';
    if (subjectName?.toLowerCase().includes('chem')) subKey = 'Chemistry';
    if (subjectName?.toLowerCase().includes('math')) subKey = 'Mathematics';

    const subject = subjectsMap[subKey];
    const isSecA = sectionType?.toUpperCase().includes('A') || sectionType?.toUpperCase().includes('MCQ');
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
    if (!rawQ.subject || !rawQ.questionText) return;

    const section = getSection(rawQ.subject, rawQ.sectionType || 'A');
    
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
        // Heuristic: check if correct answer string is inside option string
        isCorrect: rawQ.correctAnswer && (optText.includes(rawQ.correctAnswer) || rawQ.correctAnswer === optText)
      })) : undefined
    };

    section.questions.push(question);
  });

  const sortedSubjects = [subjectsMap['Physics'], subjectsMap['Chemistry'], subjectsMap['Mathematics']];
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