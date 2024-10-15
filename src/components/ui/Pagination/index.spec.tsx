import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from '../../../hooks/useMediaQuery';

import Pagination from '.';

vi.mock('../../../hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

describe('Pagination Component', () => {
  const defaultProps = {
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
    setItemsPerPage: vi.fn(),
  };

  it('renders the pagination component', () => {
    render(<Pagination {...defaultProps} />);

    const firstButton = screen.getByTestId('chevrons-left');
    const previousButton = screen.getByTestId('chevron-left-icon');
    const nextButton = screen.getByTestId('chevron-right-icon');
    const lastButton = screen.getByTestId('chevrons-right');

    expect(firstButton).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();
  });

  it('disables the first and previous buttons on the first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const firstButton = screen.getByTestId('chevrons-left');
    const previousButton = screen.getByTestId('chevron-left-icon');

    console.log({ firstButton, previousButton });

    expect(firstButton).toBeDisabled();
    expect(previousButton).toBeDisabled();
  });

  it('disables the next and last buttons on the last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);

    const nextButton = screen.getByTestId('chevron-right-icon');
    const lastButton = screen.getByTestId('chevrons-right');

    expect(nextButton).toBeDisabled();
    expect(lastButton).toBeDisabled();
  });

  it('calls onPageChange when clicking next, previous, first, and last buttons', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const firstButton = screen.getByTestId('chevrons-left');
    const previousButton = screen.getByTestId('chevron-left-icon');
    const nextButton = screen.getByTestId('chevron-right-icon');
    const lastButton = screen.getByTestId('chevrons-right');

    fireEvent.click(firstButton);
    fireEvent.click(previousButton);
    fireEvent.click(nextButton);
    fireEvent.click(lastButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(6);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(10);
  });

  it('renders page numbers correctly when media query matches for tablet or greater', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);

    render(<Pagination {...defaultProps} currentPage={5} />);

    const pageButtons = screen.getAllByRole('button');

    expect(pageButtons).toHaveLength(10);
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('renders only the current page number when media query is for mobile', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);

    render(<Pagination {...defaultProps} currentPage={3} />);

    const currentPageText = screen.getByText('3');
    expect(currentPageText).toBeInTheDocument();
    expect(currentPageText.tagName).toBe('SPAN');
  });

  it('shows ellipsis when there are more pages available', () => {
    render(<Pagination {...defaultProps} currentPage={5} totalPages={20} />);

    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
