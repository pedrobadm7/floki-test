import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useOnlineStatus from './useOnlineStatus';

describe('useOnlineStatus', () => {
  it('should return true when online and false when offline', () => {
    const { result } = renderHook(() => useOnlineStatus());

    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current).toBe(false);

    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current).toBe(true);
  });
});
