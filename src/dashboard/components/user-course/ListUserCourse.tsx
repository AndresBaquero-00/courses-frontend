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
import { UserCourse } from '../../interfaces';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

interface Props {
  courses: UserCourse[];
  actionInCourse(course: UserCourse, action: 'edit' | 'delete'): void;
}

export const ListUserCourse = ({ courses, actionInCourse }: Props) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: '300px' }}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, i) => (
              <TableRow
                key={course.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>{course.course.name}</TableCell>
                <TableCell>
                  {course.user.firstName + ' ' + course.user.lastName}
                </TableCell>
                <TableCell>{course.inscriptionStatus.name}</TableCell>
                <TableCell>{course.createdAt.split('T')[0]}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                    <IconButton
                      size="small"
                      onClick={() => actionInCourse(course, 'edit')}
                    >
                      <EditRounded sx={{ width: '0.7em', height: '0.7em' }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => actionInCourse(course, 'delete')}
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
