import { useState } from 'react';

import { useFetchUsers } from '../../../hooks/useFetchUsers';
import Avatar from '../Avatar';
import Checkbox from '../Checkbox';
import Pagination from '../Pagination';
import Table from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableCell from '../Table/TableCell';
import TableHead from '../Table/TableHead';
import TableHeader from '../Table/TableHeader';
import TableRow from '../Table/TableRow';

const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 1160;

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useFetchUsers(
    currentPage,
    ITEMS_PER_PAGE,
  );

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching users.</p>;

  if (!data) return null;

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  return (
    <div className="w-full overflow-auto">
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
              className={index % 2 === 0 ? 'bg-secondary' : ''}
            >
              <TableCell>
                <Checkbox id={`select-${user.login.salt}`} />
              </TableCell>
              <TableCell className="font-medium">{user.login.salt}</TableCell>
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
              <TableCell>{user.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserTable;
