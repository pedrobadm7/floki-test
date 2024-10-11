import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 5;
const FIRST_PAGE = 1;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [expanded, setExpanded] = useState(false);

  const handlePrevious = () => {
    if (currentPage > FIRST_PAGE) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handleExpand = () => {
    setExpanded(true);
  };

  const getVisiblePages = () => {
    const pages = [];

    if (expanded) {
      // Expande e exibe todas as páginas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(MAX_VISIBLE_PAGES / 2);
      let start = Math.max(currentPage - half, 1);
      const end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages);

      if (end - start < MAX_VISIBLE_PAGES - 1) {
        start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
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

      {visiblePages.map(page => (
        <button
          key={page}
          className={`px-3 py-1 rounded-md border border-gray-300 ${
            currentPage === page ? 'bg-gray-200' : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {!expanded &&
        totalPages > MAX_VISIBLE_PAGES &&
        visiblePages[visiblePages.length - 1] < totalPages && (
          <button
            className="px-3 py-1 rounded-md border border-gray-300"
            onClick={handleExpand}
          >
            ...
          </button>
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
  );
};

export default Pagination;
