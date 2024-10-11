interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        className="px-4 py-2 bg-secondary text-text rounded-md"
        disabled={currentPage === 1}
        onClick={handlePrevious}
      >
        Previous
      </button>

      <span className="text-text">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="px-4 py-2 bg-secondary text-text rounded-md"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
