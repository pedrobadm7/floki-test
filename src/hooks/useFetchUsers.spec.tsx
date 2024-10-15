import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { fetchUsers } from '../services/api';
import userMock from '../test/userMock';

import { useFetchUsers } from './useFetchUsers';

vi.mock('../services/api', () => ({
  fetchUsers: vi.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchUsers', () => {
  const mockUsers = [userMock];
  it('should fetch users successfully', async () => {
    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);

    const { result } = renderHook(
      () => useFetchUsers(1, 10, '', { gender: null }),
      { wrapper },
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockUsers);
    expect(result.current.isError).toBe(false);
  });
});
