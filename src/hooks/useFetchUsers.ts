import { useQuery } from '@tanstack/react-query';

import { User } from '../interfaces/Users';
import { fetchUsers } from '../services/api';

export const useFetchUsers = () => {
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  return { data, isLoading, isError };
};
