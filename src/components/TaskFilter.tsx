import React from 'react';
import { CheckCircle, Clock, List } from 'lucide-react';
import { FilterType, TaskStats } from '../types';
import AnimatedButton from './AnimatedButton';

interface TaskFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: TaskStats;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ activeFilter, onFilterChange, stats }) => {
  const filters = [
    {
      key: 'all' as FilterType,
      label: 'All Tasks',
      icon: List,
      count: stats.total,
      color: 'text-blue-400',
      activeColor: 'from-blue-500/30 to-blue-600/30 border-blue-400/50'
    },
    {
      key: 'completed' as FilterType,
      label: 'Completed',
      icon: CheckCircle,
      count: stats.completed,
      color: 'text-green-400',
      activeColor: 'from-green-500/30 to-green-600/30 border-green-400/50'
    },
    {
      key: 'pending' as FilterType,
      label: 'Pending',
      icon: Clock,
      count: stats.pending,
      color: 'text-yellow-400',
      activeColor: 'from-yellow-500/30 to-yellow-600/30 border-yellow-400/50'
    }
  ];

  return (
    <div className="flex flex-wrap gap-3 sm:gap-4">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.key;
        
        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`
              flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300
              backdrop-blur-xl border transform hover:scale-105
              ${isActive 
                ? `bg-gradient-to-r ${filter.activeColor} text-white shadow-lg shadow-${filter.color.split('-')[1]}-500/25` 
                : 'bg-black/20 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20'
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:inline font-semibold">{filter.label}</span>
            <span className={`
              px-3 py-1 text-sm rounded-full font-bold
              ${isActive 
                ? 'bg-white/20 text-white' 
                : 'bg-white/10 text-gray-400'
              }
            `}>
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TaskFilter;