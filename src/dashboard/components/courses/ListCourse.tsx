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
import { Course } from '../../interfaces';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

interface Props {
  courses: Course[];
  actionInCourse(course: Course, action: 'edit' | 'delete'): void;
}

export const ListCourse = ({ courses, actionInCourse }: Props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Duración</TableCell>
              <TableCell>Cuota</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Modalidad</TableCell>
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
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.couta}</TableCell>
                <TableCell>{course.createdAt.split('T')[0]}</TableCell>
                <TableCell>{course.category.name}</TableCell>
                <TableCell>{course.modality.name}</TableCell>
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
