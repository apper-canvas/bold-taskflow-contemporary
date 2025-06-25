import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '@/hooks/useTasks';
import TaskForm from '@/components/organisms/TaskForm';
import TaskList from '@/components/organisms/TaskList';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Home = () => {
  const { 
    tasks, 
    categories, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    loadTasks 
  } = useTasks();
  
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateTask = async (taskData) => {
    setFormLoading(true);
    try {
      await createTask(taskData);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    if (!editingTask) return;
    
    setFormLoading(true);
    try {
      await updateTask(editingTask.Id, taskData);
      setEditingTask(null);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

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

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                My Tasks
              </h1>
              <p className="text-gray-600">
                Organize and complete your daily tasks efficiently
              </p>
            </div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="primary"
                icon="Plus"
                onClick={() => setShowForm(!showForm)}
                size="large"
              >
                Add Task
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Task Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <ApperIcon name={editingTask ? "Edit" : "Plus"} size={16} className="text-white" />
                  </div>
                  <h2 className="text-xl font-display font-semibold text-gray-900">
                    {editingTask ? 'Edit Task' : 'Create New Task'}
                  </h2>
                </div>
                
                <TaskForm
                  task={editingTask}
                  categories={categories}
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={handleCancelForm}
                  loading={formLoading}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6">
            <TaskList
              tasks={tasks}
              categories={categories}
              loading={loading}
              error={error}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onRetry={loadTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;