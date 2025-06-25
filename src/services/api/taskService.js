import taskData from '@/services/mockData/tasks.json';
import { delay } from '@/utils/delay';

let tasks = [...taskData];

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id, 10));
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(400);
    const highestId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      Id: highestId + 1,
      title: taskData.title,
      description: taskData.description || '',
      dueDate: taskData.dueDate || null,
      priority: taskData.priority || 'medium',
      category: taskData.category || 'General',
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      ...taskData
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(300);
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id, 10));
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      Id: tasks[taskIndex].Id // Prevent ID modification
    };
    
    // Set completedAt when marking as completed
    if (updates.completed && !tasks[taskIndex].completed) {
      updatedTask.completedAt = new Date().toISOString();
    } else if (!updates.completed && tasks[taskIndex].completed) {
      updatedTask.completedAt = null;
    }
    
    tasks[taskIndex] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id, 10));
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    return { ...deletedTask };
  },

  async getByCategory(category) {
    await delay(200);
    return tasks.filter(t => t.category === category).map(t => ({ ...t }));
  },

  async getByStatus(completed) {
    await delay(200);
    return tasks.filter(t => t.completed === completed).map(t => ({ ...t }));
  },

  async search(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm)
    ).map(t => ({ ...t }));
  }
};

export default taskService;