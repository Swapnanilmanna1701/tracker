import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  Calendar, 
  Tag, 
  AlertCircle,
  CheckCircle,
  Circle
} from 'lucide-react';
import { Task } from '../types';
import AnimatedButton from './AnimatedButton';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleComplete, 
  onDeleteTask, 
  onEditTask 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDueDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const priorityColors = {
    Low: 'text-green-400 bg-green-400/10 border-green-400/30',
    Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    High: 'text-red-400 bg-red-400/10 border-red-400/30'
  };

  const handleDeleteClick = () => {
    if (showDeleteConfirm) {
      onDeleteTask(task.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className={`
      bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 transition-all duration-300
      hover:bg-black/30 hover:border-white/20 hover:shadow-2xl hover:shadow-violet-500/10
      transform hover:scale-[1.02] relative overflow-hidden
      ${task.completed ? 'opacity-75' : ''}
      ${isOverdue ? 'ring-1 ring-red-400/50 shadow-red-500/20' : ''}
    `}>
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-violet-500/5 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`
              mt-1 flex-shrink-0 transition-all duration-300 transform hover:scale-110
              ${task.completed ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}
            `}
          >
            {task.completed ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={`
                  font-bold text-xl transition-all duration-300
                  ${task.completed ? 'line-through text-gray-400' : 'text-white'}
                `}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`
                    text-sm mt-2 leading-relaxed transition-all duration-300
                    ${task.completed ? 'text-gray-500' : 'text-gray-300'}
                  `}>
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEditTask(task)}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-lg hover:bg-blue-400/10"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className={`
                    transition-all duration-300 transform hover:scale-110 p-2 rounded-lg
                    ${showDeleteConfirm 
                      ? 'text-red-400 hover:text-red-300 bg-red-400/10' 
                      : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                    }
                  `}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className={`
                px-3 py-2 rounded-xl text-xs font-bold border backdrop-blur-xl
                ${priorityColors[task.priority]}
              `}>
                <AlertCircle className="w-3 h-3 inline mr-1" />
                {task.priority}
              </div>

              {task.category && (
                <div className="px-3 py-2 bg-blue-400/10 text-blue-400 rounded-xl text-xs font-bold border border-blue-400/30 backdrop-blur-xl">
                  <Tag className="w-3 h-3 inline mr-1" />
                  {task.category}
                </div>
              )}

              {task.dueDate && (
                <div className={`
                  px-3 py-2 rounded-xl text-xs font-bold border backdrop-blur-xl
                  ${isOverdue 
                    ? 'bg-red-400/10 text-red-400 border-red-400/30' 
                    : 'bg-gray-400/10 text-gray-400 border-gray-400/30'
                  }
                `}>
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {formatDueDate(task.dueDate)}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
              <span className="text-xs text-gray-400">
                Created: {formatDate(task.createdAt)}
              </span>
              {showDeleteConfirm && (
                <span className="text-xs text-red-400 animate-pulse font-semibold">
                  Click again to confirm delete
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;