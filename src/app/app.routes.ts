import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { EditEmployee } from './pages/edit-employee/edit-employee';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard-guard';
 
export const routes: Routes = [
   { path: 'login', component: Login },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard ,canActivate: [authGuard]},
  {
    path: 'employees',
    loadComponent: () =>
      import('./pages/employees/employees').then(m => m.Employees) ,
    canActivate: [authGuard]
  },
  {
    path: 'employees/:id',
    loadComponent: () =>
      import('./pages/employee-details/employee-details')
        .then(m => m.EmployeeDetails),
        canActivate: [authGuard]
  },
  {
    path: 'add-employee',
    loadComponent: () =>
      import('./pages/add-employee/add-employee').then(m => m.AddEmployee),
    canActivate: [authGuard]
  },
  {
  path: 'employees/edit/:id',
    component: EditEmployee,
    canActivate: [authGuard]
  },
   { path: '**', component: NotFound }  
];  