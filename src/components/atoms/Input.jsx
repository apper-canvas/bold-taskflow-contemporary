import React, { useState } from "react";
import AppIcon from "@/components/AppIcon";
import ApperIcon from "@/components/ApperIcon";
const Input = ({ 
  label, 
  type = 'text', 
  placeholder,
  value, 
  onChange, 
  onBlur,
  error, 
  icon,
  iconPosition = 'left',
  disabled = false,
  required = false,
  className = '',
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const hasValue = value && value.toString().length > 0;
  const showFloatingLabel = focused || hasValue;
  const showError = error && touched;

  const handleFocus = (e) => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    setTouched(true);
    onBlur?.(e);
  };

  const inputClasses = `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 
    focus:outline-none bg-white
    ${showError 
      ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20' 
      : focused 
        ? 'border-primary focus:ring-2 focus:ring-primary/20' 
        : 'border-gray-200 hover:border-gray-300'
    }
    ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''}
    ${icon && iconPosition === 'left' ? 'pl-11' : ''}
    ${icon && iconPosition === 'right' ? 'pr-11' : ''}
    ${label ? 'pt-6 pb-2' : ''}
    ${className}
  `;

  return (
    <div className="relative">
      <div className="relative">
        {icon && (
          <div className={`absolute top-1/2 transform -translate-y-1/2 z-10 
            ${iconPosition === 'left' ? 'left-3' : 'right-3'}
          `}>
            <ApperIcon 
              name={icon} 
              size={18} 
              className={`${focused ? 'text-primary' : 'text-gray-400'} transition-colors`} 
            />
          </div>
        )}
        
        <input
          type={type}
          value={value || ''}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          placeholder={!label ? placeholder : ''}
          className={inputClasses}
          {...props}
        />
        
        {label && (
          <label
            className={`
              absolute left-4 transition-all duration-200 pointer-events-none
              ${showFloatingLabel 
                ? 'top-2 text-xs floating-label' 
                : 'top-1/2 transform -translate-y-1/2 text-base text-gray-500'
              }
              ${showError ? 'text-error' : focused ? 'text-primary' : 'text-gray-500'}
            `}
          >
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}
      </div>
      
      {showError && (
        <div className="mt-1 flex items-center gap-1 text-sm text-error">
          <ApperIcon name="AlertCircle" size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;