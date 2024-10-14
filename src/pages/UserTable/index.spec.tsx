import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useFetchUsers } from '../../hooks/useFetchUsers';
import { useUserActions } from '../../hooks/useUserActions';
import userMock from '../../test/userMock';

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
  it('should render the table with users', async () => {
    render(<UserTable />);

    const user1 = await screen.findByText('User One');
    const user2 = await screen.findByText('User Two');

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });

  it('should show loading state', () => {
    vi.mocked(useFetchUsers).mockReturnValue({
      data: [
        {
          gender: 'female',
          name: {
            title: 'Mrs',
            first: 'Fabiola',
            last: 'Armas',
          },
          location: {
            street: {
              number: 447,
              name: 'Peatonal Jalisco',
            },
            city: 'San Pedro',
            state: 'Durango',
            country: 'Mexico',
            postcode: 44688,
            coordinates: {
              latitude: '21.6057',
              longitude: '12.7056',
            },
            timezone: {
              offset: '-1:00',
              description: 'Azores, Cape Verde Islands',
            },
          },
          email: 'fabiola.armas@example.com',
          login: {
            uuid: '60960bb4-677e-4c9c-98f9-e437c97d103e',
            username: 'purpleswan352',
            password: 'willie',
            salt: 'CD6UIVYG',
            md5: '1a9cb89034b121c93b13439263eb258c',
            sha1: '638e032745edbf5dfaad666ea76d31f86fa84387',
            sha256:
              '3a48b671e119081db4fef6d410d262e35ab13397123e99bfd717dcec4c2316a1',
          },
          dob: {
            date: '1956-11-15T12:16:15.271Z',
            age: 67,
          },
          registered: {
            date: '2011-08-02T22:58:48.703Z',
            age: 13,
          },
          phone: '(664) 800 2985',
          cell: '(651) 651 4856',
          id: {
            name: 'NSS',
            value: '60 81 16 4326 4',
          },
          picture: {
            large: 'https://randomuser.me/api/portraits/women/74.jpg',
            medium: 'https://randomuser.me/api/portraits/med/women/74.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/women/74.jpg',
          },
          nat: 'MX',
        },
      ],
      isLoading: true,
      isError: false,
    });

    render(<UserTable />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error message when fetching fails', () => {
    vi.mocked(useFetchUsers).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    render(<UserTable />);

    expect(screen.getByText('Error fetching users.')).toBeInTheDocument();
  });

  it('should allow selecting users', async () => {
    const mockSelectUser = vi.fn();

    vi.mocked(useFetchUsers).mockReturnValue({
      data: [userMock],
      isLoading: false,
      isError: false,
    });

    vi.mocked(useUserActions).mockReturnValue({
      selectedUsers: [],
      removedUsers: [],
      selectUser: mockSelectUser,
      deselectUser: vi.fn(),
      removeSelectedUsers: vi.fn(),
    });

    render(<UserTable />);

    const checkbox = await screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockSelectUser).toHaveBeenCalledWith(
      '60960bb4-677e-4c9c-98f9-e437c97d103e',
    );
  });

  it('should allow removing  selected users', async () => {
    const mockRemoveSelectedUsers = vi.fn();

    vi.mocked(useFetchUsers).mockReturnValue({
      data: [userMock],
      isLoading: false,
      isError: false,
    });

    vi.mocked(useUserActions).mockReturnValue({
      selectedUsers: ['60960bb4-677e-4c9c-98f9-e437c97d103e'],
      removedUsers: [],
      selectUser: vi.fn(),
      deselectUser: vi.fn(),
      removeSelectedUsers: mockRemoveSelectedUsers,
    });

    render(<UserTable />);

    const removeButton = screen.getByText('Remove Selected Users');
    fireEvent.click(removeButton);

    expect(mockRemoveSelectedUsers).toHaveBeenCalled();
  });
});
