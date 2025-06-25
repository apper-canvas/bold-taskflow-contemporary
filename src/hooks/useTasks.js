import { useState, useEffect } from 'react';
import taskService from '@/services/api/taskService';
import categoryService from '@/services/api/categoryService';
import { toast } from 'react-toastify';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success('Task created successfully');
      return newTask;
    } catch (err) {
      toast.error('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id, 10) ? updatedTask : task
      ));
      if (updates.completed !== undefined) {
        toast.success(updates.completed ? 'Task completed!' : 'Task marked as pending');
      }
      return updatedTask;
    } catch (err) {
      toast.error('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id, 10)));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
      throw err;
    }
  };

  const statistics = {
    totalTasks: tasks.length,
    completedToday: tasks.filter(task => {
      if (!task.completed || !task.completedAt) return false;
      const today = new Date().toDateString();
      const completedDate = new Date(task.completedAt).toDateString();
      return today === completedDate;
    }).length,
    pendingTasks: tasks.filter(task => !task.completed).length,
    overdueCount: tasks.filter(task => {
      if (task.completed || !task.dueDate) return false;
      return new Date(task.dueDate) < new Date();
    }).length
  };

  return {
    tasks,
    categories,
    loading,
    error,
    statistics,
    createTask,
    updateTask,
    deleteTask,
    loadTasks
  };
};