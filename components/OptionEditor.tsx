import React from 'react';
import type { Option } from '../types';

interface OptionEditorProps {
  option: Option;
  index: number;
  type: 'radio' | 'checkbox' | string;
  onChange: (index: number, updatedOption: Option) => void;
  onRemove: (index: number) => void;
}

const OptionEditor: React.FC<OptionEditorProps> = ({ option, index, type, onChange, onRemove }) => {

  const handleFieldChange = (field: keyof Option, value: string | boolean) => {
    onChange(index, { ...option, [field]: value });
  };

  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 p-2 rounded-md">
      <input
        type="text"
        value={option.title}
        onChange={(e) => handleFieldChange('title', e.target.value)}
        className="flex-grow w-full bg-transparent border-0 focus:ring-0 p-1"
        placeholder={`Option ${index + 1}`}
      />
      <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300">
        <input
          type={type === 'radio' ? 'radio' : 'checkbox'}
          checked={option.correctly}
          onChange={(e) => handleFieldChange('correctly', e.target.checked)}
          className={`${type === 'radio' ? 'text-indigo-600' : 'rounded text-indigo-600'} focus:ring-indigo-500`}
          name={`question-${option.id}`} // Group radio buttons
        />
        <span>Correct</span>
      </label>
      <button onClick={() => onRemove(index)} className="text-gray-400 hover:text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};

export default OptionEditor;