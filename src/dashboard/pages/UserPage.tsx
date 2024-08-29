import { useContext, useState } from 'react';
import { Box, Button } from '@mui/material';

import { UsersContext } from '../../context';
import { ListUsers } from '../components/users/ListUsers';
import { CreateEditUser } from '../components/users/CreateEditUser';
import { CreateUpdateUser, User } from '../interfaces';

export const UserPage = () => {
  const { users, createEditUser, deleteUser } = useContext(UsersContext);
  const [selectedUser, setSelectedUser] = useState<User>();

  const onAction = (user: User, action: 'edit' | 'delete') => {
    if (action === 'edit') {
      setSelectedUser(user);
      return;
    }

    deleteUser(user.id).then(() => {
      users(true);
      setSelectedUser(undefined);
    });
  };

  const onFinishedAction = async (user: CreateUpdateUser | undefined) => {
    if (user !== undefined) {
      const res = await createEditUser(selectedUser?.id ?? -1, user);
      if (typeof res === 'string') {
        alert(res);
      } else {
        users(true);
      }
    }
    setSelectedUser(undefined);
  };

  return (
    <Box
      sx={{
        width: '80%',
        maxWidth: '1000px',
        margin: '0 auto',
        maxHeight: '400px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row-reverse',
          marginBottom: '1rem',
        }}
      >
        <Button variant="contained" onClick={() => setSelectedUser({} as User)}>
          Crear usuario
        </Button>
      </Box>
      <ListUsers users={users()} actionInUser={onAction} />
      {selectedUser && (
        <CreateEditUser user={selectedUser} onFinished={onFinishedAction} />
      )}
    </Box>
  );
};
