import { Box, Button } from '@mui/material';
import { useContext, useState } from 'react';

import { CoursesContext } from '../../context/CourseContext';
import { Course, CreateUpdateCourse } from '../interfaces';
import { ListCourse } from '../components/courses/ListCourse';
import { CreateEditCourse } from '../components/courses/CreateEditCourse';

export const CoursePage = () => {
  const { courses, deleteCourse, createEditCourse } =
    useContext(CoursesContext);
  const [selectedCourse, setSelectedCourse] = useState<Course>();

  const onAction = (course: Course, action: 'edit' | 'delete') => {
    if (action === 'edit') {
      setSelectedCourse(course);
      return;
    }

    deleteCourse(course.id).then(() => {
      courses(true);
      setSelectedCourse(undefined);
    });
  };

  const onFinishedAction = async (course: CreateUpdateCourse | undefined) => {
    if (course !== undefined) {
      const res = await createEditCourse(selectedCourse?.id ?? -1, course);
      if (typeof res === 'string') {
        alert(res);
      } else {
        courses(true);
      }
    }
    setSelectedCourse(undefined);
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
        <Button
          variant="contained"
          onClick={() => setSelectedCourse({} as Course)}
        >
          Crear curso
        </Button>
      </Box>
      <ListCourse courses={courses()} actionInCourse={onAction} />
      {selectedCourse && (
        <CreateEditCourse
          course={selectedCourse}
          onFinished={onFinishedAction}
        />
      )}
    </Box>
  );
};
