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

import { Course, CreateUpdateCourse } from '../../interfaces';
import { CoursesContext } from '../../../context/CourseContext';

interface Props {
  course: Course;
  onFinished(user: CreateUpdateCourse | undefined): void;
}

export const CreateEditCourse = ({ course, onFinished }: Props) => {
  const [editedCourse, setEditedCourse] = useState<CreateUpdateCourse>({
    name: course.name,
    duration: course.duration,
    couta: Number(course.couta),
    category: course.category?.id,
    modality: course.modality?.id,
  });
  const { categories, modalities } = useContext(CoursesContext);

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
            <TextField
              value={editedCourse.name}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  name: e.target.value,
                })
              }
              name="name"
              type="text"
              label="Nombre"
              variant="filled"
            />
            <TextField
              value={editedCourse.duration}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  duration: Number(e.target.value),
                })
              }
              name="duration"
              type="number"
              label="Duración"
              variant="filled"
            />
            <TextField
              value={editedCourse.couta}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  couta: Number(e.target.value),
                })
              }
              name="couta"
              type="number"
              label="Cuota"
              variant="filled"
            />
            <FormControl sx={{ width: '100%', marginTop: '20px' }} size="small">
              <InputLabel color="secondary" id="actividad-select">
                Categoría
              </InputLabel>
              <Select
                label="Categoría"
                defaultValue={'' as unknown as number}
                value={course.category?.id ?? ''}
                onChange={(e) =>
                  setEditedCourse({
                    ...editedCourse,
                    category: Number(e.target.value),
                  })
                }
              >
                {categories().map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%', marginTop: '20px' }} size="small">
              <InputLabel color="secondary" id="actividad-select">
                Categoría
              </InputLabel>
              <Select
                label="Modalidad"
                defaultValue={'' as unknown as number}
                value={course.modality?.id ?? ''}
                onChange={(e) =>
                  setEditedCourse({
                    ...editedCourse,
                    modality: Number(e.target.value),
                  })
                }
              >
                {modalities().map((modality) => (
                  <MenuItem key={modality.id} value={modality.id}>
                    {modality.name}
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
