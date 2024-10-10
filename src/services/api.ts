import { User } from '../interfaces/Users';

import http from './http';

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await http.get('/?results=10');
  const { results } = data;

  return results;
};
