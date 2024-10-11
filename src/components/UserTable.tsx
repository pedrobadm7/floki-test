import { useFetchUsers } from '../hooks/useFetchUsers';
import { User } from '../interfaces/Users';

const UserTable = () => {
  const { data, isError, isLoading } = useFetchUsers();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data...</p>;

  if (!data) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {}
        {data.map((user: User) => (
          <tr key={user.login.uuid}>
            <td>{`${user.name.first} ${user.name.last}`}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>{user.location.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
