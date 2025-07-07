import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleComplete, 
  onDeleteTask, 
  onEditTask 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-xl rounded-full mb-6 border border-violet-400/30">
          <CheckCircle className="w-12 h-12 text-violet-300" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent mb-3">
          No tasks found
        </h3>
        <p className="text-gray-400 text-lg">Create your first task to get started!</p>
      </div>
    );
  }

  // Sort tasks: incomplete first, then by priority, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority
    const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }
    
    // Then by due date (tasks with due dates first)
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    // Finally by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;