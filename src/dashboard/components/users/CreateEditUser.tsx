import { useContext, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { CreateUpdateUser, User } from '../../interfaces';
import { UsersContext } from '../../../context';

interface Props {
  user: User;
  onFinished(user: CreateUpdateUser | undefined): void;
}

export const CreateEditUser = ({ user, onFinished }: Props) => {
  const [editedUser, setEditedUser] = useState<CreateUpdateUser>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: Number(user.phone),
    role: user.role?.id,
  });
  const { roles } = useContext(UsersContext);

  return (
    <Modal
      open={user !== undefined}
      onClose={() => onFinished(undefined)}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          maxWidth: '90%',
          width: '650px',
          padding: '30px',
          borderRadius: '10px',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            fontSize: '1.4rem',
            fontWeight: 600,
          }}
        >
          {user.id ? 'Editar' : 'Crear'} usuario
        </Typography>
        <Box sx={{ marginTop: '2rem' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFinished(editedUser);
            }}
            style={{
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <TextField
              value={editedUser.firstName}
              onChange={(e) =>
                setEditedUser({
                  ...editedUser,
                  firstName: e.target.value,
                })
              }
              name="firstName"
              type="text"
              label="Nombre"
              variant="filled"
            />
            <TextField
              value={editedUser.lastName}
              onChange={(e) =>
                setEditedUser({
                  ...editedUser,
                  lastName: e.target.value,
                })
              }
              name="lastName"
              type="text"
              label="Apellido"
              variant="filled"
            />
            <TextField
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({
                  ...editedUser,
                  email: e.target.value,
                })
              }
              name="email"
              type="email"
              label="Correo electrónico"
              variant="filled"
            />
            <TextField
              value={editedUser.phone}
              onChange={(e) =>
                setEditedUser({
                  ...editedUser,
                  phone: Number(e.target.value),
                })
              }
              name="phone"
              type="number"
              label="Teléfono"
              variant="filled"
            />
            <FormControl sx={{ width: '100%', marginTop: '20px' }} size="small">
              <InputLabel color="secondary" id="actividad-select">
                Rol
              </InputLabel>
              <Select
                label="Rol"
                value={user.role?.id}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, role: Number(e.target.value) })
                }
              >
                {roles().map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">
              {user.id ? 'Editar' : 'Crear'}
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
