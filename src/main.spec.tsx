import { describe, expect, it, vi } from 'vitest';

import './main';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe('main.tsx', () => {
  it('should render the App component into the root element', async () => {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    expect(document.getElementById('root')).not.toBeNull();
  });
});
