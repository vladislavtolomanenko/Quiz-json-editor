
export interface Option {
  id: string;
  title: string;
  correctly: boolean;
}

export interface Question {
  id: string;
  type: string;
  title: string;
  options: Option[];
}

// This represents the structure after parsing the malformed string
export interface Quiz {
  title: string;
  courseId: string;
  requiredCorrectAnswers: number;
  questions: Question[];
  durationInMinutes: number;
}

// This represents the original data structure with the malformed questions string
export interface RawQuiz {
  title: string;
  courseId: string;
  requiredCorrectAnswers: number;
  questions: string;
  durationInMinutes: number;
}


// New Types for Lessons
export interface Segment {
  id: string;
  html: string;
  type?: 'video' | 'audio' | 'text';
  videoUrl?: string;
  audioUrl?: string;
  question?: Question;
}

export interface Lesson {
  id: string; // Using slug as ID
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  durationInMinutes: number;
  segments: Segment[];
}

// Fix: Raw types for lessons before IDs are generated.
export type RawOption = Omit<Option, 'id'>;
export type RawQuestion = Omit<Question, 'id' | 'options'> & { options: RawOption[] };
export type RawSegment = Omit<Segment, 'id' | 'question'> & { question?: RawQuestion };
export type RawLesson = Omit<Lesson, 'id' | 'segments'> & { segments: RawSegment[] };
