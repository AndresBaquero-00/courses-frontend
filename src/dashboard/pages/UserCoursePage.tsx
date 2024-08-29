import { Box, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { CreateEditCourse } from '../components/user-course/CreateEditUserCourse';
import { ListUserCourse } from '../components/user-course/ListUserCourse';
import { CreateUpdateUserCourse, UserCourse } from '../interfaces';
import { UserCoursesContext } from '../../context/UserCourseContext';

export const UserCoursePage = () => {
  const { userCourses, deleteUserCourse, createEditUserCourse } =
    useContext(UserCoursesContext);
  const [selectedCourse, setSelectedCourse] = useState<UserCourse>();

  const onAction = (course: UserCourse, action: 'edit' | 'delete') => {
    if (action === 'edit') {
      setSelectedCourse(course);
      console.log(course);
      return;
    }

    deleteUserCourse(course.id).then(() => {
      userCourses(true);
      setSelectedCourse(undefined);
    });
  };

  const onFinishedAction = async (
    course: CreateUpdateUserCourse | undefined,
  ) => {
    if (course !== undefined) {
      console.log(selectedCourse);
      const res = await createEditUserCourse(selectedCourse?.id ?? -1, course);
      if (typeof res === 'string') {
        alert(res);
      } else {
        userCourses(true);
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
          onClick={() => setSelectedCourse({} as UserCourse)}
        >
          Crear inscripción
        </Button>
      </Box>
      <ListUserCourse courses={userCourses()} actionInCourse={onAction} />
      {selectedCourse && (
        <CreateEditCourse
          course={selectedCourse}
          onFinished={onFinishedAction}
        />
      )}
    </Box>
  );
};
