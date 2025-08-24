import { GoogleGenAI } from "@google/genai";
import { Question, TestResult, UserAnswer } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseJsonResponse = <T,>(jsonString: string): T | null => {
    let cleanJsonString = jsonString.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = cleanJsonString.match(fenceRegex);
    if (match && match[2]) {
        cleanJsonString = match[2].trim();
    }

    try {
        return JSON.parse(cleanJsonString) as T;
    } catch (error) {
        console.error("Failed to parse JSON response:", error);
        console.error("Original string:", jsonString);
        return null;
    }
};

export const generateIQTest = async (ageGroup: string): Promise<Question[]> => {
    const prompt = `أنت خبير في علم النفس القياسي. قم بإنشاء اختبار ذكاء من 30 سؤال مناسبة للفئة العمرية '${ageGroup}'. يجب أن تغطي الأسئلة مجالات متنوعة مثل المنطق اللفظي، والتفكير المكاني، والأنماط العددية.
أرجع الإجابة فقط كمصفوفة JSON صالحة (JSON array). يجب أن يكون الجذر عبارة عن مصفوفة.
يجب أن تحتوي المصفوفة على 30 كائن أسئلة. كل كائن سؤال يجب أن يتبع بدقة الصيغة التالية:
{ "id": number, "questionText": "string", "options": ["string", "string", "string", "string"], "correctAnswerIndex": number }
لا تقم بتضمين المصفوفة داخل كائن آخر. الإجابة يجب أن تكون مصفوفة JSON فقط.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const parsedObject = parseJsonResponse<any>(response.text);
        let questions: Question[] | null = null;
        
        if (Array.isArray(parsedObject)) {
            questions = parsedObject;
        } else if (parsedObject && Array.isArray(parsedObject.questions)) {
            // Handle cases where the model wraps the array in an object: { "questions": [...] }
            questions = parsedObject.questions;
        }

        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            console.error("Parsed response was not a valid question array:", parsedObject);
            throw new Error("Failed to generate a valid test from API response.");
        }
        return questions;
    } catch (error) {
        console.error("Error generating IQ test:", error);
        throw new Error("لم نتمكن من إنشاء الاختبار. يرجى المحاولة مرة أخرى.");
    }
};

export const analyzeResults = async (questions: Question[], answers: UserAnswer[]): Promise<TestResult> => {
    const prompt = `أنت خبير في علم النفس القياسي. قم بتحليل إجابات المستخدم في اختبار الذكاء التالي.
الأسئلة والإجابات الصحيحة: ${JSON.stringify(questions.map(q => ({ id: q.id, question: q.questionText, correctOption: q.correctAnswerIndex})))}
إجابات المستخدم: ${JSON.stringify(answers)}

بناءً على التحليل، قم بإرجاع كائن JSON واحد فقط باللغة العربية بالصيغة التالية:
{
  "estimatedIQ": number,
  "summary": "string",
  "analysis": [
    { "name": "المنطق والاستنتاج", "score": number, "comment": "string" },
    { "name": "التفكير اللفظي", "score": number, "comment": "string" },
    { "name": "التصور المكاني", "score": number, "comment": "string" },
    { "name": "المهارات العددية", "score": number, "comment": "string" }
  ],
  "recommendations": ["string", "string", "string"]
}
تأكد من أن درجة الذكاء المقدرة تتراوح بين 80 و 150. يجب أن تكون كل درجة تحليل من 100. تأكد من أن كل التعليقات والتوصيات بناءة ومفيدة. يجب أن يكون الـ JSON صالحًا تمامًا والجذر عبارة عن كائن JSON واحد.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const result = parseJsonResponse<TestResult>(response.text);
        if (!result || !result.estimatedIQ) {
            console.error("Parsed response was not a valid result object:", response.text);
            throw new Error("Failed to analyze results from API response.");
        }
        return result;

    } catch (error) {
        console.error("Error analyzing results:", error);
        throw new Error("لم نتمكن من تحليل النتائج. يرجى المحاولة مرة أخرى.");
    }
};