import { useState } from 'react';

import { useFetchUsers } from '../../../hooks/useFetchUsers';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import Avatar from '../Avatar';
import { Card, CardContent, CardFooter, CardTitle } from '../Card';
import FilteredSearch from '../FilteredSearch';
import Pagination from '../Pagination';
import SelectBox from '../SelectBox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../Table';

const ITEMS_PER_PAGE = 100;
const TOTAL_ITEMS = 1600;

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ gender: string | null }>({
    gender: null,
  });

  const { data, isLoading, isError } = useFetchUsers(
    currentPage,
    ITEMS_PER_PAGE,
    searchQuery,
    filters,
  );

  const handleSearch = (
    query: string,
    appliedFilters: { gender: string | null },
  ) => {
    setSearchQuery(query);
    setFilters(appliedFilters);
    setCurrentPage(1);
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching users.</p>;

  if (!data) return null;

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <CardTitle className="self-start">Customers</CardTitle>

      <Card className="w-full px-card-padding pt-card-padding bg-background">
        <CardContent className="flex flex-col gap-4">
          <FilteredSearch onSearch={handleSearch} />
          <div className="h-80 border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Gender</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((user, index) => (
                  <TableRow
                    key={user.login.username}
                    className={index % 2 === 0 ? 'bg-primary' : ''}
                  >
                    <TableCell>
                      <SelectBox
                        value={user.name.first}
                        onChange={() => console.log('Checked')}
                        checked={false}
                        id={`select-${user.login.salt}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {user.login.salt}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar
                          src={user.picture.thumbnail}
                          alt={user.name.first}
                          fallback={user.name.first}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text">
                            {user.name.first}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.location.country}</TableCell>
                    <TableCell>{capitalizeFirstLetter(user.gender)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <CardFooter className="flex justify-between">
            <p className="text-text text-sm">
              Page {currentPage} of {totalPages}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTable;
