import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTasks } from '@/hooks/useTasks';
import TaskList from '@/components/organisms/TaskList';
import FilterTabs from '@/components/molecules/FilterTabs';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskListPage = () => {
  const { 
    tasks, 
    categories, 
    loading, 
    error, 
    updateTask, 
    deleteTask, 
    loadTasks 
  } = useTasks();
  
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedTasks = useMemo(() => {
    let sorted = [...tasks];
    
    sorted.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          bValue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'created':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return sorted;
  }, [tasks, sortBy, sortOrder]);

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await updateTask(taskId, { completed });
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortOptions = [
    { key: 'dueDate', label: 'Due Date', icon: 'Calendar' },
    { key: 'priority', label: 'Priority', icon: 'Flag' },
    { key: 'title', label: 'Title', icon: 'Type' },
    { key: 'created', label: 'Created', icon: 'Clock' }
  ];

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                All Tasks
              </h1>
              <p className="text-gray-600">
                View and manage all your tasks in one place
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map(option => (
                  <option key={option.key} value={option.key}>
                    Sort by {option.label}
                  </option>
                ))}
              </select>
              
              <Button
                variant="ghost"
                size="small"
                icon={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              </Button>
            </div>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="List" size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{tasks.length}</div>
                <div className="text-xs text-gray-500">Total Tasks</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={16} className="text-success" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {tasks.filter(t => t.completed).length}
                </div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Clock" size={16} className="text-warning" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {tasks.filter(t => !t.completed).length}
                </div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="AlertTriangle" size={16} className="text-error" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length}
                </div>
                <div className="text-xs text-gray-500">Overdue</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6">
            <TaskList
              tasks={sortedTasks}
              categories={categories}
              loading={loading}
              error={error}
              onToggleComplete={handleToggleComplete}
              onEditTask={() => {}} // Editing handled in Home page
              onDeleteTask={handleDeleteTask}
              onRetry={loadTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;