import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import AppIcon from '@/components/AppIcon'
import { debounce } from 'lodash'

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch?.(term);
    }, 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch?.('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${className}`}
    >
      <Input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        icon="Search"
        className="pr-10"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <AppIcon name="X" size={16} className="text-gray-400" />
        </button>
      )}
    </motion.div>
  );
};

export default SearchBar;