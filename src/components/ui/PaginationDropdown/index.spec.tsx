import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import PaginationDropdown from '.';

describe('PaginationDropdown Component', () => {
  const defaultProps = {
    itemsPerPage: 20,
    setItemsPerPage: vi.fn(),
  };

  it('should render with the correct initial label', () => {
    render(<PaginationDropdown {...defaultProps} />);

    const button = screen.getByRole('button', { name: /20 \/ page/i });
    expect(button).toBeInTheDocument();
  });

  it('should open the dropdown when clicking the button', () => {
    render(<PaginationDropdown {...defaultProps} />);

    const button = screen.getByRole('button', { name: /20 \/ page/i });
    fireEvent.click(button);

    const option = screen.getByText(/5 \/ page/i);
    expect(option).toBeInTheDocument();
  });

  it('should close the dropdown after an option is selected', () => {
    render(<PaginationDropdown {...defaultProps} />);

    const button = screen.getByRole('button', { name: /20 \/ page/i });
    fireEvent.click(button);

    const option = screen.getByText(/5 \/ page/i);
    fireEvent.click(option);

    expect(defaultProps.setItemsPerPage).toHaveBeenCalledWith(5);
    expect(screen.queryByText(/5 \/ page/i)).not.toBeInTheDocument();
  });

  it('should call setItemsPerPage with the correct value when an option is selected', () => {
    render(<PaginationDropdown {...defaultProps} />);

    const button = screen.getByRole('button', { name: /20 \/ page/i });
    fireEvent.click(button);

    const option = screen.getByText(/50 \/ page/i);
    fireEvent.click(option);

    expect(defaultProps.setItemsPerPage).toHaveBeenCalledWith(50);
  });

  it('should toggle the dropdown visibility when the button is clicked', () => {
    render(<PaginationDropdown {...defaultProps} />);

    const button = screen.getByRole('button', { name: /20 \/ page/i });
    fireEvent.click(button);

    expect(screen.getByText(/5 \/ page/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText(/5 \/ page/i)).not.toBeInTheDocument();
  });
});
