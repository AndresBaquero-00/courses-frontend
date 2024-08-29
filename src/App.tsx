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

const GuardedRoute = ({ children }: { children: React.ReactNode }) => {
  if (localStorage.getItem('token') === null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <GuardedRoute>
        <DashboardPage />
      </GuardedRoute>
    ),
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
