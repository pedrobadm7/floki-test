import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '../../../utils/cn';

interface PaginationDropdownProps {
  itemsPerPage: number;
  setItemsPerPage: (numberOfItemPerPage: number) => void;
}

const PaginationDropdown: React.FC<PaginationDropdownProps> = ({
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [5, 20, 50, 100];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: number) => {
    setItemsPerPage(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-secondary shadow-sm px-4 py-2 bg-background text-sm font-medium text-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 "
          onClick={toggleDropdown}
        >
          {itemsPerPage} / page
          <ChevronDownIcon
            className={cn(
              'h-5 w-5 ml-2 transition-transform duration-300',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map(option => (
              <button
                key={option}
                className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-primary focus:bg-secondary focus:outline-none"
                onClick={() => handleOptionClick(option)}
              >
                {option} / page
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationDropdown;
