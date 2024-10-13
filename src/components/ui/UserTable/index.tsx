import { useState } from 'react';

import { useFetchUsers } from '../../../hooks/useFetchUsers';
import useUserStore from '../../../store';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { cn } from '../../../utils/cn';
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
  const [filters, setFilters] = useState<{ gender: string | null }>({
    gender: null,
  });

  const selectedUsers = useUserStore(state => state.selectedUsers);
  const removedUsers = useUserStore(state => state.removedUsers);
  const selectUser = useUserStore(state => state.selectUser);
  const deselectUser = useUserStore(state => state.deselectUser);
  const removeSelectedUsers = useUserStore(state => state.removeSelectedUsers);

  console.log({ selectedUsers, removedUsers });

  const {
    data: users,
    isLoading,
    isError,
  } = useFetchUsers(currentPage, itemsPerPage, searchQuery, filters);

  const handleSearch = (
    query: string,
    appliedFilters: { gender: string | null },
  ) => {
    setSearchQuery(query);
    setFilters(appliedFilters);
  };

  const handleCheckedChange = (id: string, checked: boolean) => {
    if (checked) {
      selectUser(id);
    } else {
      deselectUser(id);
    }
  };

  const handleRemoveSelectedUsers = () => {
    if (selectedUsers.length > 0) {
      removeSelectedUsers();
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching users.</p>;

  if (!users) return null;

  const visibleUsers = users.filter(
    user => !removedUsers.includes(user.login.uuid),
  );

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-2">
      <CardTitle className="self-start">Customers</CardTitle>

      <Card className="w-full px-card-padding pt-card-padding bg-background">
        <CardContent className="flex flex-col gap-4">
          <FilteredSearch onSearch={handleSearch} />
          <div className="h-96 border rounded-md overflow-x-auto">
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
                {visibleUsers.map(user => (
                  <TableRow
                    key={user.login.username}
                    className="border border-secodnary"
                  >
                    <TableCell>
                      <Checkbox
                        id={user.login.uuid}
                        checked={selectedUsers.includes(user.login.uuid)}
                        onCheckedChange={checked =>
                          handleCheckedChange(user.login.uuid, checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      ID{user.login.salt.toUpperCase()}
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

          <CardFooter className="flex flex-col items-start">
            <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalPages={totalPages}
              setItemsPerPage={setItemsPerPage}
              onPageChange={setCurrentPage}
            />
            <button
              className={cn(
                'mt-4 px-4 py-2 bg-red-500 text-white rounded-md',
                !selectedUsers.length && 'bg-red-300',
              )}
              onClick={handleRemoveSelectedUsers}
              disabled={!selectedUsers.length}
            >
              Remove Selected Users
            </button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTable;
