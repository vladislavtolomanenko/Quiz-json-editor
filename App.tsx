
import React, { useState, useEffect, useCallback } from 'react';
import type { Quiz, RawQuiz, Question, Option } from './types';
import QuizEditor from './components/QuizEditor';

const initialRawData: RawQuiz[] = [
  {
    "title": "Bitcoin Basics Quiz",
    "courseId": "fe39538e-4b51-47ab-bd6a-5a7723ef912e",
    "requiredCorrectAnswers": 7,
    // FIX: The string literal was malformed due to unescaped double quotes.
    // Converted to a template literal (using backticks) to correctly handle the inner quotes and fix the parsing errors.
    "questions": `{"{\\\"type\\\": \\\"radio\\\", \\\"title\\\": \\"What makes Bitcoin fundamentally different from traditional money?\\", \\\"options\\\": [{\\\"title\\\": \\\"It''s accepted only in El Salvador\\\", \\\"correctly\\\": false}, {\\"title\\": \\"It has a fixed supply of 21 million coins\\", \\"correctly\\": true}, {\\"title\\": \\"It is backed by the IMF\\", \\"correctly\\": false}, {\\"title\\": \\"It guarantees stable prices\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"Why is Bitcoin considered borderless?\\", \\\"options\\\": [{\\"title\\": \\"It is tied to the U.S. dollar\\", \\"correctly\\": false}, {\\"title\\": \\"It needs passport verification\\", \\"correctly\\": false}, {\\"title\\": \\"It works the same anywhere in the world\\", \\"correctly\\": true}, {\\"title\\": \\"It''s banned globally\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What is Bitcoin mining?\\", \\\"options\\\": [{\\"title\\": \\"Creating new laws\\", \\"correctly\\": false}, {\\"title\\": \\"Solving puzzles to validate transactions and earn BTC\\", \\"correctly\\": true}, {\\"title\\": \\"Digging through code manually\\", \\"correctly\\": false}, {\\"title\\": \\"Sending Bitcoin to friends\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What machine is typically used to mine Bitcoin?\\", \\\"options\\": [{\\"title\\": \\"Raspberry Pi\\", \\"correctly\\": false}, {\\"title\\": \\"ASIC\\", \\"correctly\\": true}, {\\"title\\": \\"USB stick\\", \\"correctly\\": false}, {\\"title\\": \\"Blockchain printer\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What does a halving event do?\\\", \\\"options\\\": [{\\"title\\": \\"Halves your wallet balance\\", \\"correctly\\": false}, {\\"title\\": \\"Reduces the block reward\\", \\"correctly\\": true}, {\\"title\\": \\"Increases Bitcoin supply\\", \\"correctly\\": false}, {\\"title\\": \\"Doubles transaction speed\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What happens after you send Bitcoin?\\\", \\\"options\\\": [{\\"title\\": \\"A bank confirms the payment\\", \\"correctly\\": false}, {\\"title\\": \\"The network validates and adds it to the blockchain\\", \\"correctly\\": true}, {\\"title\\": \\"It must be reviewed by miners\\", \\"correctly\\": false}, {\\"title\\": \\"It goes to your email\\", \\"correctly\\": false}]}\",\"{\\\"type\\": \\\"radio\\", \\\"title\\\": \\"What''s a key feature of Bitcoin transactions?\\\", \\\"options\\\": [{\\"title\\": \\"Reversible anytime\\", \\"correctly\\": false}, {\\"title\\": \\"Peer-to-peer and final\\", \\"correctly\\": true}, {\\"title\\": \\"Requires notarization\\", \\"correctly\\": false}, {\\"title\\": \\"Takes weeks to confirm\\", \\"correctly\\": false}]}\",\"{\\\"type\\": \\\"radio\\", \\\"title\\\": \\"What is \\\\\\"DYOR\\\\\\"?\\\", \\\"options\\\": [{\\"title\\": \\"Do Your Own Research\\", \\"correctly\\": true}, {\\"title\\": \\"Don''t Yield On Risk\\", \\"correctly\\": false}, {\\"title\\": \\"Digital Your Own Resources\\", \\"correctly\\": false}, {\\"title\\": \\"Deposit Your Online Receipts\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What should you never share?\\\", \\\"options\\\": [{\\"title\\": \\"Wallet address\\", \\"correctly\\": false}, {\\"title\\": \\"Email ID\\", \\"correctly\\": false}, {\\"title\\": \\"Private keys or seed phrase\\", \\"correctly\\": true}, {\\"title\\": \\"Transaction fees\\", \\"correctly\\": false}]}\",\"{\\\"type\\\": \\\"radio\\", \\\"title\\\": \\"What should you do if unsure about your country’s crypto laws?\\\", \\\"options\\\": [{\\"title\\": \\"Post on Twitter\\", \\"correctly\\": false}, {\\"title\\": \\"Check government websites and legal blogs\\", \\"correctly\\": true}, {\\"title\\": \\"Ignore them\\", \\"correctly\\": false}, {\\"title\\": \\"Buy anyway\\", \\"correctly\\": false}]}\"}`,
    "durationInMinutes": 10
  }
];

