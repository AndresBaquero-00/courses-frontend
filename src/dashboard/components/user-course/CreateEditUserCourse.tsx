import { useContext, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';

import { CreateUpdateUserCourse, UserCourse } from '../../interfaces';
import { CoursesContext } from '../../../context/CourseContext';
import { UsersContext } from '../../../context';

interface Props {
  course: UserCourse;
  onFinished(user: CreateUpdateUserCourse | undefined): void;
}

export const CreateEditCourse = ({ course, onFinished }: Props) => {
  const [editedCourse, setEditedCourse] = useState<CreateUpdateUserCourse>({
    course: course.course?.id,
    user: course.user?.id,
    inscriptionStatus: course.inscriptionStatus?.id,
  });
  const { courses, inscriptions } = useContext(CoursesContext);
  const { users } = useContext(UsersContext);

  return (
    <Modal
      open={course !== undefined}
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
          {course.id ? 'Editar' : 'Crear'} curso
        </Typography>
        <Box sx={{ marginTop: '2rem' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFinished(editedCourse);
            }}
            style={{
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <FormControl sx={{ width: '100%', marginTop: '20px' }} size="small">
              <InputLabel color="secondary" id="actividad-select">
                Curso
              </InputLabel>
              <Select
                label="Curso"
                value={course.course?.id}
                onChange={(e) =>
                  setEditedCourse({
                    ...editedCourse,
                    course: Number(e.target.value),
                  })
                }
              >
                {courses().map((cou) => (
                  <MenuItem key={cou.id} value={cou.id}>
                    {cou.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%', marginTop: '20px' }} size="small">
              <InputLabel color="secondary" id="actividad-select">
                Usuario
              </InputLabel>
              <Select
                label="Usuario"
                value={course.user?.id}
                onChange={(e) =>
                  setEditedCourse({
                    ...editedCourse,
                    user: Number(e.target.value),
                  })
                }
              >
                {users().map((us) => (
                  <MenuItem key={us.id} value={us.id}>
                    {us.firstName + ' ' + us.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%', marginTop: '20px' }} size="small">
              <InputLabel color="secondary" id="actividad-select">
                Estado de Inscripción
              </InputLabel>
              <Select
                label="Estado de Inscripción"
                value={course.inscriptionStatus?.id}
                onChange={(e) =>
                  setEditedCourse({
                    ...editedCourse,
                    inscriptionStatus: Number(e.target.value),
                  })
                }
              >
                {inscriptions().map((ins) => (
                  <MenuItem key={ins.id} value={ins.id}>
                    {ins.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">
              {course.id ? 'Editar' : 'Crear'}
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
