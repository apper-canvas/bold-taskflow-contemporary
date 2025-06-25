import Home from '@/components/pages/Home';
import TaskList from '@/components/pages/TaskList';
import Statistics from '@/components/pages/Statistics';

export const routes = {
  home: {
    id: 'home',
    label: 'Tasks',
    path: '/',
    icon: 'CheckSquare',
    component: Home
  },
  tasks: {
    id: 'tasks',
    label: 'All Tasks',
    path: '/tasks',
    icon: 'List',
    component: TaskList
  },
  statistics: {
    id: 'statistics',
    label: 'Statistics',
    path: '/statistics',
    icon: 'BarChart3',
    component: Statistics
  }
};

export const routeArray = Object.values(routes);
export default routes;