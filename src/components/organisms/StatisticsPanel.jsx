import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ProgressRing from '@/components/organisms/ProgressRing';

const StatisticsPanel = ({ statistics, className = '' }) => {
  const stats = [
    {
      label: 'Total Tasks',
      value: statistics.totalTasks,
      icon: 'List',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Completed Today',
      value: statistics.completedToday,
      icon: 'CheckSquare',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Pending Tasks',
      value: statistics.pendingTasks,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Overdue',
      value: statistics.overdueCount,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  const completionRate = statistics.totalTasks > 0 
    ? Math.round((statistics.completedToday / statistics.totalTasks) * 100)
    : 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-semibold text-gray-900">
            Today's Progress
          </h3>
          <ProgressRing
            completed={statistics.completedToday}
            total={statistics.totalTasks}
            size={60}
          />
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-1">
            {statistics.completedToday}
          </div>
          <div className="text-sm text-gray-600">
            of {statistics.totalTasks} tasks completed
          </div>
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <ApperIcon name={stat.icon} size={20} className={stat.color} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.label}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Quick Insights
        </h3>
        
        <div className="space-y-3">
          {statistics.overdueCount > 0 && (
            <div className="flex items-center gap-3 p-3 bg-error/5 rounded-lg">
              <ApperIcon name="AlertTriangle" size={16} className="text-error" />
              <span className="text-sm text-error font-medium">
                You have {statistics.overdueCount} overdue task{statistics.overdueCount !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          {completionRate >= 80 && statistics.totalTasks > 0 && (
            <div className="flex items-center gap-3 p-3 bg-success/5 rounded-lg">
              <ApperIcon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">
                Great job! You're {completionRate}% done with today's tasks
              </span>
            </div>
          )}
          
          {statistics.pendingTasks === 0 && statistics.totalTasks > 0 && (
            <div className="flex items-center gap-3 p-3 bg-success/5 rounded-lg">
              <ApperIcon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">
                All tasks completed! Time to add some new ones
              </span>
            </div>
          )}
          
          {statistics.totalTasks === 0 && (
            <div className="flex items-center gap-3 p-3 bg-info/5 rounded-lg">
              <ApperIcon name="Info" size={16} className="text-info" />
              <span className="text-sm text-info font-medium">
                Start by creating your first task to track your progress
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsPanel;