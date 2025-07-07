import React, { useState, useEffect } from 'react';
import { Plus, X, Calendar, AlertCircle } from 'lucide-react';
import { Task } from '../types';
import AnimatedButton from './AnimatedButton';
import GlassInput from './GlassInput';
import GlassTextarea from './GlassTextarea';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdateTask?: (task: Task) => void;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onAddTask, 
  onUpdateTask, 
  editingTask, 
  onCancelEdit 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium' as Task['priority'],
    dueDate: '',
    category: '',
    completed: false
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority,
        dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '',
        category: editingTask.category || '',
        completed: editingTask.completed
      });
      setIsOpen(true);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
      category: formData.category.trim() || undefined,
      completed: formData.completed
    };

    if (editingTask && onUpdateTask) {
      onUpdateTask({
        ...editingTask,
        ...taskData
      });
    } else {
      onAddTask(taskData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      category: '',
      completed: false
    });
    setIsOpen(false);
    onCancelEdit?.();
  };

  if (!isOpen && !editingTask) {
    return (
      <AnimatedButton
        onClick={() => setIsOpen(true)}
        className="w-full py-4 text-lg"
      >
        <Plus className="w-6 h-6" />
        Add New Task
      </AnimatedButton>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-violet-500/5 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={resetForm}
            className="text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90 transform"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200/90 mb-3">
              Task Title *
            </label>
            <GlassInput
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200/90 mb-3">
              Description
            </label>
            <GlassTextarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description (optional)"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-200/90 mb-3">
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                className="w-full px-4 py-3 bg-black/20 backdrop-blur-xl rounded-xl border-2 border-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 49, 83, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)',
                  borderImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3)) 1'
                }}
              >
                <option value="Low" className="bg-slate-800 text-white">Low</option>
                <option value="Medium" className="bg-slate-800 text-white">Medium</option>
                <option value="High" className="bg-slate-800 text-white">High</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-200/90 mb-3">
                Due Date
              </label>
              <GlassInput
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-200/90 mb-3">
              Category
            </label>
            <GlassInput
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Enter category (optional)"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <AnimatedButton
              type="button"
              onClick={resetForm}
              variant="secondary"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              type="submit"
              disabled={!formData.title.trim()}
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </AnimatedButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;