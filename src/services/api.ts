import { User } from '../interfaces/Users';

import http from './http';

export const fetchUsers = async (
  page: number,
  itemsPerPage: number,
): Promise<User[]> => {
  const { data } = await http.get(
    `/?page=${page}&results=${itemsPerPage}&seed=abc`,
  );

  const { results } = data;

  return results;
};
