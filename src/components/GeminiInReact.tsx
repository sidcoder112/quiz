import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

export interface Question {
  type: 'multiple-choice' | 'true-false';
  question: string;
  options?: Record<string, string>;
  answer: string;
}

interface GenerateQuestionsResponse {
  questions: Question[];
}

async function generateQuestions(category: string, difficulty: string, numberOfQuestions: number): Promise<GenerateQuestionsResponse> {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Please generate exactly ${numberOfQuestions} questions for a quiz based on the following category: ${category.toLowerCase()} and difficulty: ${difficulty}. 
      
**Important Constraints:**
1. Do not include "All of the Above" as an option in any multiple-choice questions.
2. Limit True/False questions to no more than 20% of the total questions.
3. Only give questions of either multiple-choice or true-false , no other type of questions.

Return the questions in JSON format with the following structure:

{
  "questions": [
    {
      "type": "multiple-choice",
      "question": "What is the capital of France?",
      "options": {
        "A": "Berlin",
        "B": "Madrid",
        "C": "Paris",
        "D": "Rome"
      },
      "answer": "C"
    },
    ...
    {
      "type": "true-false",
      "question": "The Earth is flat.",
      "answer": "False"
    }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    console.log(responseText)
    responseText = responseText.replace(/```json|```|```JSON|```questions/g, '').trim();

    // check resp val JSON
    if (responseText.startsWith('{') || responseText.startsWith('[')) {
      return JSON.parse(responseText);
    } else {
      throw new Error('Invalid JSON format received');
    }
  } catch (error) {
    console.error("Error during generating questions:", error);
    throw error;
  }
}

export function useGenerateQuestions(category: string, difficulty: string, numberOfQuestions: number) {
  const [responseJson, setResponseJson] = useState<GenerateQuestionsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async (retries = MAX_RETRIES) => {
    if (!category || !difficulty) {
      setError("Category or difficulty is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null); // clear errors
    setResponseJson(null);

    try {
      const questions = await generateQuestions(category, difficulty, numberOfQuestions);
      setResponseJson(questions);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred:", error); 
    
      if (retries > 0) {
        setTimeout(() => fetchQuestions(retries - 1), RETRY_DELAY_MS);
      } else {
        setError("Something went wrong, please try again later.");
        setLoading(false);
      }
    }
    
  }, [category, difficulty, numberOfQuestions]);

  return { responseJson, loading, error, fetchQuestions };
}
