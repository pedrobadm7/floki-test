import { useState } from 'react';

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
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
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
