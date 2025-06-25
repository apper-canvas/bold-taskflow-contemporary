import categoryData from '@/services/mockData/categories.json';
import { delay } from '@/utils/delay';

let categories = [...categoryData];

const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(c => c.Id === parseInt(id, 10));
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const highestId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0;
    const newCategory = {
      Id: highestId + 1,
      name: categoryData.name,
      color: categoryData.color || '#5B4FE8',
      taskCount: 0,
      ...categoryData
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updates) {
    await delay(250);
    const categoryIndex = categories.findIndex(c => c.Id === parseInt(id, 10));
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    
    const updatedCategory = {
      ...categories[categoryIndex],
      ...updates,
      Id: categories[categoryIndex].Id // Prevent ID modification
    };
    
    categories[categoryIndex] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(200);
    const categoryIndex = categories.findIndex(c => c.Id === parseInt(id, 10));
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    const deletedCategory = categories.splice(categoryIndex, 1)[0];
    return { ...deletedCategory };
  }
};

export default categoryService;