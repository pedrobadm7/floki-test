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
  });

  if (filters.gender) {
    params.append('gender', filters.gender);
  }

  const { data } = await http.get(`/?${params.toString()}`);

  const { results } = data;

  if (searchQuery) {
    return results.filter((user: User) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }

  return results;
};
