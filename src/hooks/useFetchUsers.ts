import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const { data } = await axios.get('https://randomuser.me/api/?results=10');
  return data.results;
};

export const useFetchUsers = () => {
  const { data } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  return data;
};
