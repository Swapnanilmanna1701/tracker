import { Task, User } from '../types';

const STORAGE_KEYS = {
  USER: 'taskTracker_user',
  TASKS: 'taskTracker_tasks',
} as const;

export const storageUtils = {
  // User operations
  saveUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): User | null => {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  removeUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Task operations
  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  getTasks: (): Task[] => {
    try {
      const tasksData = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasksData ? JSON.parse(tasksData) : [];
    } catch (error) {
      console.error('Error parsing tasks data:', error);
      return [];
    }
  },

  removeTasks: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
  },

  // Clear all data
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
  },
};

// Sample data for testing
export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Complete React assignment',
    description: 'Build a task tracker application with modern UI',
    completed: false,
    createdAt: '2024-01-15T10:00:00Z',
    priority: 'High',
    dueDate: '2024-01-20T23:59:59Z',
    category: 'Work'
  },
  {
    id: '2',
    title: 'Review JavaScript concepts',
    description: 'Go through ES6+ features and modern JavaScript patterns',
    completed: true,
    createdAt: '2024-01-14T15:30:00Z',
    priority: 'Medium',
    category: 'Learning'
  },
  {
    id: '3',
    title: 'Plan weekend activities',
    description: 'Research local events and activities for the weekend',
    completed: false,
    createdAt: '2024-01-13T09:15:00Z',
    priority: 'Low',
    category: 'Personal'
  },
];