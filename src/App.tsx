import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { LoginPage } from './auth';
import { AuthProvider } from './context';
import { DashboardPage } from './dashboard';
import { ThemeProvider } from '@mui/material';
import { appTheme } from './themes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
