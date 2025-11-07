
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
