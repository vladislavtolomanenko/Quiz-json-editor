
import React, { useState } from 'react';
import type { Lesson, Segment } from '../types';
import SegmentEditor from './SegmentEditor';

interface LessonEditorProps {
  lesson: Lesson;
  onChange: (updatedLesson: Lesson) => void;
}

const InputField: React.FC<{ label: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; type?: string; isTextArea?: boolean }> = ({ label, value, onChange, type = 'text', isTextArea = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    {isTextArea ? (
       <textarea
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    )}
  </div>
);

const LessonEditor: React.FC<LessonEditorProps> = ({ lesson, onChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFieldChange = (field: keyof Lesson, value: string | number) => {
    onChange({ ...lesson, [field]: value });
  };

  const handleSegmentChange = (sIndex: number, updatedSegment: Segment) => {
    const newSegments = [...lesson.segments];
    newSegments[sIndex] = updatedSegment;
    onChange({ ...lesson, segments: newSegments });
  };
  
  const addSegment = () => {
    const newSegment: Segment = {
      id: crypto.randomUUID(),
      html: '<p>New Segment</p>',
      type: 'text'
    };
    onChange({ ...lesson, segments: [...lesson.segments, newSegment] });
  };

  const removeSegment = (sIndex: number) => {
    const newSegments = lesson.segments.filter((_, index) => index !== sIndex);
    onChange({ ...lesson, segments: newSegments });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{lesson.title}</h3>
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
            <InputField label="Lesson Title" value={lesson.title} onChange={(e) => handleFieldChange('title', e.target.value)} />
            <InputField label="Slug" value={lesson.slug} onChange={(e) => handleFieldChange('slug', e.target.value)} />
            <InputField label="Meta Title" value={lesson.metaTitle} onChange={(e) => handleFieldChange('metaTitle', e.target.value)} />
            <InputField label="Duration (Minutes)" type="number" value={lesson.durationInMinutes} onChange={(e) => handleFieldChange('durationInMinutes', parseInt(e.target.value, 10) || 0)} />
            <InputField label="Meta Description" value={lesson.metaDescription} onChange={(e) => handleFieldChange('metaDescription', e.target.value)} isTextArea />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h4 className="text-lg font-semibold mb-2">Segments</h4>
            <div className="space-y-4">
              {lesson.segments.map((segment, index) => (
                <SegmentEditor 
                  key={segment.id}
                  segment={segment}
                  index={index}
                  onChange={handleSegmentChange}
                  onRemove={removeSegment}
                />
              ))}
            </div>
          </div>
          
          <button onClick={addSegment} className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Add Segment
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonEditor;
