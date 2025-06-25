import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const FilterTabs = ({ 
  activeFilter, 
  onFilterChange, 
  filters = [
    { key: 'all', label: 'All Tasks', icon: 'List' },
    { key: 'active', label: 'Active', icon: 'Clock' },
    { key: 'completed', label: 'Completed', icon: 'CheckSquare' }
  ],
  className = '' 
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map((filter) => (
        <motion.div
          key={filter.key}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant={activeFilter === filter.key ? 'primary' : 'ghost'}
            size="small"
            icon={filter.icon}
            onClick={() => onFilterChange(filter.key)}
            className="whitespace-nowrap"
          >
            {filter.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default FilterTabs;