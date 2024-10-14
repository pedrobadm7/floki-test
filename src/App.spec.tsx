import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App Component', () => {
  it('should render UserTable within QueryClientProvider', async () => {
    render(<App />);

    const userTableElement = await screen.findByText(/Customers/i);
    expect(userTableElement).toBeInTheDocument();
  });
});
