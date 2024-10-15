import { renderHook } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery Hook', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(min-width: 600px)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  it('should return true when the media query matches', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current).toBe(true);
  });

  it('should return false when the media query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 800px)'));

    expect(result.current).toBe(false);
  });

  it('should update the state when the media query changes', () => {
    const matchMediaMock = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: vi.fn((_, callback) => {
        callback({ matches: true });
      }),
      removeEventListener: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });

    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current).toBe(false);
  });
});
