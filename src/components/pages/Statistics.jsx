import React from 'react';
import { motion } from 'framer-motion';
import { useTasks } from '@/hooks/useTasks';
import StatisticsPanel from '@/components/organisms/StatisticsPanel';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';

const Statistics = () => {
  const { statistics, loading, error, loadTasks } = useTasks();

  if (loading) {
    return (
      <div className="min-h-full bg-background">
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <SkeletonLoader count={4} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-background">
        <div className="max-w-6xl mx-auto p-6">
          <ErrorState message={error} onRetry={loadTasks} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Task Statistics
          </h1>
          <p className="text-gray-600">
            Track your productivity and task completion progress
          </p>
        </motion.div>

        {/* Statistics Panel */}
        <StatisticsPanel statistics={statistics} />
      </div>
    </div>
  );
};

export default Statistics;