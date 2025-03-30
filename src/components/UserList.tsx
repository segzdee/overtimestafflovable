import React, { useMemo } from 'react';
import { User } from '../types/User';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = React.memo(({ users }) => {
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  return (
    <ul>
      {sortedUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
});

export default UserList;
