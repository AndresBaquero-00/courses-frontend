import { Book, Person, School } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import { useState } from 'react';

import { UsersProvider } from '../../context';
import { CoursesProvider } from '../../context/CourseContext';
import { CoursePage } from './CoursePage';
import { UserCoursePage } from './UserCoursePage';
import { UserPage } from './UserPage';
import { UserCoursesProvider } from '../../context/UserCourseContext';

export const DashboardPage = () => {
  const [value, setValue] = useState(0);
  return (
    <UsersProvider>
      <CoursesProvider>
        <UserCoursesProvider>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '5rem',
            }}
          >
            {value === 0 && <CoursePage />}
            {value === 1 && <UserPage />}
            {value === 2 && <UserCoursePage />}
            <Paper
              sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation
                showLabels
                value={value}
                onChange={(_, page) => {
                  setValue(page);
                }}
              >
                <BottomNavigationAction label="Cursos" icon={<School />} />
                <BottomNavigationAction label="Usuarios" icon={<Person />} />
                <BottomNavigationAction label="Inscripciones" icon={<Book />} />
              </BottomNavigation>
            </Paper>
          </Box>
        </UserCoursesProvider>
      </CoursesProvider>
    </UsersProvider>
  );
};
