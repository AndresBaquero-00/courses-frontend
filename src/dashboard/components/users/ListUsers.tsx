import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from '@mui/material';
import { User } from '../../interfaces';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

interface Props {
  users: User[];
  actionInUser(user: User, action: 'edit' | 'delete'): void;
}

export const ListUsers = ({ users, actionInUser }: Props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.createdAt.split('T')[0]}</TableCell>
                <TableCell>{user.role.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                    <IconButton
                      size="small"
                      onClick={() => actionInUser(user, 'edit')}
                    >
                      <EditRounded sx={{ width: '0.7em', height: '0.7em' }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => actionInUser(user, 'delete')}
                    >
                      <DeleteRounded sx={{ width: '0.7em', height: '0.7em' }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
