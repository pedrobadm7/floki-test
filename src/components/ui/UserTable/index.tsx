import { useState } from 'react';

import { useFetchUsers } from '../../../hooks/useFetchUsers';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import Avatar from '../Avatar';
import { Card, CardContent, CardFooter, CardTitle } from '../Card';
import Checkbox from '../CheckBox';
import FilteredSearch from '../FilteredSearch';
import Pagination from '../Pagination';
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
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ gender: string | null }>({
    gender: null,
  });

  console.log({ selectedUsers });

  const { data, isLoading, isError } = useFetchUsers(
    currentPage,
    itemsPerPage,
    searchQuery,
    filters,
  );

  const handleSearch = (
    query: string,
    appliedFilters: { gender: string | null },
  ) => {
    setSearchQuery(query);
    setFilters(appliedFilters);
  };

  const handleCheckedChange = (id: string, checked: boolean) => {
    setSelectedUsers(prevSelected => {
      if (checked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter(userId => userId !== id);
      }
    });
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching users.</p>;

  if (!data) return null;

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-2">
      <CardTitle className="self-start">Customers</CardTitle>

      <Card className="w-full px-card-padding pt-card-padding bg-background">
        <CardContent className="flex flex-col gap-4">
          <FilteredSearch onSearch={handleSearch} />
          <div className="h-80 border rounded-md overflow-x-auto">
            <Table>
              <TableHeader className="border  border-secondary">
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
                {data.map(user => (
                  <TableRow
                    key={user.login.username}
                    className="border border-secodnary"
                  >
                    <TableCell>
                      <Checkbox
                        id={user.login.salt}
                        checked={selectedUsers.includes(user.login.salt)}
                        onCheckedChange={checked =>
                          handleCheckedChange(user.login.salt, checked)
                        }
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

          <CardFooter>
            <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalPages={totalPages}
              setItemsPerPage={setItemsPerPage}
              onPageChange={setCurrentPage}
            />
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTable;
