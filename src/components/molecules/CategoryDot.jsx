import React from 'react';
import { motion } from 'framer-motion';

const CategoryDot = ({ category, color, size = 'medium', className = '', ...props }) => {
  const sizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-6 h-6'
  };

  return (
    <motion.div
      className={`${sizes[size]} rounded-full transition-all duration-200 ${className}`}
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.2 }}
      title={category}
      {...props}
    />
  );
};

export default CategoryDot;