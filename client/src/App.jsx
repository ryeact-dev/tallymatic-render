import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import initializeApp from '@/setup/init';
import { Toaster } from 'sonner';
import LoadingSpinner from './common/spinner/LoadingSpinner';
import ProtectedRoute from './common/auth/ProtectedRoute';
import ErrorBoundary from './pages/ErrorBoundary';
import { getCurrentUser } from './api/user.api';
import RootContainer from './pages/RootContainer';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));

// Initializing different libraries
initializeApp();

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      loader: () => getCurrentUser(),
      element: <RootContainer />,
    },
    { path: '/login', element: <Login /> },
    {
      path: '/app/*',
      errorElement: <ErrorBoundary />,
      loader: () => getCurrentUser(),
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <section className='w-full min-h-screen flex items-center justify-center'>
      <Toaster richColors position='bottom-left' visibleToasts={5} />
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </section>
  );
}

export default App;
