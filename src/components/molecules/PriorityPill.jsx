import React from 'react';
import { motion } from 'framer-motion';
import Badge from '@/components/atoms/Badge';

const PriorityPill = ({ priority, className = '', ...props }) => {
  const priorityConfig = {
    low: {
      label: 'Low',
      className: 'priority-low text-white animate-pulse-glow'
    },
    medium: {
      label: 'Medium', 
      className: 'priority-medium text-white animate-pulse-glow'
    },
    high: {
      label: 'High',
      className: 'priority-high text-white animate-pulse-glow'
    }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={className}
      {...props}
    >
      <Badge 
        className={`${config.className} font-semibold`}
        size="small"
      >
        {config.label}
      </Badge>
    </motion.div>
  );
};

export default PriorityPill;