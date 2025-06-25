import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  label,
  className = '',
  ...props 
}) => {
  const handleChange = (e) => {
    if (disabled) return;
    onChange?.(e.target.checked);
  };

  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <motion.div
          className={`
            w-5 h-5 border-2 rounded transition-all duration-200
            ${checked 
              ? 'bg-primary border-primary' 
              : 'bg-white border-gray-300 hover:border-gray-400'
            }
          `}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
        >
          <motion.div
            initial={false}
            animate={checked ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center h-full"
          >
            <ApperIcon name="Check" size={12} className="text-white" />
          </motion.div>
        </motion.div>
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700 select-none">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;