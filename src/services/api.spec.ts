import { describe, expect, it, vi } from 'vitest';

import { fetchUsers } from './api';
import http from './http';

vi.mock('./http', async () => {
  const actual = await vi.importActual<typeof import('./http')>('./http');
  return {
    ...actual,
    default: {
      get: vi.fn(),
    },
  };
});

describe('fetchUsers', () => {
  const mockUsers = [
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Fabiolo',
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
      email: 'fabiolo.armas@example.com',
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
    {
      gender: 'female',
      name: {
        title: 'Miss',
        first: 'Estela',
        last: 'Véliz',
      },
      location: {
        street: {
          number: 3427,
          name: 'Corredor Sur Arevalo',
        },
        city: 'Singuilucan',
        state: 'Morelos',
        country: 'Mexico',
        postcode: 21443,
        coordinates: {
          latitude: '5.4368',
          longitude: '-120.1107',
        },
        timezone: {
          offset: '+5:00',
          description: 'Ekaterinburg, Islamabad, Karachi, Tashkent',
        },
      },
      email: 'estela.veliz@example.com',
      login: {
        uuid: '8a1aef01-1e81-47f8-89bc-2f87892e9f10',
        username: 'goldenladybug499',
        password: 'stones',
        salt: 'l8SdnxfU',
        md5: '1e52703a4f636ebbf8c67cf642d109e4',
        sha1: 'b70975bc59ce650de3524b2249223adb76795ad8',
        sha256:
          'b147521bba3e2f7c46968f8c8e2efe37b2bdcf2da0b15ff36356f0b9a656fcf7',
      },
      dob: {
        date: '1967-03-11T21:14:53.380Z',
        age: 57,
      },
      registered: {
        date: '2006-01-15T07:47:30.902Z',
        age: 18,
      },
      phone: '(607) 480 3483',
      cell: '(690) 337 7002',
      id: {
        name: 'NSS',
        value: '94 07 95 4592 7',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/50.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/50.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/50.jpg',
      },
      nat: 'MX',
    },
  ];

  it('should fetch users without filters and search query', async () => {
    vi.mocked(http.get).mockResolvedValue({
      data: { results: mockUsers },
    });

    const users = await fetchUsers(1, 10, '', { gender: null });

    expect(users).toEqual(mockUsers);
    expect(http.get).toHaveBeenCalledWith(
      '/?page=1&results=10&seed=custom_seed',
    );
  });

  it('should filter users by gender', async () => {
    vi.mocked(http.get).mockResolvedValue({
      data: { results: mockUsers },
    });

    const users = await fetchUsers(1, 10, '', { gender: 'female' });

    expect(users).toEqual([mockUsers[1]]);
    expect(http.get).toHaveBeenCalledWith(
      '/?page=1&results=10&seed=custom_seed',
    );
  });

  it('should filter users by search query', async () => {
    vi.mocked(http.get).mockResolvedValue({
      data: { results: mockUsers },
    });

    const users = await fetchUsers(1, 10, 'fabiolo', { gender: null });

    expect(users).toEqual([mockUsers[0]]);
    expect(http.get).toHaveBeenCalledWith(
      '/?page=1&results=10&seed=custom_seed',
    );
  });

  it('should filter users by both gender and search query', async () => {
    vi.mocked(http.get).mockResolvedValue({
      data: { results: mockUsers },
    });

    const users = await fetchUsers(1, 10, 'Estela', { gender: 'female' });

    expect(users).toEqual([mockUsers[1]]);
    expect(http.get).toHaveBeenCalledWith(
      '/?page=1&results=10&seed=custom_seed',
    );
  });
});
