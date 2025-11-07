import React from 'react';
import type { Question, Option } from '../types';
import OptionEditor from './OptionEditor';

interface QuestionEditorProps {
  question: Question;
  index: number;
  onChange: (index: number, updatedQuestion: Question) => void;
  onRemove: (index: number) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, index, onChange, onRemove }) => {

  const handleFieldChange = (field: keyof Question, value: string) => {
    const updatedQuestion = { ...question, [field]: value };

    // When changing type to 'radio', ensure only one option can be correct.
    // Keep the first correct option found and uncheck the others.
    if (field === 'type' && value === 'radio') {
      let firstCorrectFound = false;
      updatedQuestion.options = updatedQuestion.options.map(opt => {
        if (opt.correctly) {
          if (firstCorrectFound) {
            return { ...opt, correctly: false }; // Uncheck subsequent correct options
          }
          firstCorrectFound = true;
        }
        return opt;
      });
    }

    onChange(index, updatedQuestion);
  };

  const handleOptionChange = (optIndex: number, updatedOption: Option) => {
    let newOptions = [...question.options];

    if (question.type === 'radio' && updatedOption.correctly) {
      // If question type is 'radio' and an option is marked as correct,
      // ensure all other options are marked as incorrect.
      newOptions = newOptions.map((opt, i) => ({
        ...opt,
        correctly: i === optIndex
      }));
    } else {
      // For 'checkbox' type or when unchecking an option, just update the specific one.
      newOptions[optIndex] = updatedOption;
    }
    
    onChange(index, { ...question, options: newOptions });
  };

  const addOption = () => {
    const newOption: Option = { id: crypto.randomUUID(), title: 'New Option', correctly: false };
    onChange(index, { ...question, options: [...question.options, newOption] });
  };

  const removeOption = (optIndex: number) => {
    const newOptions = question.options.filter((_, i) => i !== optIndex);
    onChange(index, { ...question, options: newOptions });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
        <div className="flex justify-between items-start mb-2">
            <div className="flex-grow">
                 <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Question {index + 1}</label>
                 <input
                    type="text"
                    value={question.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full text-md font-semibold bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-600 focus:ring-0 focus:border-indigo-500 p-1"
                />
            </div>
            <button onClick={() => onRemove(index)} className="ml-4 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
        </div>
        
        <div className="mb-3">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Question Type</label>
            <select
                value={question.type}
                onChange={(e) => handleFieldChange('type', e.target.value)}
                className="w-full mt-1 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
            </select>
        </div>

      <div className="space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
        <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Options</h5>
        {question.options.map((option, optIndex) => (
          <OptionEditor
            key={option.id}
            option={option}
            index={optIndex}
            onChange={handleOptionChange}
            onRemove={removeOption}
            type={question.type}
          />
        ))}
      </div>
       <button onClick={addOption} className="mt-3 w-full flex justify-center items-center px-3 py-1.5 border border-dashed border-gray-400 text-xs font-medium rounded-md text-gray-600 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        Add Option
      </button>
    </div>
  );
};

export default QuestionEditor;