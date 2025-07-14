export interface Activity {
  id: number;
  title: string;
  date: string;
  type: string;
  confirmed?: boolean;
  time?: string;
}

export interface Speaker {
  id: number;
  name: string;
  expertise: string;
  rating: number;
  color?: string;
  initials?: string;
  specialty?: string;
}

export interface Milestone {
  id: number;
  name: string;
  status: 'completed' | 'in-progress' | 'not-started';
  completionDate?: Date;
  progress: number;
  type: string;
  details: string;
  goal: string;
}
