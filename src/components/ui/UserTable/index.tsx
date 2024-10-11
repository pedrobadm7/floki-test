import { useFetchUsers } from '../../../hooks/useFetchUsers';
import Avatar from '../Avatar';
import Checkbox from '../Checkbox';
import Table from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableCell from '../Table/TableCell';
import TableHead from '../Table/TableHead';
import TableHeader from '../Table/TableHeader';
import TableRow from '../Table/TableRow';

const UserTable = () => {
  const { data, isLoading, isError } = useFetchUsers();

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching users.</p>;

  if (!data) return null;

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
              key={user.id.value}
              className={index % 2 === 0 ? 'bg-gray-50' : ''}
            >
              <TableCell>
                <Checkbox id={`select-${user.id.value}`} />
              </TableCell>
              <TableCell className="font-medium">{user.id.value}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Avatar
                    src={user.picture.thumbnail}
                    alt={user.name.first}
                    fallback={user.name.first}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
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
    </div>
  );
};

export default UserTable;
