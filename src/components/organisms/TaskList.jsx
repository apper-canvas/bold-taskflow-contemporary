import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import FilterTabs from '@/components/molecules/FilterTabs';
import SearchBar from '@/components/molecules/SearchBar';
import EmptyState from '@/components/organisms/EmptyState';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';

const TaskList = ({ 
  tasks = [], 
  categories = [],
  loading = false,
  error = null,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onRetry,
  className = ''
}) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter by status
    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tasks, filter, searchQuery, selectedCategory]);

  const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || '#5B4FE8';
  };

  const categoryFilters = [
    { key: 'all', label: 'All Categories', icon: 'Layers' },
    ...categories.map(cat => ({
      key: cat.name,
      label: cat.name,
      icon: 'Tag'
    }))
  ];

  if (loading) {
    return <SkeletonLoader count={3} />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filters and Search */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search tasks..."
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <FilterTabs
            activeFilter={filter}
            onFilterChange={setFilter}
            className="flex-1"
          />
          
          <FilterTabs
            activeFilter={selectedCategory}
            onFilterChange={setSelectedCategory}
            filters={categoryFilters}
            className="flex-1"
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <EmptyState
            icon="CheckSquare"
            title={
              searchQuery ? 'No tasks found' :
              filter === 'completed' ? 'No completed tasks' :
              filter === 'active' ? 'No active tasks' :
              'No tasks yet'
            }
            description={
              searchQuery ? 'Try adjusting your search terms' :
              filter === 'completed' ? 'Complete some tasks to see them here' :
              filter === 'active' ? 'All tasks are completed!' :
              'Create your first task to get started'
            }
            actionLabel={!searchQuery && filter === 'all' ? 'Add Task' : null}
            onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
              >
                <TaskCard
                  task={task}
                  categoryColor={getCategoryColor(task.category)}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default TaskList;