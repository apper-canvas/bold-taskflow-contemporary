import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import PriorityPill from '@/components/molecules/PriorityPill';
import CategoryDot from '@/components/molecules/CategoryDot';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  categoryColor = '#5B4FE8',
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  const handleToggleComplete = () => {
    onToggleComplete?.(task.Id, !task.completed);
  };

  const handleEdit = () => {
    onEdit?.(task);
  };

  const handleDelete = () => {
    onDelete?.(task.Id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        bg-white rounded-xl p-4 border border-gray-200 transition-all duration-200
        ${isHovered ? 'shadow-lg border-gray-300' : 'shadow-sm'}
        ${task.completed ? 'opacity-75' : ''}
        ${isOverdue ? 'border-l-4 border-l-error' : ''}
        ${isDueToday ? 'border-l-4 border-l-warning' : ''}
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-medium text-gray-900 break-words ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <CategoryDot color={categoryColor} category={task.category} />
              <PriorityPill priority={task.priority} />
            </div>
          </div>

          {task.description && (
            <p className={`text-sm text-gray-600 mb-3 line-clamp-2 break-words ${
              task.completed ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {task.dueDate && (
                <div className={`flex items-center gap-1 ${
                  isOverdue ? 'text-error font-medium' : 
                  isDueToday ? 'text-warning font-medium' : ''
                }`}>
                  <ApperIcon name="Calendar" size={12} />
                  <span>
                    {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <ApperIcon name="Tag" size={12} />
                <span>{task.category}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <AnimatePresence>
              {(isHovered || showActions) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1"
                >
                  <Button
                    variant="ghost"
                    size="small"
                    icon="Edit"
                    onClick={handleEdit}
                    className="text-gray-500 hover:text-primary"
                  />
                  <Button
                    variant="ghost"
                    size="small"
                    icon="Trash2"
                    onClick={handleDelete}
                    className="text-gray-500 hover:text-error"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;