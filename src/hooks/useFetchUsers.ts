import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { User } from '../interfaces/Users';
import { fetchUsers } from '../services/api';
import { QueryKey } from '../utils/keys';

export const useFetchUsers = (page: number, itemsPerPage: number) => {
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: [QueryKey.USERS, page],
    queryFn: () => fetchUsers(page, itemsPerPage),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { data, isLoading, isError };
};
