import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import OfflinePage from '.';

describe('OfflinePage Component', () => {
  it('renders correctly', () => {
    render(<OfflinePage />);

    expect(screen.getByText(/You're offline/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please check your internet connection/i),
    ).toBeInTheDocument();

    const retryButton = screen.getByRole('button', {
      name: /Retry Connection/i,
    });
    expect(retryButton).toBeInTheDocument();
  });

  it('reloads the page when the "Retry Connection" button is clicked', () => {
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: {
        reload: mockReload,
      },
      writable: true,
    });

    render(<OfflinePage />);

    const retryButton = screen.getByRole('button', {
      name: /Retry Connection/i,
    });

    fireEvent.click(retryButton);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });
});
