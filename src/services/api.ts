import { User } from '../interfaces/Users';

import http from './http';

export const fetchUsers = async (
  page: number,
  itemsPerPage: number,
  searchQuery: string = '',
  filters: { gender: string | null },
): Promise<User[]> => {
  const params = new URLSearchParams({
    page: page.toString(),
    results: itemsPerPage.toString(),
    seed: 'custom_seed',
  });

  const { data } = await http.get(`/?${params.toString()}`);

  let { results } = data;

  if (filters.gender) {
    results = results.filter((user: User) => user.gender === filters.gender);
  }

  if (searchQuery) {
    results = results.filter((user: User) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }

  return results;
};
