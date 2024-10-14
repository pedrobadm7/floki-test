import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import UserTable from '.';

vi.mock('../../hooks/useFetchUsers', () => ({
  useFetchUsers: vi.fn().mockReturnValue({
    data: [
      {
        login: { uuid: '1', username: 'userone', salt: 'asd' },
        name: { first: 'User One' },
        email: 'userone@example.com',
        location: { country: 'USA' },
        gender: 'Male',
        picture: { thumbnail: 'user1.jpg' },
      },
      {
        login: { uuid: '2', username: 'usertwo', salt: 'opdas' },
        name: { first: 'User Two' },
        email: 'usertwo@example.com',
        location: { country: 'UK' },
        gender: 'Female',
        picture: { thumbnail: 'user2.jpg' },
      },
    ],
    isLoading: false,
    isError: false,
  }),
}));

vi.mock('../../hooks/useUserActions', () => ({
  useUserActions: vi.fn().mockReturnValue({
    selectedUsers: [],
    removedUsers: [],
    selectUser: vi.fn(),
    deselectUser: vi.fn(),
    removeSelectedUsers: vi.fn(),
  }),
}));

vi.mock('../../hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn().mockReturnValue(true),
}));

describe('UserTable Component', () => {
  beforeEach(() => {});

  it('should render the table with users', async () => {
    render(<UserTable />);

    const user1 = await screen.findByText('User One');
    const user2 = await screen.findByText('User Two');

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });
});
