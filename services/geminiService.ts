import { Exam, QuestionType, Subject, Section, Question } from "../types";
// @ts-ignore
import { v4 as uuidv4 } from 'https://esm.sh/uuid@^13.0.0';

// OpenRouter Configuration
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// --- FREE MODEL CONFIGURATION ---
// We use Gemini 2.0 Flash Lite (Free) for PDF processing as it supports Vision and has a large context
const DIGITIZATION_MODEL = "google/gemini-2.0-flash-lite-preview-02-05:free"; 
// We use Gemini 2.0 Flash Thinking (Free) for tutoring as it has excellent reasoning capabilities
const TUTOR_MODEL = "google/gemini-2.0-flash-thinking-exp:free";

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

/**
 * Calls OpenRouter API
 */
async function callOpenRouter(messages: any[], model: string, response_format?: any) {
  const apiKey = getEnv('OPENROUTER_API_KEY');
  
  if (!apiKey || apiKey.includes('your_openrouter_key_here')) {
    throw new Error("Missing VITE_OPENROUTER_API_KEY in .env file. Please add your OpenRouter key.");
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin, // Required by OpenRouter
      "X-Title": "JEE CBT Simulator",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      response_format: response_format,
      temperature: 0.1 // Low temperature for factual extraction
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter API Error: ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * FEATURE 1: DIGITIZE EXAM
 * Parses a PDF Base64 string into a structured Exam object
 */
export async function parsePdfToExam(base64Pdf: string): Promise<Exam> {
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
    const content = await callOpenRouter(
      [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                // OpenRouter supports passing base64 directly for Gemini models
                url: `data:application/pdf;base64,${base64Pdf}` 
              }
            }
          ]
        }
      ],
      DIGITIZATION_MODEL,
      { type: "json_object" } 
    );

    // Clean up potential markdown code blocks in response
    const cleanedText = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const rawQuestions = JSON.parse(cleanedText);
    
    // Handle if the AI wrapped it in a key like { "questions": [...] }
    const questionsArray = Array.isArray(rawQuestions) ? rawQuestions : (rawQuestions.questions || rawQuestions.data || []);
    
    return convertToExamStructure(questionsArray);

  } catch (error) {
    console.error("AI Extraction Error:", error);
    throw new Error("Failed to extract questions. Ensure your OpenRouter key is valid.");
  }
}

/**
 * FEATURE 2: AI TUTOR
 * Explains a specific question
 */
export async function explainQuestionWithAI(question: Question, userAnswer: string | undefined): Promise<string> {
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
    return await callOpenRouter(
      [{ role: "user", content: prompt }],
      TUTOR_MODEL
    );
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn't connect to the AI Tutor right now. Please check your internet connection or API Key.";
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