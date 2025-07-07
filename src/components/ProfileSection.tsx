import React from 'react';
import { User, Target, CheckCircle, Clock, TrendingUp, Calendar, Award } from 'lucide-react';
import { TaskStats } from '../types';

interface ProfileSectionProps {
  username: string;
  stats: TaskStats;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ username, stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  
  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'from-green-500 to-emerald-500';
    if (rate >= 60) return 'from-yellow-500 to-orange-500';
    if (rate >= 40) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  const getCompletionIcon = (rate: number) => {
    if (rate >= 80) return <Award className="w-6 h-6" />;
    if (rate >= 60) return <TrendingUp className="w-6 h-6" />;
    return <Target className="w-6 h-6" />;
  };

  const statsCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/30'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-400/30'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: <Clock className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-400/30'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: getCompletionIcon(completionRate),
      color: getCompletionColor(completionRate),
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-400/30'
    }
  ];

  return (
    <div className="bg-black/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 mb-8 relative overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-violet-500/5 rounded-3xl"></div>
      
      <div className="relative z-10">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500/30 to-purple-600/30 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-violet-400/50 shadow-lg shadow-violet-500/25">
              <User className="w-10 h-10 text-violet-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-black flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent mb-2">
              {username}
            </h2>
            <p className="text-gray-300/80 text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <div
              key={card.title}
              className={`
                relative group ${card.bgColor} backdrop-blur-xl rounded-2xl p-6 border ${card.borderColor}
                transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                hover:shadow-violet-500/20 cursor-pointer
              `}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Card gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} text-white shadow-lg`}>
                    {card.icon}
                  </div>
                  {card.title === 'Completion Rate' && (
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                        {completionRate >= 80 ? '🏆' : completionRate >= 60 ? '⭐' : '🎯'}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-gray-300 text-sm font-medium uppercase tracking-wide">
                    {card.title}
                  </h3>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                    {card.value}
                  </p>
                </div>

                {/* Progress bar for completion rate */}
                {card.title === 'Completion Rate' && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${card.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Achievement Section */}
        {completionRate >= 80 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🏆</div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-1">Achievement Unlocked!</h3>
                <p className="text-gray-300">Task Master - You've completed over 80% of your tasks!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;