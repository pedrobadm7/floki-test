import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import App from './App';
import useOnlineStatus from './hooks/useOnlineStatus';

vi.mock('./hooks/useOnlineStatus', () => ({
  default: vi.fn(),
}));

describe('App Component', () => {
  it('should render UserTable within QueryClientProvider', async () => {
    vi.mocked(useOnlineStatus).mockReturnValue(true);

    render(<App />);

    const userTableElement = await screen.findByTestId('user-table-title');
    expect(userTableElement).toBeInTheDocument();
  });

  it('should render OfflinePage when offline', async () => {
    vi.mocked(useOnlineStatus).mockReturnValue(false);

    render(<App />);

    const offlinePageElement = await screen.getByTestId('offline-page');
    expect(offlinePageElement).toBeInTheDocument();
  });
});
