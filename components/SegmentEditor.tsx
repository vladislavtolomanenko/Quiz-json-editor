
import React from 'react';
import type { Segment, Question, Option } from '../types';
import QuestionEditor from './QuestionEditor';

interface SegmentEditorProps {
  segment: Segment;
  index: number;
  onChange: (index: number, updatedSegment: Segment) => void;
  onRemove: (index: number) => void;
}

const SegmentEditor: React.FC<SegmentEditorProps> = ({ segment, index, onChange, onRemove }) => {

  const handleFieldChange = (field: keyof Segment, value: string) => {
    // When value is an empty string, we want to treat it as undefined for optional fields
    const newValue = value === '' ? undefined : value;
    onChange(index, { ...segment, [field]: newValue });
  };
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as Segment['type'];
    const updatedSegment: Segment = {
      id: segment.id,
      html: segment.html,
      type: newType,
    };

    // Preserve existing relevant values when switching, and clear irrelevant ones.
    if (newType === 'video') {
      updatedSegment.videoUrl = segment.videoUrl;
    } else if (newType === 'audio') {
      updatedSegment.audioUrl = segment.audioUrl;
    } else if (newType === 'text') {
      // Only text segments can have questions
      updatedSegment.question = segment.question;
    }
    
    onChange(index, updatedSegment);
  };
  
  const handleQuestionChange = (_: number, updatedQuestion: Question) => {
    onChange(index, { ...segment, question: updatedQuestion });
  };
  
  const addQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type: 'radio',
      title: 'New Question',
      options: [
        { id: crypto.randomUUID(), title: 'Correct Answer', correctly: true },
        { id: crypto.randomUUID(), title: 'Wrong Answer', correctly: false },
      ]
    };
    onChange(index, { ...segment, question: newQuestion });
  };

  const removeQuestion = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { question, ...rest } = segment;
    onChange(index, rest);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
        <div className="flex justify-between items-start mb-2">
            <div className="flex-grow">
                 <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Segment {index + 1}</label>
                 <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100">HTML Content</h5>
            </div>
            <button onClick={() => onRemove(index)} className="ml-4 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
        </div>

        <textarea
            value={segment.html}
            onChange={(e) => handleFieldChange('html', e.target.value)}
            rows={8}
            className="w-full text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2 font-mono"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Segment Type</label>
                <select
                    value={segment.type || 'text'}
                    onChange={handleTypeChange}
                    className="w-full mt-1 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                    <option value="text">Text</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                </select>
            </div>

            {segment.type === 'video' && (
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Video URL (optional)</label>
                    <input
                        type="text"
                        value={segment.videoUrl || ''}
                        onChange={(e) => handleFieldChange('videoUrl', e.target.value)}
                        className="w-full mt-1 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        placeholder="https://youtube.com/watch?v=..."
                    />
                </div>
            )}
            
            {segment.type === 'audio' && (
                 <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Audio URL (optional)</label>
                    <input
                        type="text"
                        value={segment.audioUrl || ''}
                        onChange={(e) => handleFieldChange('audioUrl', e.target.value)}
                        className="w-full mt-1 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        placeholder="https://.../audio.mp3"
                    />
                </div>
            )}
        </div>
        
        {(!segment.type || segment.type === 'text') && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Embedded Question (optional)</h5>
              {segment.question ? (
                   <QuestionEditor 
                      question={segment.question}
                      index={0}
                      onChange={handleQuestionChange}
                      onRemove={removeQuestion}
                  />
              ) : (
                  <button onClick={addQuestion} className="w-full flex justify-center items-center px-3 py-1.5 border border-dashed border-gray-400 text-xs font-medium rounded-md text-gray-600 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      Add Question
                  </button>
              )}
          </div>
        )}
    </div>
  );
};

export default SegmentEditor;
