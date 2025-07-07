export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  category?: string;
}

export interface User {
  username: string;
  loginTime: string;
}

export type FilterType = 'all' | 'completed' | 'pending';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}