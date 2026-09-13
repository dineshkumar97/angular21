import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.Login)
  },

  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout')
        .then(m => m.MainLayout),

    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users')
            .then(m => m.Users)
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./pages/reports/reports')
            .then(m => m.Reports)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings')
            .then(m => m.Settings)
      },

     
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];