const parseQuestions = (questionsString: string): Question[] => {
  if (!questionsString || typeof questionsString !== 'string' || questionsString.length < 2) {
    return [];
  }
  try {
    // The string is malformed as `{"{...}","{...}"}`.
    // We make it a valid JSON array string `["{...}","{...}"]`
    const parsableString = `[${questionsString.substring(1, questionsString.length - 1)}]`;
    const stringArray = JSON.parse(parsableString);

    if (!Array.isArray(stringArray)) return [];

    return stringArray.map((qStr: string) => {
      const questionData = JSON.parse(qStr);
      return {
        ...questionData,
        id: crypto.randomUUID(),
        options: questionData.options.map((opt: Omit<Option, 'id'>) => ({ ...opt, id: crypto.randomUUID() }))
      };
    });
  } catch (error) {
    console.error("Failed to parse questions string:", error);
    return [];
  }
};

const serializeQuestions = (questions: Question[]): string => {
  try {
    const questionsWithoutIds = questions.map(({ id, options, ...rest }) => ({
      ...rest,
      options: options.map(({ id, ...optRest }) => optRest)
    }));
    const stringifiedArray = questionsWithoutIds.map(q => JSON.stringify(q));
    const joinedString = stringifiedArray.join(',');
    return `{${joinedString}}`;
  } catch (error) {
    console.error("Failed to serialize questions:", error);
    return "{}";
  }
};


const App: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [jsonOutput, setJsonOutput] = useState('');

  useEffect(() => {
    const parsedData = initialRawData.map(rawQuiz => ({
      ...rawQuiz,
      questions: parseQuestions(rawQuiz.questions)
    }));
    setQuizzes(parsedData);
  }, []);

  const updateJsonOutput = useCallback((updatedQuizzes: Quiz[]) => {
    const rawData: RawQuiz[] = updatedQuizzes.map(quiz => ({
      ...quiz,
      questions: serializeQuestions(quiz.questions)
    }));
    setJsonOutput(JSON.stringify(rawData, null, 2));
  }, []);

  useEffect(() => {
    if (quizzes.length > 0) {
      updateJsonOutput(quizzes);
    }
  }, [quizzes, updateJsonOutput]);

  const handleQuizChange = (index: number, updatedQuiz: Quiz) => {
    const newQuizzes = [...quizzes];
    newQuizzes[index] = updatedQuiz;
    setQuizzes(newQuizzes);
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">Quiz JSON Editor</h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 mt-2">
            Visually edit the quiz data below and see the live JSON output.
          </p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2 border-gray-300 dark:border-gray-700">Editor</h2>
            {quizzes.map((quiz, index) => (
              <QuizEditor
                key={quiz.courseId}
                quiz={quiz}
                onChange={(updatedQuiz) => handleQuizChange(index, updatedQuiz)}
              />
            ))}
          </div>
          <div className="relative">
            <h2 className="text-2xl font-semibold border-b pb-2 border-gray-300 dark:border-gray-700 mb-6">Live JSON Output</h2>
            <div className="sticky top-8">
              <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner h-[80vh] overflow-auto text-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <code className="font-mono">{jsonOutput}</code>
              </pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
