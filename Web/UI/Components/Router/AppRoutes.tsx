// Web/UI/Components/Router/AppRoutes.tsx
import { AppRoute } from './AppRoute';

export const AppRoutes: AppRoute[] = [
  {
    path: 'Setup',
    label: 'Setup',
    exact: true,
    imported: {
      imported: import('UI/Routes/Configuration/InitialConfiguration'),
      path: 'Routes/Configuration/InitialConfiguration',
    },
  },
  {
    path: '',
    label: 'Home',
    exact: true,
    imported: {
      imported: import('UI/Routes/Home'),
      path: 'Routes/Home/index.tsx',
    },
  },
  {
    path: 'Projects',
    label: 'Projects',
    imported: {
      imported: import('UI/Routes/Projects/Projects'),
      path: 'Routes/Projects/Projects.tsx',
    },
    children: [
      {
        path: ':projectId',
        label: 'Project',
        imported: {
          imported: import('UI/Routes/Projects/Project'),
          path: 'Routes/Projects/Project.tsx',
        },
      },
    ],
  },
  {
    path: 'Ideas',
    label: 'Ideas',
    imported: {
      imported: import('UI/Routes/Ideas/Ideas'),
      path: 'Routes/Ideas/Ideas.tsx',
    },
  },
  {
    path: 'Login',
    label: 'Login',
    imported: {
      imported: import('UI/Routes/Authentication/Login'),
      path: 'Routes/Authentication/Login.tsx',
    },
  },
  {
    path: 'Register',
    label: 'Register',
    imported: {
      imported: import('UI/Routes/Authentication/Register'),
      path: 'Routes/Authentication/Register.tsx',
    },
  },
  {
    path: 'Admin',
    label: 'Admin',
    exact: true,
    imported: {
      imported: import('UI/Routes/Admin/Home'),
      path: 'Routes/Admin/Home.tsx',
    },
    children: [
      {
        path: 'Test',
        label: 'Test',
        imported: {
          imported: import('UI/Routes/Admin/Test'),
          path: 'Routes/Admin/Test.tsx',
        },
      },
    ],
  },
];
