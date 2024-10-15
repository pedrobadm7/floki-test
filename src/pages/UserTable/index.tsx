import { useState } from 'react';

import Avatar from '../../components/ui/Avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '../../components/ui/Card';
import Checkbox from '../../components/ui/CheckBox';
import FilteredSearch from '../../components/ui/FilteredSearch';
import Loading from '../../components/ui/Loading';
import Pagination from '../../components/ui/Pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table';
import { useFetchUsers } from '../../hooks/useFetchUsers';
import { useUserActions } from '../../hooks/useUserActions';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { cn } from '../../utils/cn';

const ITEMS_PER_PAGE = 100;
const TOTAL_ITEMS = 1600;
const INITIAL_PAGE = 1;

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [filters, setFilters] = useState<{ gender: string | null }>({
    gender: null,
  });

  const {
    selectedUsers,
    removedUsers,
    selectUser,
    deselectUser,
    removeSelectedUsers,
  } = useUserActions();

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

  if (isLoading)
    return (
      <div className="flex flex-1 justify-center items-center ">
        <Loading />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">Error fetching users.</p>;

  if (!users) return null;

  const visibleUsers = users.filter(
    user => !removedUsers.includes(user.login.uuid),
  );

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-2">
      <CardTitle className="self-start" data-testid="user-table-title">
        Customers
      </CardTitle>

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

          <CardFooter className="flex flex-col md:items-start items-end">
            <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalPages={totalPages}
              setItemsPerPage={setItemsPerPage}
              onPageChange={setCurrentPage}
            />
            <button
              className={cn(
                ' mt-4 px-4 py-2 bg-red-500 text-white rounded-md',
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
