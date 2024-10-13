import { useEffect, useState } from 'react';

import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { BREAKPOINTS } from '../../../utils/breakpoints';
import { cn } from '../../../utils/cn';
import PaginationDropdown from '../PaginationDropdown';

interface PaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  setItemsPerPage: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 5;
const FIRST_PAGE = 1;

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  currentPage,
  totalPages,
  onPageChange,
  setItemsPerPage,
}) => {
  const [rangeStart, setRangeStart] = useState(1);

  const isTabletOrGreater = useMediaQuery(BREAKPOINTS.sm);

  useEffect(() => {
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let newRangeStart = rangeStart;

    if (currentPage === rangeStart + MAX_VISIBLE_PAGES - 1) {
      newRangeStart = Math.min(
        currentPage + 1 - half,
        totalPages - MAX_VISIBLE_PAGES + 1,
      );
    } else if (currentPage >= rangeStart + MAX_VISIBLE_PAGES) {
      newRangeStart = Math.min(
        currentPage - half,
        totalPages - MAX_VISIBLE_PAGES + 1,
      );
    } else if (currentPage < rangeStart) {
      newRangeStart = Math.max(currentPage - half, 1);
    }

    setRangeStart(newRangeStart);
  }, [currentPage, rangeStart, totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleFirstPage = () => {
    onPageChange(1);
    setRangeStart(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
    setRangeStart(totalPages - MAX_VISIBLE_PAGES + 1);
  };

  const getVisiblePages = () => {
    const pages = [];
    const rangeEnd = Math.min(rangeStart + MAX_VISIBLE_PAGES - 1, totalPages);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-end md:items-center gap-5 md:gap-0">
      <p className="text-text text-sm hidden md:block">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center justify-center space-x-2 ">
        <button
          className="px-3 py-1 bg-secondary text-text rounded-md border border-secondary"
          disabled={currentPage === FIRST_PAGE}
          onClick={handleFirstPage}
        >
          &laquo;
        </button>

        <button
          className="px-3 py-1 rounded-md border border-border"
          onClick={handlePrevious}
          disabled={currentPage === FIRST_PAGE}
        >
          &lsaquo;
        </button>

        {isTabletOrGreater ? (
          <>
            {visiblePages.map(page => (
              <button
                key={page}
                className={cn(
                  'px-3 py-1 rounded-md border border-gray-300',
                  currentPage === page ? 'bg-secondary' : '',
                )}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
          </>
        ) : (
          <span className="text-sm px-3 py-1 rounded-md border border-gray-300">
            {currentPage}
          </span>
        )}

        {rangeStart + MAX_VISIBLE_PAGES - 1 < totalPages && (
          <span className="px-3 py-1">...</span>
        )}

        <button
          className="px-3 py-1 rounded-md border border-gray-300"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          &rsaquo;
        </button>

        <button
          className="px-3 py-1 rounded-md border border-gray-300"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
      <PaginationDropdown
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
};

export default Pagination;
