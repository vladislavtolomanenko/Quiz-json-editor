
import React, { useState } from 'react';
import type { Quiz, Question, Option } from '../types';
import QuestionEditor from './QuestionEditor';

interface QuizEditorProps {
  quiz: Quiz;
  onChange: (updatedQuiz: Quiz) => void;
}

const InputField: React.FC<{ label: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; }> = ({ label, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const QuizEditor: React.FC<QuizEditorProps> = ({ quiz, onChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFieldChange = (field: keyof Quiz, value: string | number) => {
    onChange({ ...quiz, [field]: value });
  };

  const handleQuestionChange = (qIndex: number, updatedQuestion: Question) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex] = updatedQuestion;
    onChange({ ...quiz, questions: newQuestions });
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type: 'radio',
      title: 'New Question',
      options: [
        { id: crypto.randomUUID(), title: 'New Option', correctly: true }
      ]
    };
    onChange({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };
  
  const removeQuestion = (qIndex: number) => {
    const newQuestions = quiz.questions.filter((_, index) => index !== qIndex);
    onChange({ ...quiz, questions: newQuestions });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{quiz.title}</h3>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-indigo-500 hover:text-indigo-700">
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Quiz Title" value={quiz.title} onChange={(e) => handleFieldChange('title', e.target.value)} />
            <InputField label="Course ID" value={quiz.courseId} onChange={(e) => handleFieldChange('courseId', e.target.value)} />
            <InputField label="Required Correct Answers" type="number" value={quiz.requiredCorrectAnswers} onChange={(e) => handleFieldChange('requiredCorrectAnswers', parseInt(e.target.value, 10) || 0)} />
            <InputField label="Duration (Minutes)" type="number" value={quiz.durationInMinutes} onChange={(e) => handleFieldChange('durationInMinutes', parseInt(e.target.value, 10) || 0)} />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h4 className="text-lg font-semibold mb-2">Questions</h4>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => (
                <QuestionEditor 
                  key={question.id}
                  question={question}
                  index={index}
                  onChange={handleQuestionChange}
                  onRemove={removeQuestion}
                />
              ))}
            </div>
          </div>
          
          <button onClick={addQuestion} className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Add Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizEditor;
