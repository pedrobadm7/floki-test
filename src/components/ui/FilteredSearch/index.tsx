/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';

import debounce from '../../../utils/debounce';
import SelectBox from '../SelectBox';

interface FilteredSearchProps {
  onSearch: (query: string, filters: { gender: string | null }) => void;
}

const FilteredSearch = ({ onSearch }: FilteredSearchProps) => {
  const [filters, setFilters] = useState<{ gender: string | null }>({
    gender: null,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleGenderChange = (gender: string | null) => {
    setFilters({ gender });

    handleSearch(searchQuery, { gender });
  };

  const handleSearch = useCallback(
    debounce((query: string, currentFilters: { gender: string | null }) => {
      onSearch(query, currentFilters);
    }, 500),
    [onSearch],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value, filters);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Filter by:</label>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <SelectBox
              id="male"
              name="gender"
              value="male"
              checked={filters.gender === 'male'}
              onChange={() => handleGenderChange('male')}
            />
          </div>

          <div className="flex items-center space-x-2">
            <SelectBox
              id="female"
              name="gender"
              value="female"
              checked={filters.gender === 'female'}
              onChange={() => handleGenderChange('female')}
            />
          </div>

          <div className="flex items-center space-x-2">
            <SelectBox
              id="all"
              name="gender"
              value=""
              checked={filters.gender === null}
              onChange={() => handleGenderChange(null)}
            />
            <label htmlFor="all" className="text-sm font-medium">
              All
            </label>
          </div>
        </div>
      </div>

      <div className="relative">
        <input
          type="search"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default FilteredSearch;
