import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { User } from '../interfaces/Users';
import { fetchUsers } from '../services/api';
import { QueryKey } from '../utils/keys';

export const useFetchUsers = (
  page: number,
  itemsPerPage: number,
  searchQuery: string,
  filters: { gender: string | null },
) => {
  const { data, isLoading, isError, refetch } = useQuery<User[]>({
    queryKey: [QueryKey.USERS, page, itemsPerPage, searchQuery, filters],
    queryFn: () => fetchUsers(page, itemsPerPage, searchQuery, filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  return { data, isLoading, isError, refetch };
};
