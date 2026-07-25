export type Stage = 'all' | 'preparatory' | 'secondary' | 'azhar';

export interface ScheduleItem {
  id: string;
  gradeName: string;
  stage: 'preparatory' | 'secondary' | 'azhar';
  days: string[];
  timeText: string;
  startDateText: string;
  iconType: 'clock' | 'book' | 'chat' | 'pencil';
  status: 'open' | 'starting_soon' | 'limited';
  description?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}
